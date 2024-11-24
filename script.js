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
    // make  a loop for continuosly creating block divs so it can store inline divs size of user inptuted value

    // make a nested loop to append  inline divs size  based on user input value for same numbers.
    let size = 480 / selectedValue;
    let arrayDiv = [];
    for (let i = 0; i < selectedValue; i++) {
        const div = document.createElement('div');
        div.setAttribute("style",
            `width : max-content;
            height : max-content;
            margin : 0px ;
            padding : none ;
            border : none ;`
        )
        board.append(div);
        for (let i = 0; i < selectedValue; i++) {
            const div1 = document.createElement('div');
            div1.setAttribute("style",
                `width : ${size}px; 
                height : ${size}px;
                margin : 0px;
                padding : none;
                display: inline-block;
                border: 1px solid black`);

            arrayDiv.push(div1);
            board.appendChild(div1);

        }
    }
    // board.append(...arrayDiv);

}

createGridBoard();
