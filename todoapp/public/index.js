const express = require('express')
const app = express ()
require('dotenv').config()
const cors = require('cors')
app.use(cors())
const mongoURI = process.env.MONGO_URI
const port = process.env.PORT|| 5959
const mongoose = require('mongoose')
app.use(express.json());
const bcrypt = require('bcryptjs');

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });


    const TodoSchema = new mongoose.Schema({
        text: { type: String },
        completed: { type: Boolean, default: false }
    });


const Todo = mongoose.model('Todo', TodoSchema);

// User Schema and Model
const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

app.get('/', (req, res) => {
    res.send('Welcome to the Todo API');
});


// Nodemailer setup
const nodemailer = require('nodemailer');


// Signup Route
app.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();
        console.log('user saved successful');
        
        const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Todo App!',
            html: `<h2>Welcome, ${firstName} ${lastName}!</h2>
                <p>Thank you for signing up for the Todo App. We're excited to have you on board!</p>
                <p>Start organizing your task ahead with us.</p>
                <br>
                <p>Best regards,<br><b>The Todo App Team</b></p>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending welcome email:', error);
            } else {
                console.log('Welcome email sent:', info.response);
            }
        });

        res.status(201).json({ message: 'Signup successful.' });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ message: 'Server error.' });
    }
});


// Signin Route
app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        res.status(200).json({ message: 'Signin successful.' });
    } catch (err) {
        console.error('Error during signin:', err);
        res.status(500).json({ message: 'Server error.' });
    }
});


app.post('/todos', async (req, res) => {
    try {
        console.log("Received todo:", req.body);
        const newTodo = new Todo(req.body);
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        console.error('Error creating todo:', err);
        res.status(400).json({ message: err.message });
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting todo:', err);
        res.status(400).json({ message: err.message });
    }
});

app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedTodo);
    } catch (err) {
        console.error('Error updating todo:', err);
        res.status(400).json({ message: err.message });
    }
});

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(port, ()=>{
    console.log('Here we go!');
    
})