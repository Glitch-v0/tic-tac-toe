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

)();

const playerController = (
    () => {
        var playerOneTurn = true;
        var playerTwoTurn = false;
        alert('Player 1- Your Turn!')
        let cells = document.getElementsByClassName("gridCell");
        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener("mousedown", (e) => {
                var cell = cells[i];
                if (cell.textContent === "O" || cell.textContent === "X") {
                    // Do nothing
                } else {
                    cell.classList.add("flash"); // Add the "flash" class
                    cell.textContent = "X";
                    cell.style.fontSize = "6.5rem";
                    setTimeout(() => {
                        cell.classList.remove("flash"); // Remove the "flash" class
                    }, 200); // Adjust the duration (in milliseconds) as needed
                }
            })}}
)()