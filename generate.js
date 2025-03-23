const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const generateObj = (imagePath) => {
  const tripoSRDir = "C:\\Users\\Sherv\\Desktop\\TripoSR\\TripoSR";
  const outputDir = `${tripoSRDir}\\output`;
  const meshPath = `${outputDir}\\0\\mesh.obj`;
  const finalObjPath = "C:\\Users\\Sherv\\Desktop\\GenAI Genesis\\public\\models\\generated.obj";

  // Ensure directories exist
  if (!fs.existsSync(`${tripoSRDir}\\temp`)) fs.mkdirSync(`${tripoSRDir}\\temp`);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
  if (!fs.existsSync("C:\\Users\\Sherv\\Desktop\\GenAI Genesis\\public\\models")) {
    fs.mkdirSync("C:\\Users\\Sherv\\Desktop\\GenAI Genesis\\public\\models", { recursive: true });
  }

  // Copy image to temp location
  const tempImagePath = `${tripoSRDir}\\temp\\input_${Date.now()}.jpg`;
  fs.copyFileSync(imagePath, tempImagePath);

  // Run TripoSR
  const command = `python "${tripoSRDir}\\run.py" "${tempImagePath}" --output-dir "${outputDir}"`;
  exec(command, { shell: "cmd.exe" }, (error, stdout, stderr) => {
    if (error) {
      console.error("TripoSR error:", error, stderr);
      return;
    }

    // Wait for mesh.obj and move it
    const checkMesh = setInterval(() => {
      if (fs.existsSync(meshPath)) {
        clearInterval(checkMesh);
        fs.renameSync(meshPath, finalObjPath);
        console.log("OBJ generated and moved to:", finalObjPath);
      }
    }, 500);
  });
};

if (process.argv.length < 3) {
  console.error("Usage: node generate.js <image-path>");
  process.exit(1);
}

const imagePath = process.argv[2];
generateObj(imagePath);