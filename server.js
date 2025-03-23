const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");

const app = express();
const upload = multer({ dest: "public/temp/" });

app.use(cors());

app.post("/generate", upload.single("image"), (req, res) => {
  console.log("Received upload:", req.file);
  const imagePath = req.file.path;
  const tripoSRDir = "C:\\Users\\Sherv\\Desktop\\TripoSR\\TripoSR";
  const outputDir = `${tripoSRDir}\\output`;
  const meshPath = `${outputDir}\\0\\mesh.obj`;
  const finalObjPath = "C:\\Users\\Sherv\\Desktop\\GenAI Genesis\\public\\models\\generated.obj";

  console.log("Running TripoSR on:", imagePath);
  const command = `python "${tripoSRDir}\\run.py" "${imagePath}" --output-dir "${outputDir}"`;
  exec(command, { shell: "cmd.exe" }, (error, stdout, stderr) => {
    if (error) {
      console.error("TripoSR execution failed:", error, stderr);
      return res.status(500).json({ error: "Generation failed", details: stderr });
    }
    console.log("TripoSR output:", stdout);

    const checkMesh = setInterval(() => {
      if (fs.existsSync(meshPath)) {
        console.log("Mesh found at:", meshPath);
        clearInterval(checkMesh);
        try {
          fs.renameSync(meshPath, finalObjPath);
          console.log("Mesh moved to:", finalObjPath);

          // Wait until finalObjPath exists
          const confirmMove = setInterval(() => {
            if (fs.existsSync(finalObjPath)) {
              clearInterval(confirmMove);
              res.json({ imageUrl: `/temp/${req.file.filename}`, objUrl: "/models/generated.obj" });
            } else {
              console.log("Waiting for move to complete...");
            }
          }, 100);
        } catch (moveError) {
          console.error("Move failed:", moveError);
          res.status(500).json({ error: "Move failed", details: moveError.message });
        }
      } else {
        console.log("Waiting for mesh...");
      }
    }, 500);

    setTimeout(() => {
      if (!fs.existsSync(finalObjPath)) {
        clearInterval(checkMesh);
        console.error("Timeout: Mesh not generated or moved");
        res.status(500).json({ error: "Timeout waiting for mesh" });
      }
    }, 30000);
  });
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));