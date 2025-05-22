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
    database:'playerdb',
});
con.connect(function(error){
    if(error){
        console.log('connect error:',error);
    }
})
app.post('/player',(req,res)=>{
    const playername=req.body.playername;
    const results=req.body.results;
    const Id=req.body.Id;
    if(!playername || !results || !Id){
        return res.status(400).json({error:'Please provide all required fields'});
    }
    const sql="Insert into players (id,name,result) values (?,?,?)";
    con.query(sql,[Id,playername,results],function(error,result){
        if(error){
            console.log('error:',error);
            return res.status(500).json({error:'Database error'});
        }
        else{
            console.log('values inserted');
            return res.status(200).json({message:'Values inserted successfully'});
        }
    }
)
})
app.get('/getdata/players', (req, res) => {
    const result = "SELECT * FROM players";
    con.query(result, function(error, result) {
        if (error) {
            console.log('error:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(result)
    })
}
);
app.put('/players/update', (req, res) => {
    const { playername, results, Id } = req.body;
    if (!playername || !results || !Id) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }
    const sql = "UPDATE players SET name = ?, result = ? WHERE id = ?";
    con.query(sql, [playername, results, Id], function(error, result) {
        if (error) {
            console.log('error:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Player not found' });
        }
        res.json({ message: 'Player updated successfully' });
    });

})
app.delete('/players/delete', (req, res) => {
    const{ Id } = req.body;
    if (!Id) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }
})

// const sql="Insert into players (id,name,result) values (?,?,?)";
// con.query(sql,[Id,playername,results],function(error,result){
//     if(error){

//         console.log('error:',error);
//     }
//     else{
//         console.log('values inserted');
//     }
// })
// con.query("CREATE database playerdb") 
// const createPlayersTableSql = "CREATE TABLE IF NOT EXISTS players (id INT, name VARCHAR(255) NOT NULL,result VARCHAR(255) NOT NULL)";
// con.query(createPlayersTableSql, function(error, result) {
//     if (error) {
//         console.log('error:', error);
//     }
//     else {
//         console.log('table created');
//     }
// });
// con.query("create table playerdetails(id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100) NOT NULL,wins INT DEFAULT 0,losses INT DEFAULT 0)", function(error, result) {
//     if (error) {
//         console.log('error:', error);
//     }
//     else {
//         console.log('table created');
//     }
// });
// con.query("create table matches(id INT AUTO_INCREMENT PRIMARY KEY,player_a_id INT NOT NULL,player_b_id INT NOT NULL,winner_id INT NOT NULL,match_date DATETIME DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY (player_a_id) REFERENCES playerdetails(id),FOREIGN KEY (player_b_id) REFERENCES playerdetails(id),FOREIGN KEY (winner_id) REFERENCES playerdetails(id))", function(error, result) {
//     if (error) {
//         console.log('error:', error);
//     }
//     else {
//         console.log('table created');
//     }
// });
// var details = "INSERT INTO playerdetails (id,name,wins,losses) VALUES ?";
// var values = [[1, 'harry',0,0], [2, 'rohan',0,0], [3, 'sindhu',0,0]];
// con.query(details, [values], function(error, result) {
//     if (error) {
//         console.log('error:', error);
//     }
//     else {
//         console.log('values inserted');
//     }
// });


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})