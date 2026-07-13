#!/usr/bin/env node
/**
 * Downloads all 78 Rider-Waite-Smith (1909, public domain) tarot card images
 * from Wikimedia Commons into /public/tarot/cards/
 *
 * Usage: node scripts/download-tarot-images.js
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(__dirname, "..", "public", "tarot", "cards");
fs.mkdirSync(OUT_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// Wikimedia Commons direct image URLs for the 78 RWS cards (1909 originals)
// File pattern:  RWS_Tarot_<name>.jpg
// These are definitive public domain scans hosted on Wikimedia.
// ---------------------------------------------------------------------------
const CARDS = [
  // Major Arcana
  { file: "ar00.jpg", wiki: "RWS_Tarot_00_Fool.jpg" },
  { file: "ar01.jpg", wiki: "RWS_Tarot_01_Magician.jpg" },
  { file: "ar02.jpg", wiki: "RWS_Tarot_02_High_Priestess.jpg" },
  { file: "ar03.jpg", wiki: "RWS_Tarot_03_Empress.jpg" },
  { file: "ar04.jpg", wiki: "RWS_Tarot_04_Emperor.jpg" },
  { file: "ar05.jpg", wiki: "RWS_Tarot_05_Hierophant.jpg" },
  { file: "ar06.jpg", wiki: "RWS_Tarot_06_Lovers.jpg" },
  { file: "ar07.jpg", wiki: "RWS_Tarot_07_Chariot.jpg" },
  { file: "ar08.jpg", wiki: "RWS_Tarot_08_Strength.jpg" },
  { file: "ar09.jpg", wiki: "RWS_Tarot_09_Hermit.jpg" },
  { file: "ar10.jpg", wiki: "RWS_Tarot_10_Wheel_of_Fortune.jpg" },
  { file: "ar11.jpg", wiki: "RWS_Tarot_11_Justice.jpg" },
  { file: "ar12.jpg", wiki: "RWS_Tarot_12_Hanged_Man.jpg" },
  { file: "ar13.jpg", wiki: "RWS_Tarot_13_Death.jpg" },
  { file: "ar14.jpg", wiki: "RWS_Tarot_14_Temperance.jpg" },
  { file: "ar15.jpg", wiki: "RWS_Tarot_15_Devil.jpg" },
  { file: "ar16.jpg", wiki: "RWS_Tarot_16_Tower.jpg" },
  { file: "ar17.jpg", wiki: "RWS_Tarot_17_Star.jpg" },
  { file: "ar18.jpg", wiki: "RWS_Tarot_18_Moon.jpg" },
  { file: "ar19.jpg", wiki: "RWS_Tarot_19_Sun.jpg" },
  { file: "ar20.jpg", wiki: "RWS_Tarot_20_Judgement.jpg" },
  { file: "ar21.jpg", wiki: "RWS_Tarot_21_World.jpg" },

  // Wands
  { file: "wa01.jpg", wiki: "Wands01.jpg" },
  { file: "wa02.jpg", wiki: "Wands02.jpg" },
  { file: "wa03.jpg", wiki: "Wands03.jpg" },
  { file: "wa04.jpg", wiki: "Wands04.jpg" },
  { file: "wa05.jpg", wiki: "Wands05.jpg" },
  { file: "wa06.jpg", wiki: "Wands06.jpg" },
  { file: "wa07.jpg", wiki: "Wands07.jpg" },
  { file: "wa08.jpg", wiki: "Wands08.jpg" },
  { file: "wa09.jpg", wiki: "Wands09.jpg" },
  { file: "wa10.jpg", wiki: "Wands10.jpg" },
  { file: "wa11.jpg", wiki: "Wands11.jpg" },
  { file: "wa12.jpg", wiki: "Wands12.jpg" },
  { file: "wa13.jpg", wiki: "Wands13.jpg" },
  { file: "wa14.jpg", wiki: "Wands14.jpg" },

  // Cups
  { file: "cu01.jpg", wiki: "Cups01.jpg" },
  { file: "cu02.jpg", wiki: "Cups02.jpg" },
  { file: "cu03.jpg", wiki: "Cups03.jpg" },
  { file: "cu04.jpg", wiki: "Cups04.jpg" },
  { file: "cu05.jpg", wiki: "Cups05.jpg" },
  { file: "cu06.jpg", wiki: "Cups06.jpg" },
  { file: "cu07.jpg", wiki: "Cups07.jpg" },
  { file: "cu08.jpg", wiki: "Cups08.jpg" },
  { file: "cu09.jpg", wiki: "Cups09.jpg" },
  { file: "cu10.jpg", wiki: "Cups10.jpg" },
  { file: "cu11.jpg", wiki: "Cups11.jpg" },
  { file: "cu12.jpg", wiki: "Cups12.jpg" },
  { file: "cu13.jpg", wiki: "Cups13.jpg" },
  { file: "cu14.jpg", wiki: "Cups14.jpg" },

  // Swords
  { file: "sw01.jpg", wiki: "Swords01.jpg" },
  { file: "sw02.jpg", wiki: "Swords02.jpg" },
  { file: "sw03.jpg", wiki: "Swords03.jpg" },
  { file: "sw04.jpg", wiki: "Swords04.jpg" },
  { file: "sw05.jpg", wiki: "Swords05.jpg" },
  { file: "sw06.jpg", wiki: "Swords06.jpg" },
  { file: "sw07.jpg", wiki: "Swords07.jpg" },
  { file: "sw08.jpg", wiki: "Swords08.jpg" },
  { file: "sw09.jpg", wiki: "Swords09.jpg" },
  { file: "sw10.jpg", wiki: "Swords10.jpg" },
  { file: "sw11.jpg", wiki: "Swords11.jpg" },
  { file: "sw12.jpg", wiki: "Swords12.jpg" },
  { file: "sw13.jpg", wiki: "Swords13.jpg" },
  { file: "sw14.jpg", wiki: "Swords14.jpg" },

  // Pentacles
  { file: "pe01.jpg", wiki: "Pents01.jpg" },
  { file: "pe02.jpg", wiki: "Pents02.jpg" },
  { file: "pe03.jpg", wiki: "Pents03.jpg" },
  { file: "pe04.jpg", wiki: "Pents04.jpg" },
  { file: "pe05.jpg", wiki: "Pents05.jpg" },
  { file: "pe06.jpg", wiki: "Pents06.jpg" },
  { file: "pe07.jpg", wiki: "Pents07.jpg" },
  { file: "pe08.jpg", wiki: "Pents08.jpg" },
  { file: "pe09.jpg", wiki: "Pents09.jpg" },
  { file: "pe10.jpg", wiki: "Pents10.jpg" },
  { file: "pe11.jpg", wiki: "Pents11.jpg" },
  { file: "pe12.jpg", wiki: "Pents12.jpg" },
  { file: "pe13.jpg", wiki: "Pents13.jpg" },
  { file: "pe14.jpg", wiki: "Pents14.jpg" },
];

/** Build Wikimedia Commons direct download URL */
function wikiUrl(filename) {
  const encoded = encodeURIComponent(filename.replace(/ /g, "_"));
  // Wikimedia uses MD5 of filename for directory sharding
  const crypto = require("crypto");
  const md5 = crypto.createHash("md5").update(filename.replace(/ /g, "_")).digest("hex");
  const a = md5[0];
  const ab = md5[0] + md5[1];
  return `https://upload.wikimedia.org/wikipedia/commons/${a}/${ab}/${encoded}`;
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = {
      headers: { "User-Agent": "TarotImageDownloader/1.0 (educational use)" },
    };
    https.get(url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        try { fs.unlinkSync(dest); } catch {}
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        try { fs.unlinkSync(dest); } catch {}
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on("finish", () => file.close(() => resolve()));
    }).on("error", (err) => {
      try { fs.unlinkSync(dest); } catch {}
      reject(err);
    });
  });
}

