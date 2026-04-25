const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "audio/mpeg" || file.originalname.endsWith(".mp3")) {
      cb(null, true);
      return;
    }
    cb(new Error("Only .mp3 files are allowed"));
  },
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "Backend is running" });
});

app.post("/api/karaoke/create", upload.single("audio"), (req, res) => {
  const lyrics = req.body?.lyrics?.trim();

  if (!req.file) {
    return res.status(400).json({ error: "MP3 file is required" });
  }

  if (!lyrics) {
    return res.status(400).json({ error: "Lyrics are required" });
  }

  const audioUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  return res.status(201).json({
    message: "Basic karaoke project created (AI processing not added yet)",
    audioUrl,
    lyrics,
    originalFileName: req.file.originalname,
  });
});

app.use((err, _req, res, _next) => {
  res.status(400).json({ error: err.message || "Unexpected error occurred" });
});

app.listen(PORT, () => {
  console.log(`Karaoke backend listening on http://localhost:${PORT}`);
});
