//variables
let gameGrid = []
let rows = 0;
let columns = 0;
let gameGridWidth = 0;
let minesCount = 10;
let minesLoc = [];
let tilesClick = 0;
let flag = false;
let gameOver = false;
let selectedDifficulty = 'Beginner';
let flagIcon = "🚩";


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
        gameGridWidth = '800px'
        gameGridHeight = '800px'
    } else if (selectedDifficulty === "Advance") {
        columns = 16;
        rows = 16;
        minesCount = 40;
        gameGridWidth = '800px'
        gameGridHeight = '800px'
    } else if (selectedDifficulty === "Expert") {
        minesCount = 90;
        columns = 16;
        rows = 30;
        gameGridWidth = '800px'
        gameGridHeight = '800px'
    } else {
        minesCount = 10;
        rows = 8;
        columns = 8;
        gameGridWidth = '400px';
        gameGridHeight = '400px';
    }
};

function flagTile(tile) {
    if (tile.innerText == "") {
        tile.innerText = "🚩";
    } else if (tile.innerText == "🚩") {
        tile.innerText = "";
    }
    return;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function createMines() {
    for (var m = 0; m<minesCount; m++) {
        var xMine = getRandomInt(rows);
        var yMine = getRandomInt(columns);
        var newMine = xMine + "-" + yMine;
        if (minesLoc.includes(newMine)) {
            console.log("Dupe Mine, none added")
            m--
        } else {
            minesLoc.push(newMine)
        }
    }
    console.log(minesLoc)
}

//Do something to the tile, depending on the mouse click
function clickedTile(e) {
    var targetTile = e.target
    if (e.which === 1 || e.button === 0) {
        console.log("left click");
        if (minesLoc.includes(targetTile.id)) {
            console.log("oh no, you lose!")
            document.getElementById(targetTile.id).innerText == "💣";
        }
    }
    else if (e.which === 3 || e.button === 2) {
        console.log("right click"); 
        document.addEventListener('contextmenu', e => e?.cancelable && e.preventDefault());
        flagTile(targetTile)
    } else {
        return;
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
    document.getElementById('gameButtons').style.display = 'block';
    document.getElementById('gameStart').style.display = 'flex';
    document.getElementById('MineCounter').innerHTML = minesCount; 

    document.getElementById('gameGrid').style.width = gameGridWidth; 
    document.getElementById('gameGrid').style.width = gameGridHeight; 

    //Create the tiles:
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let cols = 0; cols < columns; cols++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + cols.toString();
            tile.addEventListener("mousedown", clickedTile);
            document.getElementById("gameGrid").append(tile);
            row.push(tile);
        }
        gameGrid.push(row);
    }
    console.log(gameGrid)
    createMines()

}

function restartGame() {
    //hide the game
    document.getElementById('StartedGame').style.display = 'none';
    document.getElementById('gameStart').style.display = 'none';
    document.getElementById('gameButtons').style.display = 'none';

    //show the instructions
    document.getElementById('DiffLevelContainer').style.display = 'block';
    document.getElementById('PlayButton').style.display = 'inline-block';

    //reset the game:
    gameGrid = document.getElementById('gameGrid');
    gameGrid.remove();
    newGrid = document.createElement("div");
    newGrid.id = "gameGrid";
    document.getElementById("gameStart").append(newGrid);
    rows = 0;
    columns = 0;
    gameGrid = [];
    minesLoc = [];

}

// function setFlag(e) {
    
// };




