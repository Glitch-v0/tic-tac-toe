const gameBoard = (() => {
    var gridContainer = document.createElement("div");
    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateColumns = "repeat(3, 1fr)";
    gridContainer.style.gridTemplateRows = "repeat(3, 1fr)";
    gridContainer.style.height = "80vh";
    gridContainer.style.width = "80vh";
    gridContainer.id = "gridContainer"
    // Create an array of letters for the rows and columns
    var letters = ["A", "B", "C"];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var cell = document.createElement("div");
            cell.style.border = "4px solid black";
            cell.style.padding = "10px";
            cell.textContent = letters[i] + (j + 1);
            cell.id = letters[i] + (j + 1);
            cell.className = "gridCell";
            gridContainer.appendChild(cell);
            }
    }
    document.body.appendChild(gridContainer)
    }

)();

console.log(letters)