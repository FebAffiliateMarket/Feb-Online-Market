const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const exphbs = require('express-handlebars');

const app = express();
const port = 2539;

// Connect to MongoDB
mongoose.connect("mongodb+srv://febejersey:Code101002@storagetest.f0sqjau.mongodb.net/FMO_Test")
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
// Configure Handlebars
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routes
app.use(authRoutes);

// Serve the index page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/views/home.html');
});

app .get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/views/signup.html');
});

app .get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/views/login.html');
});

app .get('/recover', (req, res) => {
    res.sendFile(__dirname + '/public/views/login.html');
});

app .get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/public/views/dashboard.html');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});