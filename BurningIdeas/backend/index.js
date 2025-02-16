const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
let db;

const connectDB = async () => {
  try {
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
    const usersRoute = require("./routes/GetUsers")(db);
    const answersRoute = require("./routes/Answers")(db);
    const signinRoute = require("./routes/Signin")(db);
    const signupRoute = require("./routes/PostUser")(db);
    const editRoute = require("./routes/PutUser")(db);
    const deleteUserRoute = require("./routes/DeleteUser")(db);
    const postIdeaRoutes = require("./routes/PostIdeas")(db);
    const getIdeasRoutes = require("./routes/GetIdeas")(db);
    const getIdeaByIdRoutes = require("./routes/GetIdeaById")(db);
    const deleteIdearoute = require("./routes/DeleteIdea")(db);

    app.use("/users", usersRoute);
    app.use("/signin", signinRoute);
    app.use("/signup", signupRoute);
    app.use("/editaccount", editRoute);
    app.use("/deleteaccount", deleteUserRoute);
    app.use("/postidea", postIdeaRoutes);
    app.use("/ideas", getIdeasRoutes);
    app.use("/idea", getIdeaByIdRoutes);
    app.use("/idea/delete", deleteIdearoute);
    app.use("/answers", answersRoute);
  } else {
    console.error("Databasen är inte tillgänglig!");
  }

  app.listen(PORT, () => {
    console.log(`Servern körs på port ${PORT}`);
  });
});
