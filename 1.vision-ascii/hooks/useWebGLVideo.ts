import { useEffect, useRef } from "react";
import { MotionValue } from "framer-motion";

const vertexShaderSource = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D u_image;
  uniform sampler2D u_ascii;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_videoAspect;
  uniform float u_canvasAspect;
  uniform float u_numChars;

  void main() {
    vec2 canvasUv = v_texCoord;
    
    float charsX = 150.0;
    float charsY = charsX * 0.5 / u_canvasAspect;
    vec2 cellCount = vec2(charsX, charsY);
    
    vec2 cellCanvasUv = floor(canvasUv * cellCount) / cellCount;
    vec2 subUv = fract(canvasUv * cellCount);
    
    // Map cell center to aspect-corrected video UV
    vec2 videoUv = cellCanvasUv;
    if (u_canvasAspect > u_videoAspect) {
      float yOffset = (1.0 - (u_videoAspect / u_canvasAspect)) / 2.0;
      videoUv.y = videoUv.y * (u_videoAspect / u_canvasAspect) + yOffset;
    } else {
      float xOffset = (1.0 - (u_canvasAspect / u_videoAspect)) / 2.0;
      videoUv.x = videoUv.x * (u_canvasAspect / u_videoAspect) + xOffset;
    }
    
    // Calculate circular distance to mouse using cellCanvasUv for a blocky ASCII grid edge
    vec2 aspectVec = vec2(u_canvasAspect, 1.0);
    float dist = distance(cellCanvasUv * aspectVec, u_mouse * aspectVec);
    
    float radius = 0.04;
    bool inShape = dist < radius;
    
    // Sample the video (no distortion)
    vec3 col = texture2D(u_image, videoUv).rgb;
    
    float brightness = dot(col, vec3(0.299, 0.587, 0.114));
    
    // Determine which ASCII character to use (0 to u_numChars - 1)
    float charIndex = floor(brightness * (u_numChars - 1.0));
    
    // Calculate UV for the ascii texture
    // Our ascii texture has characters horizontally.
    // subUv.y might need to be inverted because WebGL canvas reads bottom-up
    vec2 asciiUv = vec2((charIndex + subUv.x) / u_numChars, 1.0 - subUv.y);
    float charBrightness = texture2D(u_ascii, asciiUv).r;
    
    vec3 finalColor;
    if (inShape) {
      // Invert effect inside the shape: background takes the video color, characters become dark
      finalColor = col * (1.0 - charBrightness) * 1.5;
    } else {
      // Normal ASCII effect outside
      finalColor = col * charBrightness * 1.5;
    }
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) return shader;
  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
}

function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) return program;
  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return null;
}

function createAsciiTexture(gl: WebGLRenderingContext) {
  const canvas = document.createElement("canvas");
  const chars = " .:-=+*#%@";
  canvas.width = 64 * chars.length;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "bold 50px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let i = 0; i < chars.length; i++) {
    ctx.fillText(chars[i], i * 64 + 32, 32);
  }
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  return { tex, numChars: chars.length };
}

export function useWebGLVideo(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  videoRef: React.RefObject<HTMLVideoElement | null>,
  mouseX?: MotionValue<number>,
  mouseY?: MotionValue<number>
) {
  const requestRef = useRef<number>(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    if (!canvas || !video) return;
    
    const gl = canvas.getContext("webgl", { antialias: false, alpha: true });
    if (!gl) return;
    
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) return;
    
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;
    
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const texCoordAttributeLocation = gl.getAttribLocation(program, "a_texCoord");
    
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );
    
    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    // Note: Video texture coordinates are usually flipped on Y axis in WebGL
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        0.0,  1.0,
        1.0,  1.0,
        0.0,  0.0,
        0.0,  0.0,
        1.0,  1.0,
        1.0,  0.0,
      ]),
      gl.STATIC_DRAW
    );
    
    const videoTexture = gl.createTexture();
    
    // Set up texture 0 for video
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, videoTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    
    // Set up texture 1 for ASCII atlas
    const asciiAtlas = createAsciiTexture(gl);
    
    const imageLocation = gl.getUniformLocation(program, "u_image");
    const asciiLocation = gl.getUniformLocation(program, "u_ascii");
    const numCharsLocation = gl.getUniformLocation(program, "u_numChars");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const videoAspectLocation = gl.getUniformLocation(program, "u_videoAspect");
    const canvasAspectLocation = gl.getUniformLocation(program, "u_canvasAspect");
    
    let startTime = performance.now();
    
    const resizeCanvas = () => {
      // Set canvas resolution to window size to avoid blurry textures
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    const render = () => {
      gl.useProgram(program);

      // Upload video frame to texture 0
      if (video.readyState >= 2) { // HAVE_CURRENT_DATA
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, videoTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
      }
      
      // Bind textures to uniform samplers
      gl.uniform1i(imageLocation, 0); // texture unit 0
      if (asciiAtlas) {
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, asciiAtlas.tex);
        gl.uniform1i(asciiLocation, 1); // texture unit 1
        gl.uniform1f(numCharsLocation, asciiAtlas.numChars);
      }
      
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
      
      gl.enableVertexAttribArray(texCoordAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);
      
      gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
      
      let videoAspect = 16.0 / 9.0;
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        videoAspect = video.videoWidth / video.videoHeight;
      }
      let canvasAspect = gl.canvas.width / gl.canvas.height;
      
      gl.uniform1f(videoAspectLocation, videoAspect);
      gl.uniform1f(canvasAspectLocation, canvasAspect);
      
      let mx = 0.5;
      let my = 0.5;
      if (mouseX && mouseY) {
        // Normal X mapping
        mx = mouseX.get() / window.innerWidth;
        // Normal Y mapping (v_texCoord.y is 0 at top, 1 at bottom, matching screen)
        my = mouseY.get() / window.innerHeight;
      }
      gl.uniform2f(mouseLocation, mx, my);
      
      const currentTime = (performance.now() - startTime) / 1000.0;
      gl.uniform1f(timeLocation, currentTime);
      
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      requestRef.current = requestAnimationFrame(render);
    };
    
    requestRef.current = requestAnimationFrame(render);
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(requestRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(texCoordBuffer);
      gl.deleteTexture(videoTexture);
      if (asciiAtlas) gl.deleteTexture(asciiAtlas.tex);
    };
  }, [canvasRef, videoRef, mouseX, mouseY]);
}