async function downloadWithRetry(url, dest, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await download(url, dest);
      return;
    } catch (err) {
      if (attempt === retries) throw err;
      const wait = attempt * 3000;
      process.stdout.write(`    ↺ retry ${attempt}/${retries} in ${wait/1000}s...\n`);
      await new Promise(r => setTimeout(r, wait));
    }
  }
}

async function main() {
  console.log(`\nDownloading ${CARDS.length} RWS tarot images from Wikimedia Commons...\n`);
  let ok = 0, skip = 0, fail = 0;
  const failures = [];

  for (const card of CARDS) {
    const dest = path.join(OUT_DIR, card.file);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 2000) {
      process.stdout.write(`  ✓ skip  ${card.file}\n`);
      skip++;
      continue;
    }
    const url = wikiUrl(card.wiki);
    try {
      await downloadWithRetry(url, dest);
      process.stdout.write(`  ↓ ok    ${card.file}  ← ${card.wiki}\n`);
      ok++;
    } catch (err) {
      process.stdout.write(`  ✗ fail  ${card.file}: ${err.message}\n`);
      failures.push({ card, url, err: err.message });
      fail++;
    }
    // Be polite to Wikimedia — 2 second delay between requests
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log(`\nDone. Downloaded: ${ok}, Skipped: ${skip}, Failed: ${fail}`);
  if (failures.length) {
    console.log("\nFailed cards:");
    failures.forEach(f => console.log(`  ${f.card.file} → ${f.url}`));
    process.exit(1);
  }
}

main();
