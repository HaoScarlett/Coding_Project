//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// 🆕
let userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));

// Middleware: Check password
function checkPassWord(req, res, next) {
  // Extracts the values from form filed
  // Verify whether the input is valid password
  const password = req.body["password"];
  // 🔺 Skip password check for the "/" route
  if (password === "ILoveProgramming") {
    userIsAuthorised = true;
  }
  // Continue processing the request
  next();
}

app.use(checkPassWord);

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// "/check" route
app.post("/check", (req, res) => {
  // 🆕
  if (userIsAuthorised) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    // return false won't stop request sending
    // 🔺 Send a response to indicate the failure
    res.status(403).send("Incorrect password");
    // 🆕 Otherwise you can redirect users to the homepage
    //  res.redirect("/")
  }
});

// Starting the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
