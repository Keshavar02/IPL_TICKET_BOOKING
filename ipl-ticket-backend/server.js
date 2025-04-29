import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Keshav@SQL02',
  database: 'IPL_Ticket_Booking',
});

db.connect(err => {
  if (err) console.error('DB connection error:', err);
  else console.log('Connected to MySQL database.');
});

// Routes
app.post('/api/register', (req, res) => {
  const { name, email, phone, password } = req.body;
  db.query(
    'INSERT INTO User (name, email, phone, password) VALUES (?, ?, ?, ?)',
    [name, email, phone, password],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'User registered successfully' });
    }
  );
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.query(
    'SELECT * FROM User WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length > 0) {
        res.json({ message: 'Login successful', user: results[0] });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});







