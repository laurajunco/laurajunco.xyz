const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const site = path.join(root, "site");

fs.rmSync(site, { recursive: true, force: true });
fs.cpSync(path.join(root, "template"), site, { recursive: true });
fs.cpSync(path.join(root, "content"), site, { recursive: true });
