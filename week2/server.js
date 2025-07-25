const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.static('public'));

// /add endpoint
app.get('/add', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: 'Both a and b must be numbers.' });
  }

  const sum = a + b;
  res.json({ result: sum });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
