"use strict";

let selectedValue = 40;
const valueBar = document.querySelector("#valueBar");
const displayValue = document.querySelector("#displayValue");

console.log(valueBar.value);
//Set up event listener to get user's input value for grid size
document.addEventListener("DOMContentLoaded", () => {
    selectedValue = valueBar.value;
    // Set up an event listener to detect changes
    createGridBoard();
});

//set event listener to change grid size when user use the slider.
valueBar.addEventListener("input", (event) => {
    // Get the value of the slider
    selectedValue = event.target.value;
    // Display selected value in paragraph 
    displayValue.textContent = selectedValue;
    createGridBoard();
});

let board = document.querySelector(".board-container");

// make function to create grid based on users inputed value

function createGridBoard() {
    //remove previous grid so new grid can take place of it
    board.replaceChildren();
    // make  a loop for continuosly creating block divs so it can store
    // inline divs size of user inptuted value

    // make a nested loop to append  inline divs size  based on user input value 
    //for same numbers.
    selectedValue = valueBar.value;
    for (let i = 0; i < selectedValue; i++) {
        const gridRow = document.createElement('div');
        gridRow.className = 'row';

        board.appendChild(gridRow);

        for (let j = 0; j < selectedValue; j++) {
            const cell = document.createElement('div');
            cell.classList.add("cell");

            gridRow.appendChild(cell);
        }
    }
    // board.append(...arrayDiv);

}

createGridBoard();
