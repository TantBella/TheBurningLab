const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const API_URL = process.env.VITE_DOTNET_API_URL;
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

const usersRoute = require("./routes/GetUsers")(API_URL);
const answersRoute = require("./routes/Answers")(API_URL);
const signinRoute = require("./routes/Signin")(API_URL);
const signupRoute = require("./routes/PostUser")(API_URL);
const editRoute = require("./routes/PutUser")(API_URL);
const deleteUserRoute = require("./routes/DeleteUser")(API_URL);
const postIdeaRoutes = require("./routes/PostIdeas")(API_URL);
const getIdeasRoutes = require("./routes/GetIdeas")(API_URL);
const getIdeaByIdRoutes = require("./routes/GetIdeaById")(API_URL);
const deleteIdearoute = require("./routes/DeleteIdea")(API_URL);

app.use("/Users", usersRoute);
app.use("/signin", signinRoute);
app.use("/signup", signupRoute);
app.use("/editaccount", editRoute);
app.use("/deleteaccount", deleteUserRoute);
app.use("/postidea", postIdeaRoutes);
app.use("/ideas", getIdeasRoutes);
app.use("/idea", getIdeaByIdRoutes);
app.use("/idea/delete", deleteIdearoute);
app.use("/answers", answersRoute);

app.listen(PORT, () => {
  console.log(`Servern körs på port ${PORT}`);
});
