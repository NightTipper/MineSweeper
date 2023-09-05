//variables
let gameGrid = []
let rows = 0;
let columns = 0;
let gameGridWidth = 0;
let minesCount = 10;
let minesLoc = [];
let tilesClicked = 0;
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

function checkBox(tile) {
    // Function to check the alternatives boxes for any other mines.
    console.log("Checking other boxes...")
    
}

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
    for (let m = 0; m<minesCount; m++) {
        let xMine = getRandomInt(rows);
        let yMine = getRandomInt(columns);
        let newMine = xMine + "-" + yMine;
        if (minesLoc.includes(newMine)) {
            console.log("Dupe Mine, none added")
            m--
        } else {
            minesLoc.push(newMine)
        }
    }
    console.log(minesLoc)
}

function revealMines() {
    for (let r= 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = gameGrid[r][c];
            if (minesLoc.includes(tile.id)) {
                if (tile.innerText == "🚩") {
                    tile.innerText = '❌'
                    tile.style.backgroundColor = "orange";
                } else {
                    tile.innerText = "💣";
                    tile.style.backgroundColor = "red";                
                }
            }
        }
    }
}

function checkFlaggedMine(tile) {
    if (tile.innerText == "🚩") {
        console.log("Safe!")
        return
    } else {
        tile.innerText = "💣";
        revealMines()
        console.log("Oh no, you lose!!")
    }
}

//Do something to the tile, depending on the mouse click
function clickedTile(e) {
    let targetTile = e.target
    if (e.which === 1 || e.button === 0) {
        if (minesLoc.includes(targetTile.id)) {
            checkFlaggedMine(targetTile);
        } else {
            let coords = targetTile.id.split("-"); 
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            checkBox(r, c);
        }
        console.log(tilesClicked);
    }
    else if (e.which === 3 || e.button === 2) {
        document.addEventListener('contextmenu', e => e?.cancelable && e.preventDefault());
        flagTile(targetTile)
        console.log(tilesClicked);
    } else {
        return;
    }
};


function checkBox(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    if (gameGrid[r][c].classList.contains("tile-clicked")) {
        return;
    }

    gameGrid[r][c].classList.add("tile-clicked");
    tilesClicked += 1;

    let minesFound = 0;

    //top 3
    minesFound += checkTile(r-1, c-1);      //top left
    minesFound += checkTile(r-1, c);        //top 
    minesFound += checkTile(r-1, c+1);      //top right

    //left and right
    minesFound += checkTile(r, c-1);        //left
    minesFound += checkTile(r, c+1);        //right

    //bottom 3
    minesFound += checkTile(r+1, c-1);      //bottom left
    minesFound += checkTile(r+1, c);        //bottom 
    minesFound += checkTile(r+1, c+1);      //bottom right

    if (minesFound > 0) {
        gameGrid[r][c].innerText = minesFound;
        gameGrid[r][c].classList.add("x" + minesFound.toString());
    }
    else {
        gameGrid[r][c].innerText = "";
        
        //top 3
        checkBox(r-1, c-1);    //top left
        checkBox(r-1, c);      //top
        checkBox(r-1, c+1);    //top right

        //left and right
        checkBox(r, c-1);      //left
        checkBox(r, c+1);      //right

        //bottom 3
        checkBox(r+1, c-1);    //bottom left
        checkBox(r+1, c);      //bottom
        checkBox(r+1, c+1);    //bottom right
    }

    if (tilesClicked == rows * columns - minesCount) {
        console.log("Game Completed!")
        console.log(tilesClicked)
        document.getElementById("MineCounter").innerText = "Cleared";
        let CompletionMessage = document.createElement("div");
        CompletionMessage.id = "CompletionMessage";
        document.getElementById(CompletionMessage).innerText = "Congratulations!";
        document.getElementById("resetButton").append(CompletionMessage)


        //add in a congratulations message, and display button to play again
        gameOver = true;
    }
}

function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }
    if (minesLoc.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;
}


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




