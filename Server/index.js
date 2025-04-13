const express = require('express');
const cookieParser = require('cookie-parser');
const userModel = require('./routes/users')
const taskModel = require('./routes/tasks')
const upload = require('./routes/multer')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.post('/register', upload.single('image'), async (req, res) => {
    const { username, email, password } = req.body;
    const imagefile = req.file ? req.file.filename : null;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const User = await userModel.create({ username, email, password: hash, image: imagefile })
            const token = jwt.sign({ email: email, useris: User._id }, "shhhh")
            res.cookie("token", token)
            res.json()
            console.log("User Created Successfully", { User })
        })
    })
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email })
    if (!user) return res.json('Something Went Wrong')
    bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
            const token = jwt.sign({ email: email, useris: user._id }, "shhhh")
            res.cookie("token", token)
            res.json()
            console.log("User Created Successfully", { user })
        } else return res.json("went wrong")
    })
})

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect("/login");
    const { useris, email } = jwt.verify(token, "shhhh");
    req.user = { _id: useris, email };
    next();
}

app.get('/profile', isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email })
    if (!user) return res.redirect("/login");
    res.json(user)
})

app.get("/logout", (req, res) => {
    res.cookie("token", "")
    res.json()
})

app.post('/createTask', upload.single('image'), isLoggedIn, async (req, res) => {
    const task = await taskModel.create({ ...req.body, image: req.file ? req.file.filename : null, user: req.user._id });
    await userModel.findByIdAndUpdate(req.user._id, { $push: { tasks: task._id } });
    res.json(await task.save());
    console.log("Created Task: ", task);
});

app.get('/getAllTasks', isLoggedIn, async (req, res) => {
    const tasks = await taskModel.find({ user: req.user._id })
    res.json(tasks)
})

app.get('/getTask/:id', async (req, res) => {
    const task = await taskModel.findById(req.params.id);
    res.json(task)
})

app.put('/updateTask/:id', upload.single('image'), async (req, res) => {
    const { task, term } = req.body;
    imagefile = req.file ? req.file.filename : null;
    const updatedTask = await taskModel.findByIdAndUpdate(req.params.id, { task, term, image: imagefile }, { new: true });
    res.json(updatedTask)
})

app.delete('/deleteTask/:id', isLoggedIn, async (req, res) => {
    await taskModel.findByIdAndDelete(req.params.id);
    res.json()
})

app.listen(4000, () => { console.log("Server running on port 4000") });