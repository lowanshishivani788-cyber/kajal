const express = require("express");
const bodyParser = require("body-parser");
const sendNotification = require("./firebase/sendNotification");

const app = express();
app.use(bodyParser.json());

app.post('/send-notification', async (req, res) => {
  const { token, title, body } = req.body;

  try {
    setTimeout(async () => {
      try {
        const response = await sendNotification(token, title, body);
        console.log('Notification sent:', response);
      } catch (err) {
        console.error('Notification failed after delay:', err);
      }
    }, 6000);

    res.send({ success: true, message: 'Notification will be sent after 3 seconds.' });
  } catch (error) {
    console.error('Push Error:', error);
    res.status(500).send({ error: 'Notification scheduling failed' });
  }
});


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
