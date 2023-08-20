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

const playerController = (
    () => {
        gameBoard();
        var playerOneTurn = true;
        var playerTwoTurn = false;
        var canClick = true;
        var cells = document.getElementsByClassName("gridCell");
        var [col1, col2, col3, row1, row2, row3, diag1, diag2, winOptions] = [[], [], [], [], [], [], [], [], []];

        const checkWin = (mark) => {
            //console.log("Checking for win...")
            const resetCells = (message) => {
                canClick = false;
                    setTimeout(() => {
                        alert(`${message}`);
                        for(let cell of cells){
                            cell.textContent = "";
                            cell.style.backgroundColor = "white";
                            cell.style.fontSize = "clamp(2.5rem, 6vw, 3.5rem)";
                        }
                        canClick = true;
                    }, 400);
            }
            for (const option of winOptions) {
                if (option.every(cell => cell.textContent === mark)) {
                    option.forEach(cell => {
                        cell.style.backgroundColor = "var(--flash-color)"; // Highlight the winning cells
                    });
                    //console.log("Player with", mark, "has won on", option[0].classList);
                    canClick = false;
                    resetCells("Player " + (mark == "X" ? "One" : "Two") + " Wins! Player " + (mark == "X" ? "Two" : "One") + " starts now.")
                    break
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
                        cell.classList.add("flash"); // Add the "flash" class
                        cell.textContent = mark;
                        cell.style.fontSize = "6.5rem";
                        setTimeout(() => {
                            cell.classList.remove("flash"); // Remove the "flash" class
                        }, 250); // Adjust the duration (in milliseconds) as needed
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
        //Adds various cell groups to win conditions
        winOptions.push(row1, row2, row3, col1, col2, col3, diag1, diag2)
        //console.log({row1, row2, row3, col1, col2, col3, diag1, diag2})
        //console.log({winOptions})
    })()