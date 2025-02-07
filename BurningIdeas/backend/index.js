const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");

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
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(cors());

  if (db) {
    const usersRoute = require("./routes/GetUsers")(db);
    const answersRoute = require("./routes/Answers")(db);
    const signinRoute = require("./routes/Signin")(db);
    const signupRoute = require("./routes/PostUser")(db);
    const editRoute = require("./routes/PutUser")(db);
    const deleteUserRoute = require("./routes/DeleteUser")(db);
    const ideaRoutes = require("./routes/PostIdeas")(db);
    const getIdeasRoutes = require("./routes/GetIdeas")(db);

    app.use("/users", usersRoute);
    app.use("/signin", signinRoute);
    app.use("/signup", signupRoute);
    app.use("/editaccount", editRoute);
    app.use("/deleteaccount", deleteUserRoute);
    app.use("/getideas", getIdeasRoutes);
    app.use("/ideas", ideaRoutes);
    app.use("/answers", answersRoute);
  } else {
    console.error("Databasen är inte tillgänglig!");
  }

  app.listen(PORT, () => {
    console.log(`Servern körs på port ${PORT}`);
  });
});
