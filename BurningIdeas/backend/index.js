const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

let db;

const connectDB = async () => {
  try {
    console.log("Försöker ansluta till MongoDB...");

    const client = new MongoClient(mongoURI);
    await client.connect();
    db = client.db("TheBurnLab");

    console.log("Ansluten till MongoDB!");
  } catch (error) {
    console.error("Kunde inte ansluta till MongoDB:", error.message);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.use(express.json());
  app.use(cors());

  if (db) {
    const usersRoute = require("./routes/Users")(db);
    const answersRoute = require("./routes/Answers")(db);

    app.use("/users", usersRoute);
    app.use("/answers", answersRoute);
  } else {
    console.error("Databasen är inte tillgänglig!");
  }

  app.listen(PORT, () => {
    console.log(`Servern körs på port ${PORT}`);
  });
});

// const upload = multer({ dest: "uploads/" });

// app.get("/", (req, res) => {
//   res.send("Welcome to my API");
// });

// app.post("/createaccount", upload.single("profileImage"), (req, res) => {
//   const { name, username, password } = req.body;
//   const profileImage = req.file ? req.file.filename : null;

//   console.log({ name, username, password, profileImage });

//   res.json({
//     message: "Konto skapat!",
//     user: { name, username, profileImage },
//   });
// });
