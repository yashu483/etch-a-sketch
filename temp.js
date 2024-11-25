"use strict";

let selectedValue = 40;
const valueBar = document.querySelector("#valueBar");
const displayValue = document.querySelector("#displayValue");

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

    //make div as rows for grid by using loop
    selectedValue = valueBar.value;
    for (let i = 0; i < selectedValue; i++) {
        const gridRow = document.createElement('div');
        gridRow.className = 'row';

        board.appendChild(gridRow);

        //make nested loop to add cells to each rows
        for (let j = 0; j < selectedValue; j++) {
            const cell = document.createElement('div');
            cell.classList.add("cell");

            gridRow.appendChild(cell);
        }
    }
};

//assign all buttons to a variable
let buttons = document.querySelectorAll("button");

//add a new property to button node to check if its on or off
let isOn = false;
buttons.forEach((item) => {
    item.isOn = false;
});
// add event listener to turn off and on button on click

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.isOn === false) {
            console.log("first:-- " + button.isOn);
            button.isOn = true;
            console.log('then: --'+ button.isOn);
            button.style.backgroundColor = 'greenyellow';
        }
        else if (button.isOn === true) {
            console.log("first:--" + button.isOn);
            button.isOn = false;
            console.log('then: --'+ button.isOn);
            button.style.backgroundColor = 'white';
        }
    });
});


createGridBoard();
