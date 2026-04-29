const express = require('express');
const path = require('path');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '..', 'public'), { etag: false, maxAge: 0 }));
app.use((req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });

app.use('/api/news',    require('./routes/news'));
app.use('/api/events',  require('./routes/events'));
app.use('/api/team',    require('./routes/team'));
app.use('/api/partners', require('./routes/partners'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/legacy',  require('./routes/legacy'));
app.use('/api/ai-news', require('./routes/ai-news'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`NJ AI Hub running at http://localhost:${PORT}`);
  // Seed Vercel KV with initial data on first boot (no-op if already seeded or no KV configured)
  require('./kv-store').seedIfNeeded().catch(console.error);
});
