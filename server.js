const express = require("express");
const axios = require("axios");
require("dotenv").config();

console.log("API KEY:", process.env.GEMINI_API_KEY);

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

app.get("/test", async (req, res) => {

  try {

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: "hello"
              }
            ]
          }
        ]
      }
    );

    res.json(response.data);

  } catch (error) {

    console.log(
      JSON.stringify(
        error.response?.data,
        null,
        2
      )
    );

    res.status(500).json({
      success: false,
      response: "Server Error"
    });

  }

});

app.post("/generate", async (req, res) => {

  try {

    const prompt = req.body.prompt;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      }
    );

    const text =
      response.data.candidates[0]
        .content.parts[0].text;

    res.json({
      success: true,
      response: text
    });

  } catch (error) {

    console.log(
      JSON.stringify(
        error.response?.data,
        null,
        2
      )
    );

    res.status(500).json({
      success: false,
      response: "Server Error"
    });

  }

});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});