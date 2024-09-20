
// const express = require('express');
// const bodyParser = require('body-parser');
// const sqlite3 = require('sqlite3').verbose(); 

// const app = express();
// const port = 3000;

// // Serve static files from the public directory
// app.use(express.static('public'));

// // Middleware to parse incoming JSON data
// app.use(bodyParser.json());

// // Connect to SQLite3 database
// const db = new sqlite3.Database('./users.db', (err) => {
//     if (err) {
//         return console.error('Could not connect to the database:', err.message);
//     }
//     console.log('Connected to the SQLite3 database.');
// });

//  // Create users table if it doesn't exist
//  db.run(`
//     CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT,
//         mobile TEXT,
//         age TEXT,
//         gender TEXT,
//         email TEXT,
//         passward TEXT
//     )
// `);

// // Create Admin table if it doesn't exist
// db.run(`
//     CREATE TABLE IF NOT EXISTS Admin (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         staffId TEXT NOT NULL,
//         password TEXT NOT NULL
//     )
// `);
// });



// // Route to serve main.html on the root URL
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/main.html');
// });

// // Route to handle user registration
// app.post('/register', (req, res) => {
//     const { name, mobile, age, gender, email, passward } = req.body;

//     db.run(
//         `INSERT INTO users (name, mobile, age, gender, email, passward) VALUES (?, ?, ?, ?, ?, ?)`,
//         [name, mobile, age, gender, email, passward],
//         function (err) {
//             if (err) {
//                 console.error('Error inserting data into the database:', err.message);
//                 return res.status(500).json({ error: 'Database error' });
//             }
//             res.json({ success: true, message: 'User registered successfully!' });
//         }
//     );
// });


// //  for show table.hml data 
// // Route to serve table.html
// app.get('/table', (req, res) => {
//     res.sendFile(__dirname + '/public/table.html');
// });

// // API route to fetch all users
// app.get('/api/users', (req, res) => {
//     db.all(`SELECT * FROM users`, [], (err, rows) => {
//         if (err) {
//             console.error('Error retrieving users:', err.message);
//             return res.status(500).json({ error: 'Database error' });
//         }
//         res.json(rows);
//     });
// });



// /// for login page 
// // Route to handle login
// app.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     db.get(`SELECT * FROM users WHERE email = ? AND passward = ?`, [email, password], (err, row) => {
//         if (err) {
//             console.error('Error fetching user from database:', err.message);
//             return res.status(500).json({ error: 'Database error' });
//         }

//         if (row) {
//             // Email and password match
//             res.json({ success: true, message: 'Login successful!' });
//         } else {
//             // Email or password is incorrect
//             res.json({ success: false, message: 'Invalid email or password' });
//         }
//     });
// });

// app.get('/instruction.html', (req, res) => {
//     res.sendFile(__dirname + '/public/instruction.html');
// });

// // for forget passward 
// // Route to handle password update
// app.post('/update-password', (req, res) => {
//     const { email, newPassword } = req.body;

//     db.run(
//         `UPDATE users SET passward = ? WHERE email = ?`,
//         [newPassword, email],
//         function (err) {
//             if (err) {
//                 console.error('Error updating password:', err.message);
//                 return res.status(500).json({ error: 'Database error' });
//             }
//             if (this.changes > 0) {
//                 res.json({ success: true, message: 'Password updated successfully!' });
//             } else {
//                 res.json({ success: false, message: 'No user found with this email' });
//             }
//         }
//     );
// });


// // Route to handle form submission for Admin table
// app.post('/admin', (req, res) => {
//     const { staffId, password } = req.body;

//     db.run(
//         `INSERT INTO Admin (staffId, password) VALUES (?, ?)`,
//         [staffId, password],
//         function (err) {
//             if (err) {
//                 console.error('Error inserting data into Admin table:', err.message);
//                 return res.status(500).json({ error: 'Database error' });
//             }
//             res.json({ success: true, message: 'Admin data stored successfully!' });
//         }
//     );
// });


// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });




const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');


const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Middleware to parse incoming JSON data
app.use(bodyParser.json());
app.use(cors());


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

