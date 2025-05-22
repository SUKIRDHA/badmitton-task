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
    const lastPlayer = playerList.lastElementChild;

    if (lastPlayer) {
        playerList.removeChild(lastPlayer);
    } else {
        alert("No players to remove");
    }
})
