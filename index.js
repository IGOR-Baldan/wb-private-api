const express = require("express");
const axios = require("axios");
const moment = require("moment");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Корневой маршрут — для проверки работоспособности
app.get("/", (req, res) => {
  res.send("✅ WB Private API is working!");
});

// Новый маршрут — получение активных перемещений
app.get("/transfers", async (req, res) => {
  try {
    const since = moment().subtract(20, "days").toISOString();

    const response = await axios.get(
      "https://suppliers-api.wildberries.ru/api/v3/supplies",
      {
        headers: {
          Authorization: process.env.WB_API_KEY
        },
        params: {
          dateFrom: since
        }
      }
    );

    // Оставляем только те, что еще в пути
    const activeTransfers = response.data.supplies.filter(
      (item) => item.status !== "completed"
    );

    res.json(activeTransfers);
  } catch (error) {
    console.error("❌ Ошибка при получении перемещений:", error.message);
    res.status(500).json({
      error: "Ошибка запроса к Wildberries API",
      details: error.message
    });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