// Create Admin table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS Admin (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        staffId TEXT NOT NULL,
        password TEXT NOT NULL
    )
`);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Question1 (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT,
        option1 TEXT,
        option2 TEXT,
        option3 TEXT,
        option4 TEXT,
        correctAnswer TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Question2 (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT,
        option1 TEXT,
        option2 TEXT,
        option3 TEXT,
        option4 TEXT,
        correctAnswer TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Question3 (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT,
        option1 TEXT,
        option2 TEXT,
        option3 TEXT,
        option4 TEXT,
        correctAnswer TEXT
    )`);
});

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


// Route to handle staff login
app.post('/staff-login', (req, res) => {
    const { staffId, password } = req.body;

    db.get(`SELECT * FROM Admin WHERE staffId = ? AND password = ?`, [staffId, password], (err, row) => {
        if (err) {
            console.error('Error fetching admin from database:', err.message);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (row) {
            // Staff ID and password match
            res.json({ success: true, message: 'Login successful!' });
        } else {
            // Staff ID or password is incorrect
            res.json({ success: false, message: 'Invalid staff ID or password. In case you\'ve forgotten your password, please contact our admin panel for assistance.' });
        }
    });
});



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

// Route to handle form submission for Admin table
app.post('/admin', (req, res) => {
    const { staffId, password } = req.body;

    console.log('Received data for Admin table:', { staffId, password }); // Debugging statement

    db.run(
        `INSERT INTO Admin (staffId, password) VALUES (?, ?)`,
        [staffId, password],
        function (err) {
            if (err) {
                console.error('Error inserting data into Admin table:', err.message);
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ success: true, message: 'Admin data stored successfully!' });
        }
    );
});




// API route to fetch all Admin data
// API route to fetch all Admin data
app.get('/api/admin', (req, res) => {
    db.all(`SELECT * FROM Admin`, [], (err, rows) => {
        if (err) {
            console.error('Error retrieving admin data:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

// Route to serve manage.html
app.get('/manage.html', (req, res) => {
    res.sendFile(__dirname + '/public/manage.html');
});

// =================================================================only for questions==============================================================

// POST endpoint for Question 1
app.post('/api/question-one', (req, res) => {
    const { question, options, correctAnswer } = req.body;
    db.run(`INSERT INTO Question1 (question, option1, option2, option3, option4, correctAnswer) VALUES (?, ?, ?, ?, ?, ?)`, 
    [question, options[0], options[1], options[2], options[3], correctAnswer], 
    function(err) {
        if (err) {
            return res.json({ success: false, message: err.message });
        }
        res.json({ success: true });
    });
});

// POST endpoint for Question 2
app.post('/api/question-two', (req, res) => {
    const { question, options, correctAnswer } = req.body;
    db.run(`INSERT INTO Question2 (question, option1, option2, option3, option4, correctAnswer) VALUES (?, ?, ?, ?, ?, ?)`, 
    [question, options[0], options[1], options[2], options[3], correctAnswer], 
    function(err) {
        if (err) {
            return res.json({ success: false, message: err.message });
        }
        res.json({ success: true });
    });
});

// POST endpoint for Question 3
app.post('/api/question-three', (req, res) => {
    const { question, options, correctAnswer } = req.body;
    db.run(`INSERT INTO Question3 (question, option1, option2, option3, option4, correctAnswer) VALUES (?, ?, ?, ?, ?, ?)`, 
    [question, options[0], options[1], options[2], options[3], correctAnswer], 
    function(err) {
        if (err) {
            return res.json({ success: false, message: err.message });
        }
        res.json({ success: true });
    });
});

// GET endpoint for Question 1
app.get('/api/questions-one', (req, res) => {
    db.all(`SELECT * FROM Question1`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ questions: rows });
    });
});

// GET endpoint for Question 2
app.get('/api/questions-two', (req, res) => {
    db.all(`SELECT * FROM Question2`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ questions: rows });
    });
});

// GET endpoint for Question 3
app.get('/api/questions-three', (req, res) => {
    db.all(`SELECT * FROM Question3`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ questions: rows });
    });
});

// =============================================================Add Questions in fom=================================================================




// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


// Close the database on exit
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
        process.exit(0);
    });
});