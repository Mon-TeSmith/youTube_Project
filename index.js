const connectDB = require("./startup/db");
const express = require("express");
const comments = require('./routes/comments');
const users = require('./models/users');
const app = express();

connectDB();

app.use(express.json());
app.use('/api/comments', comments);
app.use('/api/users', users);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server started on port: ${port}`)
});