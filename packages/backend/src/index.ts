import express from "express";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, TypeScript and Express!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
