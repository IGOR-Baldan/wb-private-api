const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const WBPrivateAPI = require("./src/WBPrivateAPI");

app.use(express.json());

// Пример базового маршрута, можешь заменить или добавить свои
app.get("/", async (req, res) => {
  res.send("✅ WB Private API is working!");
});

// если хочешь — добавь реальные ручки из ./src позже

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
