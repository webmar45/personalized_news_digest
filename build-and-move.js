import { execSync } from "child_process";
import pkg from "fs-extra";
const { copySync, removeSync } = pkg;

// 1. Remove old dist folder if exists
removeSync("dist");

// 2. Build frontend
execSync("cd frontend && npm install && npm run build", { stdio: "inherit" });

// 3. Move frontend/dist to root/dist
copySync("frontend/dist", "dist");

console.log("Frontend built and moved to root/dist ✅");
