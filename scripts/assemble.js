const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const template = path.join(root, "template");
const content = path.join(root, "content");
const site = path.join(root, "site");
const copy = process.argv.includes("--copy");

function walkFiles(dir, base = "") {
  const files = [];
  for (const entry of fs.readdirSync(path.join(dir, base), { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files.push(...walkFiles(dir, rel));
    } else {
      files.push(rel);
    }
  }
  return files;
}

function installFile(relPath, srcRoot) {
  const src = path.resolve(srcRoot, relPath);
  const dest = path.join(site, relPath);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (fs.existsSync(dest)) fs.unlinkSync(dest);

  if (copy) {
    fs.cpSync(src, dest);
  } else {
    fs.symlinkSync(path.relative(path.dirname(dest), src), dest);
  }
}

fs.rmSync(site, { recursive: true, force: true });
fs.mkdirSync(site, { recursive: true });

for (const rel of walkFiles(template)) installFile(rel, template);
for (const rel of walkFiles(content)) installFile(rel, content);
