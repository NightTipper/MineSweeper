//variables
let gameGrid = []
let rows = 8;
let columns = 8;
let minesCount = 10;
let minesLoc = [];
let tilesClick = 0;
let flag = false;
let gameOver = false;
let selectedDifficulty = 'Beginner';

// Change the difficulty of the game
DifficultyLevel.onchange = function() {
    selectedDifficulty = this.options[this.selectedIndex].getAttribute('data-level');
    DifficultySelected.innerHTML = 'Difficulty: ' + this.options[this.selectedIndex].getAttribute('data-level');
}

function updateLevelSettings() {
    if (selectedDifficulty === "Master") {
        columns = 16;
        rows = 36;
        minesCount = 140;
    } else if (selectedDifficulty === "Advance") {
        columns = 16;
        rows = 16;
        minesCount = 40;
    } else if (selectedDifficulty === "Expert") {
        minesCount = 90;
        columns = 16;
        rows = 30;
    } else {
        minesCount = 10;
    }
};


window.addEventListener('load', () => {
    document.getElementById('DifficultySelected').innerHTML = 'Difficulty: ' + selectedDifficulty;
    selectedDifficulty = 'Beginner';
});

// Functions

//Start the game of minesweeper
//Hide the difficulty level
//Show a reset button
function startGame() {
    //Grab the level settings
    updateLevelSettings()

    // Hide the following elements:
    document.getElementById('DiffLevelContainer').style.display = 'none';
    document.getElementById('PlayButton').style.display = 'none';

    //Display the new game:
    document.getElementById('StartedGame').style.display = 'block';
    document.getElementById('gameStart').style.display = 'flex';
    document.getElementById('MineCounter').innerHTML = minesCount; 


    //Create the tiles:
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let cols = 0; cols < columns; cols++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + cols.toString();
            document.getElementById("gameGrid").append(tile);
            row.push(tile);
        }
        gameGrid.push(row);
    }
    console.log(gameGrid)

}

function restartGame() {
    //hide the game
    document.getElementById('StartedGame').style.display = 'none';
    document.getElementById('gameStart').style.display = 'none';

    //show the instructions
    document.getElementById('DiffLevelContainer').style.display = 'block';
    document.getElementById('PlayButton').style.display = 'block';
}




