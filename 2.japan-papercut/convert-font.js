const fs = require('fs');
const ft = require('facetype-js');

async function convert() {
    try {
        const chars = '日本物語尾ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?.,:;-';
        const jsonStr = ft.facetype('NotoSerifCJKjp-Bold.otf', true, false, chars);
        
        fs.mkdirSync('public/fonts', { recursive: true });
        fs.writeFileSync('public/fonts/Japanese_Bold.json', jsonStr);
        console.log('Font converted successfully');
    } catch(err) {
        console.error('Error during conversion:', err);
    }
}
convert();
