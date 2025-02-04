const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.send("Welcome to my api");
});

app.post("/createaccount", upload.single("profileImage"), (req, res) => {
  const { name, username, password } = req.body;
  const profileImage = req.file ? req.file.filename : null;

  // Här ska jag spara datan sen
  console.log({ name, username, password, profileImage });

  res.json({
    message: "Konto skapat!",
    user: { name, username, profileImage },
  });
});

app.listen(PORT, () => {
  console.log(`Servern körs på port ${PORT}`);
});
