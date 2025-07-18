// webapi.js
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const { sessions, sickdelay, sickproto, sickui, trasher } = require('./index');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const SESSION_FILE = path.join(__dirname, 'sessions.json');
const KEY_FILE = path.join(__dirname, 'keys.json');

if (!fs.existsSync(SESSION_FILE)) {
  fs.writeFileSync(SESSION_FILE, JSON.stringify({ keys: [] }, null, 2));
}

function isValidKey(keyInput) {
  if (!fs.existsSync(KEY_FILE)) return false;
  const keys = JSON.parse(fs.readFileSync(KEY_FILE));
  const found = keys.find(k => k.key === keyInput);
  if (!found) return false;
  const now = Date.now();
  const expires = new Date(found.expires).getTime();
  return now < expires;
}

function isLoggedIn(key) {
  const sessions = JSON.parse(fs.readFileSync(SESSION_FILE));
  return sessions.keys.includes(key);
}

function removeSession(key) {
  const sessions = JSON.parse(fs.readFileSync(SESSION_FILE));
  const updated = sessions.keys.filter(k => k !== key);
  fs.writeFileSync(SESSION_FILE, JSON.stringify({ keys: updated }, null, 2));
}

function authMiddleware(req, res, next) {
  const key = req.headers['x-session-key'];
  if (!key) return res.status(401).json({ error: 'Unauthorized' });

  const sessions = JSON.parse(fs.readFileSync(SESSION_FILE));
  const keys = fs.existsSync(KEY_FILE) ? JSON.parse(fs.readFileSync(KEY_FILE)) : [];
  const foundKey = keys.find(k => k.key === key);

  if (!foundKey || Date.now() > new Date(foundKey.expires).getTime()) {
    removeSession(key);
    return res.status(401).json({ error: 'Session expired' });
  }

  next();
}

app.post('/login', (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ success: false });

  if (isValidKey(key)) {
    const sessions = JSON.parse(fs.readFileSync(SESSION_FILE));
    if (!sessions.keys.includes(key)) {
      sessions.keys.push(key);
      fs.writeFileSync(SESSION_FILE, JSON.stringify(sessions, null, 2));
    }
    return res.json({ success: true });
  }

  res.json({ success: false });
});

app.post('/send', authMiddleware, async (req, res) => {
  const { command, number } = req.body;

  try {
    if (!command || !number) return res.status(400).json({ error: 'Missing parameters' });

    switch (command) {
      case 'voxstromvip':
        await sickdelay(number);
        break;
      case 'invisiblevip':
        await sickproto(number);
        break;
      case 'uisystem':
        await sickui(number);
        break;
      case 'trashervip':
        await trasher(number);
        break;
      case 'testreply':
        await sessions.get(number).sendMessage(number, { text: 'Assalamualaikum' });
        break;
      default:
        return res.status(400).json({ error: 'Invalid command' });
    }

    res.json({ success: true, message: `Command '${command}' sent to ${number}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/keys', (req, res) => {
  if (!fs.existsSync(KEY_FILE)) return res.json([]);
  const keys = JSON.parse(fs.readFileSync(KEY_FILE));
  res.json(keys);
});

app.post('/admindeletekey', (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ error: 'Missing key' });
  if (!fs.existsSync(KEY_FILE)) return res.status(404).json({ error: 'Key file not found' });

  let keys = JSON.parse(fs.readFileSync(KEY_FILE));
  keys = keys.filter(k => k.key !== key);
  fs.writeFileSync(KEY_FILE, JSON.stringify(keys, null, 2));

  removeSession(key);
  res.json({ success: true, message: 'Key deleted and session removed.' });
});

const ADMIN_KEY = 'qel_admin_supersecret';

app.post('/adminlogin', (req, res) => {
  const { key } = req.body;
  if (key === ADMIN_KEY) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Web API listening at http://localhost:${PORT}`);
});
