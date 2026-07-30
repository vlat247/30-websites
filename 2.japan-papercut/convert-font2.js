const fs = require('fs');
const opentype = require('opentype.js');

const chars = '日本物語尾ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?.,:;-';

async function run() {
    try {
        const buffer = fs.readFileSync('NotoSerifCJKjp-Bold.otf').buffer;
        const font = opentype.parse(buffer);

        const resolution = 1000;
        const scale = resolution / font.unitsPerEm;

        const result = {
            glyphs: {},
            cssFontWeight: "bold",
            cssFontStyle: "normal",
            ascender: Math.round((font.tables.os2.sTypoAscender || 0) * scale),
            descender: Math.round((font.tables.os2.sTypoDescender || 0) * scale),
            boundingBox: {
                yMin: Math.round((font.tables.os2.sTypoDescender || -200) * scale),
                yMax: Math.round((font.tables.os2.sTypoAscender || 800) * scale),
                xMin: -100,
                xMax: 1000
            },
            familyName: "Noto",
            resolution: resolution,
            original_font_information: {}
        };

        for (let i = 0; i < chars.length; i++) {
            const char = chars[i];
            const glyph = font.charToGlyph(char);
            if (!glyph || !glyph.unicode) continue;
            
            const path = glyph.getPath(0, 0, resolution);
            let o = "";
            for (let j = 0; j < path.commands.length; j++) {
                const cmd = path.commands[j];
                if (cmd.type === 'M') {
                    o += "m " + Math.round(cmd.x) + " " + Math.round(cmd.y) + " ";
                } else if (cmd.type === 'L') {
                    o += "l " + Math.round(cmd.x) + " " + Math.round(cmd.y) + " ";
                } else if (cmd.type === 'Q') {
                    o += "q " + Math.round(cmd.x1) + " " + Math.round(cmd.y1) + " " + Math.round(cmd.x) + " " + Math.round(cmd.y) + " ";
                } else if (cmd.type === 'C') {
                    o += "b " + Math.round(cmd.x1) + " " + Math.round(cmd.y1) + " " + Math.round(cmd.x2) + " " + Math.round(cmd.y2) + " " + Math.round(cmd.x) + " " + Math.round(cmd.y) + " ";
                } else if (cmd.type === 'Z') {
                    o += "z ";
                }
            }
            
            result.glyphs[char] = {
                ha: Math.round((glyph.advanceWidth || 0) * scale),
                x_min: Math.round((glyph.xMin || 0) * scale),
                x_max: Math.round((glyph.xMax || 0) * scale),
                o: o.trim()
            };
        }

        fs.mkdirSync('public/fonts', { recursive: true });
        fs.writeFileSync('public/fonts/Japanese_Bold.json', JSON.stringify(result));
        console.log('Font converted successfully');
    } catch (err) {
        console.error(err);
    }
}
run();
