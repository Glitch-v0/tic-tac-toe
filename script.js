function playerSettings () {
    const p1Name = prompt("Player One: What is your name?")
    const p2Name = prompt("Player Two: What is your name?")
    let p1Score = 0
    let p2Score = 0
    return {p1Name, p2Name, p1Score, p2Score}
}

const gameBoard = (() => {
    var gridContainer = document.getElementById("gridContainer");
    
    // Create an array of letters for the rows and columns
    var letters = ["A", "B", "C"];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) { 
            var cell = document.createElement("div");
            cell.id = letters[i] + (j + 1);
            cell.className = "gridCell";
            cell.textContent = "";
            gridContainer.appendChild(cell);
            }
    }
    }

);

const gridCellFlash = (cells, duration, classToUse) => {
    //console.log("flash function running")
    if(Array.isArray(cells)) {
        //console.log('used an array!')
        for(let cell of cells){
            cell.classList.add(classToUse);
            //console.log(`added flash to ${cell.id}`)
            setTimeout(() => {
                cell.classList.remove(classToUse);
                //console.log(`removed flash from ${cell.id}`)
            }, duration);
        }
    } else {
        //console.log("used a single cell!")
        cells.classList.add(classToUse);
        //console.log(`added flash to ${cells}`)
            setTimeout(() => {
                cells.classList.remove(classToUse);
                //console.log(`removed flash from ${cells}`)
            }, duration);  
    }
}

const playerController = (
    () => {
        gameBoard();
        var settings = playerSettings();
        var playerOneTurn = true;
        var playerTwoTurn = false;
        var canClick = true;
        var cells = document.getElementsByClassName("gridCell");
        var [col1, col2, col3, row1, row2, row3, diag1, diag2, winOptions] = [[], [], [], [], [], [], [], [], []];

        const checkWin = (mark) => {
            //console.log("Checking for win...")
            const resetCells = (message) => {
                canClick = false;
                alert(`${message}`);
                for(let cell of cells){
                    cell.textContent = "";
                }
                canClick = true;
            }
            for (const option of winOptions) {
                if (option.every(cell => cell.textContent === mark)) {
                    canClick = false;
                    gridCellFlash(option, 900, "flash");
                    //console.log("Player with", mark, "has won on", option[0].classList);
                    setTimeout(() => {
                        resetCells("Player " + (mark == "X" ? "One" : "Two") + " Wins! Player " + (mark == "X" ? "Two" : "One") + " starts now.")
                        mark == "X" ? settings.p1Score++ : settings.p2Score++
                        console.log(`Score: ${settings.p1Name}: ${settings.p1Score}, ${settings.p2Name}: ${settings.p2Score}`)
                    }, 900)
                } else {
                    //console.log('No win yet.')
                }
            }
            if (Array.from(cells).every(cell => cell.textContent != "")){
                resetCells("It's a draw! Player " + (playerOneTurn == true ? "Two" : "One") + " starts the next round.");
            } 
            }
        const cellIteration = (character, cell, grouptoPush) => {
            if(cell.id.includes(character)){
                grouptoPush.push(cell)
                //console.log(`Added ${cell.id} to ${grouptoPush}`)
            }}
        // Iterates through placing the cells in various groupings for win conditions
        const itterArray = [["A", row1], ["B", row2], ["C", row3], ["1", col1], ["2", col2], ["3", col3],
        ["A1", diag1], ["B2", diag1], ["C3", diag1], ["C1", diag2], ["B2", diag2], ["A3", diag2]]
        for (let cell of cells) {
            for (let [character, group] of itterArray) {
                cellIteration(character, cell, group);
            }
            //Turn handling
            cell.addEventListener("mousedown", (e) => {
                if (cell.textContent != "" || canClick == false) {
                    // Do nothing
                } else {
                    const marking = (mark) => {
                        gridCellFlash(cell, 50, "mark")
                        cell.textContent = mark;
                    }
                    if(playerOneTurn){
                        marking("X");
                        checkWin("X");
                        playerOneTurn = false;
                        playerTwoTurn = true;
                    } else if (playerTwoTurn){
                        marking("O");
                        checkWin("O");
                        playerTwoTurn = false;
                        playerOneTurn = true;
                    }
                }
            })
        }
        winOptions.push(row1, row2, row3, col1, col2, col3, diag1, diag2)
    })()