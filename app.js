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
    console.log(playername);
    console.log("Request body:", req.body);

    if(!playername){
        return res.status(400).json({error:'Please provide name'});
    }
    const sql="Insert into players (name) values (?)";
    con.query(sql,[playername],function(error,result){
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
app.get('/getdata/player', (req, res) => {
    const sql = "SELECT name FROM players";
    
    con.query(sql, function(error, results) {
        if (error) {
            console.log('error:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

app.post('/match', (req, res) => {
    const { playerA, playerB, winner, date } = req.body;
    console.log("Request body:", req.body);
    if (!playerA|| !playerB|| !winner|| !date) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }
    const sql = "INSERT INTO matches (match_date, playerA, playerB, winner) VALUES (?, ?, ?, ?)";
    con.query(sql, [date, playerA, playerB, winner], function(error) {
        if (error) {
            console.log('error:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Match recorded successfully' });
    });
});

// GET endpoint to fetch all match results
app.get('/getdata/match', (req, res) => {
    const sql = "SELECT playerA, playerB, winner, match_date AS date FROM matches";
    con.query(sql, function(error, results) {
        if (error) {
            console.log('error:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});
app.get('/leaderboard', (req, res) => {
    const sql = `
        SELECT 
    p.name AS player,
    COALESCE(w.wins, 0) AS wins,
    COALESCE(l.losses, 0) AS losses
FROM 
    players p
LEFT JOIN (
    SELECT winner, COUNT(*) AS wins
    FROM matches
    GROUP BY winner
) w ON p.name = w.winner
LEFT JOIN (
    SELECT 
        CASE 
            WHEN winner = playerA THEN playerB
            WHEN winner = playerB THEN playerA
        END AS loser,
        COUNT(*) AS losses
    FROM matches
    GROUP BY loser
) l ON p.name = l.loser
ORDER BY wins DESC  `;
    con.query(sql, function(error, results) {
        if (error) {
            console.log('error:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});


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
//   con.query("create table matches(id INT AUTO_INCREMENT PRIMARY KEY,player_a_id INT NOT NULL,player_b_id INT NOT NULL,winner_id INT NOT NULL,match_date DATETIME DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY (player_a_id) REFERENCES playerdetails(id),FOREIGN KEY (player_b_id) REFERENCES playerdetails(id),FOREIGN KEY (winner_id) REFERENCES playerdetails(id))", function(error, result) {
//     if (error) {
//         console.log('error:', error);
//     }
//     else {
//         console.log('table created');
//     }
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)

}) 