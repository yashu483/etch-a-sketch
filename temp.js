"use strict";

// Assigning variable for most commonly used node at global scope
let selectedValue = 40;
const valueBar = document.querySelector("#valueBar");
const displayValue = document.querySelector("#displayValue");
const penColor = document.querySelector('#color-picker');
const gridBackground = document.querySelector('#grid-background');
let board = document.querySelector(".board-container");

//Set event listner for coloring cell on mouseover
board.addEventListener('mouseover', (event) => {
    let target = event.target;
    let color = penColor.value;
    if (target.className == 'cell' && mouseDown == true) {
        target.style.backgroundColor = color;
    }
});

//set event listener for coloring cell on click
board.addEventListener('click', (event) => {
    let target = event.target;
    let color = penColor.value;
    if (target.className == 'cell') {
        target.style.backgroundColor = color;
    }
})

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
        };
    };
};

//assign all buttons to a variable
let buttons = document.querySelectorAll("button");

//add a new property to button node to check if its on or off
let isOn = false;
buttons.forEach((item) => {
    item.isOn = false;
});

/* Object.defineProperty(item, 'isOn', {
    get() {
        return this.isOn = false;
    },
    set(value) {
        this.isOn = value;
        if (value == true) {
            if (item.id == 'black-pen') {
                blackClicked();
            }
        }
    }
}) */

// add event listener to turn off and on button on click
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.isOn === false) {
            console.log("first:-- " + button.isOn);
            button.isOn = true;
            console.log('then: --' + button.isOn);
            button.style.backgroundColor = 'greenyellow';
        }
        else if (button.isOn === true) {
            console.log("first:--" + button.isOn);
            button.isOn = false;
            console.log('then: --' + button.isOn);
            button.style.backgroundColor = 'white';
        };
        if (button.id == 'black-pen') {
            if (button.isOn == true) {
                penColor.value = '#000000';
            } blackClicked();
        }
    });
});

//set variable to detect mousedown and mouseup and change value accordingly

let mouseDown = false;
document.addEventListener('mousedown', () => {
    mouseDown = true
});
document.addEventListener('mouseup', () => {
    mouseDown = false;
})

//create functions for buttons clicked
//black color button clicked
function blackClicked() {
    //   set isOn to false to white and rainbow     //  set bg of to white

    buttons.forEach((item) => {
        console.log(item.id + '&&' + item.isOn);
        if (item.id == 'white-pen' || item.id == 'rainbow-pen' || item.id == 'eraser') {
            item.isOn = false;
            item.style.backgroundColor = 'white';
        };
    });

    //   check if l or d ior f is enabled, and work accordingly
};
//create function to run the for each button enabled

function runProgrammeByButtons(button) {

};

function runProgrammeByInputs() {

}
