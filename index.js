const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Временно ничего не подключаем из src
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ WB Private API is working!");
});

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
