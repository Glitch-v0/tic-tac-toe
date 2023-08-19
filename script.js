const gameBoard = (() => {
    var gridContainer = document.createElement("div");
    gridContainer.id = "gridContainer"
    
    // Create an array of letters for the rows and columns
    var letters = ["A", "B", "C"];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var cell = document.createElement("div");
            cell.id = letters[i] + (j + 1);
            cell.className = "gridCell";
            cell.textContent = letters[i] + (j + 1);
            gridContainer.appendChild(cell);
            }
    }
    document.body.appendChild(gridContainer)
    }

);

const playerController = (
    () => {
        gameBoard();
        var playerOneTurn = true;
        var playerTwoTurn = false;
        var cells = document.getElementsByClassName("gridCell");
        var col1 = [];
        var col2 = [];
        var col3 = [];
        var row1 = [];
        var row2 = [];
        var row3 = [];
        var diag1 = [];
        var diag2 = [];
        var winOptions = [];
        const checkWin = (mark) => {
            console.log("Checking for win...")
            for (const option of winOptions) {
                if (option.every(cell => cell.textContent === mark)) {
                    option.forEach(cell => {
                        cell.style.backgroundColor = "var(--flash-color)"; // Highlight the winning cells
                    });
                    console.log("Player with", mark, "has won on", option[0].classList);
                    setTimeout(() => {
                        alert("Player " + (mark == "X" ? "One" : "Two") + " Wins! Player " + (mark == "X" ? "Two" : "One") + " starts now.");
                        for(cell of cells){
                            cell.textContent = cell.id;
                            cell.style.backgroundColor = "white";
                            cell.style.fontSize = "clamp(2rem, 5vw, 3.5rem)"
                        }
                    }, 400);
                    break
                }
            }
        }
        for (let i = 0; i < cells.length; i++) {
            //Add row win area
            if(cells[i].textContent.includes("A")){
                row1.push(cells[i])
                console.log(`Added ${cells[i].textContent} to row1 ${row1}`)
            }
            if(cells[i].textContent.includes("B")){
                row2.push(cells[i])
                console.log(`Added ${cells[i].textContent} to row1 ${row2}`)
            }
            if(cells[i].textContent.includes("C")){
                row3.push(cells[i])
                console.log(`Added ${cells[i].textContent} to row1 ${row3}`)
            }
            //Add column win area
            if(cells[i].textContent.includes("1")){
                col1.push(cells[i])
                console.log(`Added ${cells[i].textContent} to row1 ${col1}`)
            }
            if(cells[i].textContent.includes("2")){
                col2.push(cells[i])
                console.log(`Added ${cells[i].textContent} to row1 ${col2}`)
            }
            if(cells[i].textContent.includes("3")){
                col3.push(cells[i])
                console.log(`Added ${cells[i].textContent} to row1 ${col3}`)
            }
            //Add diagonal win area
            if(cells[i].textContent.includes("A1") || cells[i].textContent.includes("B2") || cells[i].textContent.includes("C3")){
                diag1.push(cells[i])
                console.log(`Added ${cells[i].textContent} to row1 ${diag1}`)
            }
            if(cells[i].textContent.includes("C1") || cells[i].textContent.includes("B2") || cells[i].textContent.includes("A3")){
                diag2.push(cells[i])
                console.log(`Added ${cells[i].textContent} to row1 ${diag2}`)
            }
            winOptions.push(row1, row2, row3, col1, col2, col3, diag1, diag2)
            console.log({row1, row2, row3, col1, col2, col3, diag1, diag2})
            console.log({winOptions})
            //Turn handling
            cells[i].addEventListener("mousedown", (e) => {
                var cell = cells[i];
                if (cell.textContent != cell.id) {
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
        }
)()