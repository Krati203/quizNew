
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose(); 

const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Connect to SQLite3 database
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        return console.error('Could not connect to the database:', err.message);
    }
    console.log('Connected to the SQLite3 database.');
});

// Create users table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        mobile TEXT,
        age TEXT,
        gender TEXT,
        email TEXT,
        passward TEXT
    )
`);

// Route to serve main.html on the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/main.html');
});

// Route to handle user registration
app.post('/register', (req, res) => {
    const { name, mobile, age, gender, email, passward } = req.body;

    db.run(
        `INSERT INTO users (name, mobile, age, gender, email, passward) VALUES (?, ?, ?, ?, ?, ?)`,
        [name, mobile, age, gender, email, passward],
        function (err) {
            if (err) {
                console.error('Error inserting data into the database:', err.message);
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ success: true, message: 'User registered successfully!' });
        }
    );
});


//  for show table.hml data 
// Route to serve table.html
app.get('/table', (req, res) => {
    res.sendFile(__dirname + '/public/table.html');
});

// API route to fetch all users
app.get('/api/users', (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            console.error('Error retrieving users:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});



/// for login page 
// Route to handle login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM users WHERE email = ? AND passward = ?`, [email, password], (err, row) => {
        if (err) {
            console.error('Error fetching user from database:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        if (row) {
            // Email and password match
            res.json({ success: true, message: 'Login successful!' });
        } else {
            // Email or password is incorrect
            res.json({ success: false, message: 'Invalid email or password' });
        }
    });
});

app.get('/instruction.html', (req, res) => {
    res.sendFile(__dirname + '/public/instruction.html');
});

// for forget passward 
// Route to handle password update
app.post('/update-password', (req, res) => {
    const { email, newPassword } = req.body;

    db.run(
        `UPDATE users SET passward = ? WHERE email = ?`,
        [newPassword, email],
        function (err) {
            if (err) {
                console.error('Error updating password:', err.message);
                return res.status(500).json({ error: 'Database error' });
            }
            if (this.changes > 0) {
                res.json({ success: true, message: 'Password updated successfully!' });
            } else {
                res.json({ success: false, message: 'No user found with this email' });
            }
        }
    );
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
