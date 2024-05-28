const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const dbconfig= require("./config/dbconfig");
const path = require('path'); //to deploy
dotenv.config();

const app= express();
app.use(express.json());
app.use(morgan('dev'));
const userRoute = require('./routes/userRoute')
const adminRoutes = require("./routes/adminRoutes");
app.use('/api/admin', adminRoutes);
app.use('/api/user' ,userRoute);
app.use(express.static(path.join(__dirname,"./client/build"))) //to deploy
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
const port = process.env.PORT || 5000;
app.get('/',(req,res) => {
    reset.status(201).send({
        message: "server running"
    });
});
app.listen(port, () => {console.log(`Node server started at port ${port}`)});
