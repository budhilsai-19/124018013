const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8008;

app.get('/numbers', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL query parameter' });
  }

  const urls = Array.isArray(url) ? url : [url];

  const numberPromises = urls.map(async (url) => {
    try {
      const response = await axios.get(url);
      return response.data.numbers;
    } catch (error) {
      return null;
    }
  });

  const numbers = await Promise.all(numberPromises);
  res.json({ numbers });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
