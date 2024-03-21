// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";
// import bodyParser from "body-parser";
// 2. Create an express app and set the port number.
const app = express();
const port = 3000;
// 3. Use the public folder for static files.
app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));
const API_URL = "https://secrets-api.appbrewery.com";
// 4. When the user goes to the home page it should render the index.ejs file.

// app.get("/", async (req, res) => {
//   try {
//     res.render("index.ejs");
//   } catch (error) {
//     console.error("Failed to make request:", error.message);
//     res.render("index.ejs", {
//       error: error.message,
//     });
//   }
// });
// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.
app.get("/", async (req, res) => {
  try {
    const randomSecret = await axios.get(API_URL + "/random");
    // console.log(randomSecret);
    // console.log(randomSecret.data);
    // console.log(randomSecret.status);
    // console.log(randomSecret.request);
    // console.log(randomSecret.data.emScore);

    res.render("index.ejs", {
        // 🔻 data
      secret: randomSecret.data.secret,
      user: randomSecret.data.username,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
  console.log(`Server is running on port${port}.`);
});
