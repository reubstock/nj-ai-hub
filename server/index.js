const express = require('express');
const path = require('path');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/news', require('./routes/news'));
app.use('/api/events', require('./routes/events'));
app.use('/api/team', require('./routes/team'));
app.use('/api/partners', require('./routes/partners'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/legacy', require('./routes/legacy'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`NJ AI Hub running at http://localhost:${PORT}`));
