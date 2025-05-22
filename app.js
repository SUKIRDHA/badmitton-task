const express=require('express');
const cors=require('cors');
const mysql=require('mysql2');

const app=express();
app.use(cors());
app.use(express.json());

let PORT=process.env.PORT || 5000;
const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Sugi1311_',
    database:'mydb'
});
con.connect(function(error){
    if(error){
        console.log('connect error:',error);
    }
})
con.query("CREATE database playerdb")
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})