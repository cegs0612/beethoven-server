const express = require("express")
const app = express();
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();
let dbConnected = false;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

db.connect((err)=>{
    if (err) throw err;
    console.log("DB conected");
    dbConnected=true;
})

app.get("/",(req,res)=>{
    dbConnected&&res.send("Server running");
})

app.get("/api/get",(req,res)=>{
    const sqlSelect = "SELECT * FROM datos_sonatas";
    db.query(sqlSelect,(err,result)=>{
        if (err) throw err;
        res.json(result);
    })
})

app.post("/api/download",(req,res)=>{
    const url = req.body.dirFile;
    res.download(url);
})


app.listen(process.env.PORT, ()=>{console.log('server running')});