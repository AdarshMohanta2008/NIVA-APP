const sharp = require('sharp');

async function checkCard() {
  const { data, info } = await sharp('public/assets/aistudio/Gemini_Generated_Image_kjg5hekjg5hekjg5_71be0c38.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const midY = 365;

  console.log('Scanning X across midY=365:');
  for (let x = 300; x <= 1100; x += 25) {
    const idx = (midY * width + x) * 4;
    console.log(`x=${x}: R=${data[idx]} G=${data[idx+1]} B=${data[idx+2]}`);
  }

  // Also scan vertically at x=450 (which is inside the card background):
  console.log('Scanning Y at x=450:');
  for (let y = 0; y < height; y += 25) {
    const idx = (y * width + 450) * 4;
    console.log(`y=${y}: R=${data[idx]} G=${data[idx+1]} B=${data[idx+2]}`);
  }
}

checkCard();
