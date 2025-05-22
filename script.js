document.getElementById("addPlayer").addEventListener("click", function() {
    const playerName = document.getElementById("playerName").value;

    if (playerName) {
        const playerList = document.getElementById("playersList");
        const newPlayer = document.createElement("li");
        newPlayer.textContent = `${playerName}`;
        playerList.appendChild(newPlayer);

        
        document.getElementById("playerName").value = "";
    } else {
        alert("Please enter player name ");
    }
})
document.getElementById("removePlayer").addEventListener("click", function() {
    const playerList = document.getElementById("playersList");
    const playerName = document.getElementById("playerName").value;
    const players = playerList.getElementsByTagName("li");
    let a = false;
    for (let i = 0; i < players.length; i++) {
        if (players[i].innerHTML === playerName) {
            playerList.removeChild(players[i]);
            a= true;
            break;
        }
    }
})
