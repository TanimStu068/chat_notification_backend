const express = require("express");
const bodyParser = require("body-parser");
const notificationsRoute = require("./routes/notifications");

const app = express();
app.use(bodyParser.json());

app.use("/api", notificationsRoute); // all routes will be under /api/send-notification

// app.listen(3000, () => console.log("Server running on port 3000"));
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://0.0.0.0:${PORT}`));
