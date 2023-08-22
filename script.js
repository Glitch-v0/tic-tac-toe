function playerSettings () {
    const greetingDialog = document.getElementById("greeting")
    const confirmButton = document.getElementById("confirmButton")
    const p1NameDisplay = document.getElementById("p1NameDisplay")
    const p2NameDisplay = document.getElementById("p2NameDisplay")
    const p1ScoreDisplay = document.getElementById("p1ScoreDisplay")
    const p2ScoreDisplay = document.getElementById("p2ScoreDisplay")
    confirmButton.addEventListener("click", () => {
        const p1NameInput = document.getElementById("p1Name")
        const p2NameInput = document.getElementById("p2Name")
    
        const p1Name = p1NameInput.value
        const p2Name = p2NameInput.value
        p1NameDisplay.textContent = p1Name
        p2NameDisplay.textContent = p2Name
        console.log("Player 1's name:", p1Name)
        console.log("Player 2's name:", p2Name)
    
        greetingDialog.close();
        //console.log(greetingDialog)
        // Handle form submission or further actions here
    });
    let p1Score = 0
    let p2Score = 0
    return {p1Name, p2Name, p1Score, p2Score, p1NameDisplay, p2NameDisplay, p1ScoreDisplay, p2ScoreDisplay}
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
            settings.p1Name = settings.p1NameDisplay.textContent
            settings.p2Name = settings.p2NameDisplay.textContent
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
                        resetCells((mark == "X" ? settings.p1Name : settings.p2Name) + " Wins! " + (mark == "X" ? settings.p2Name : settings.p1Name) + " starts this round.")
                        mark == "X" ? settings.p1Score++ : settings.p2Score++
                        settings.p1ScoreDisplay.textContent = settings.p1Score
                        settings.p2ScoreDisplay.textContent = settings.p2Score
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