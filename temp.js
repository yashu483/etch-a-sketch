"use strict";

// Assigning variable for most commonly used node at global scope
let selectedValue = 40;
const valueBar = document.querySelector("#valueBar");
const displayValue = document.querySelector("#displayValue");
const penColor = document.querySelector('#color-picker');
const gridBackgroundColor = document.querySelector('#grid-background');
const inputs = document.querySelectorAll('input');
let board = document.querySelector(".board-container");

//Set event listner for coloring cell on mouseover
board.addEventListener('mouseover', (event) => {
    let target = event.target;
    let color = penColor.value;
    if (target.className == 'cell' && mouseDown == true) {

        const cells = document.querySelectorAll('.cell');
        const eraser = document.querySelector('#eraser');
        const lighten = document.querySelector('#go-lighten');
        const darken = document.querySelector("#go-darken");
        const fade = document.querySelector('#go-fade');

        //lighten pen
        buttons.forEach((button) => {
            if (button.id == 'go-lighten' && button.isOn == true && eraser.isOn == false) {

                let opacity = parseFloat(getComputedStyle(target).getPropertyValue('opacity'));

                if (opacity <= 0.1) {
                    target.classList.add('cell');
                    target.style.opacity = '1';
                } else {
                    opacity = (opacity - 0.15).toFixed(1);
                    target.style.opacity = `${opacity}`;
                };
                target.penUsed = true;
                target.style.backgroundColor = penColor.value;
            }
        });

        //darken pen
        buttons.forEach((button) => {
            if (button.id == 'go-darken' && button.isOn == true && eraser.isOn == false) {

                let opacity = parseFloat(getComputedStyle(target).getPropertyValue('opacity'));
                if (opacity >= 1) {
                    target.classList.add('cell');
                    target.style.opacity = '0.2';
                    target.penUsed = true;
                    target.style.backgroundColor = penColor.value;
                }
                else {
                    target.classList.add('cell');
                    opacity = (opacity + 0.1).toFixed(1);
                    target.style.opacity = `${opacity}`;
                    target.penUsed = true;
                    target.style.backgroundColor = penColor.value;
                };
            }
        });

        // go fade pen
        buttons.forEach((button) => {
            if (button.id == 'go-fade' && button.isOn == true && eraser.isOn == false) {

                // Function to fade out a single element
                function fadeOutElement(element, duration) {
                    const interval = 50; // Time between each step (ms)
                    const steps = duration / interval; // Total number of steps
                    let opacity = 1; // Start fully visible
                    element.penUsed = true;
                    element.style.backgroundColor = penColor.value;

                    function fadeStep() {
                        opacity -= 1 / steps; // Decrease opacity incrementally
                        if (opacity <= 0) {
                            opacity = 1;
                            element.style.backgroundColor = gridBackgroundColor.value;
                            element.penUsed = false;
                            element.style.opacity = `${opacity}`; // Hide element completely
                            return; // Stop further steps
                        }
                        element.style.opacity = opacity.toFixed(2); // Update opacity
                        setTimeout(fadeStep, interval); // Schedule the next step
                    }

                    fadeStep(); // Start the fade-out process
                };
                fadeOutElement(target, 10000); // 5 seconds duration
            }
        });

        //eraser
        buttons.forEach((button) => {
            if (button.id == 'eraser' && button.isOn == true) {
                console.log(button.isOn);
                target.penUsed = false;
                target.style.backgroundColor = gridBackgroundColor.value;
                target.style.opacity = 1;
                return;
            }

        });

        // black pen and white pen
        buttons.forEach((button) => {
            if ((button.id == 'back-pen' || button.id == 'white-pen') &&
                lighten.isOn == false && darken.isOn == false && fade.isOn == false && eraser.isOn == false) {
                target.penUsed = true;
                target.style.backgroundColor = penColor.value;
                target.style.opacity = 1;
            }
        });

        buttons.forEach((button) => {
            if (button.id == 'rainbow-pen' && button.isOn == true && eraser.isOn == false) {
                target.penUsed = true;
                function getRandomColor() {
                    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                };
                penColor.value = getRandomColor();
                target.style.backgroundColor = penColor.value;
                target.style.opacity = 1;
            }
        })
    }
});

//set event listener for coloring cell on click
board.addEventListener('click', (event) => {
    let target = event.target;
    let color = penColor.value;
    if (target.className == 'cell') {
        target.penUsed = true;
        target.style.backgroundColor = color;
    }
})

//Set up event listener to get user's input value for grid size
document.addEventListener("DOMContentLoaded", () => {
    selectedValue = valueBar.value;

    buttons.forEach((button) => {
        if (button.id == 'show-grid' || button.id == 'white-grid' || button.id == 'go-fade') {
            button.isOn = true;
            button.style.backgroundColor = 'greenyellow';
        }
        else if (button.id == 'rainbow-pen') {
            button.isOn = true;
            button.classList.add('rainbow-click');
        }
    });
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
            cell.penUsed = false;
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

//add a new property to color inputs to check if user is using it
inputs.forEach((input) => {
    if (input.id == 'color-picker' || input.id == 'grid-background') {
        input.isOn = false;
    }
})

/* Object.defineProperty(item, 'isOn', {
    get() {
        return this.isOn = false;
    },
    set(value) {
        this.isOn = value;
        if (value == true) {
            if (item.id == 'black-pen') {
                blackPenEnabled();
            }
        }
    }
}) */

// add event listener to turn off and on buttons on click
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.isOn === false) {
            if (button.id == 'rainbow-pen') {
                button.isOn = true;
                button.className = 'rainbow-click'
            }
            else if (button.id == 'erase-all') {
                button.classList.add('button');
                const cells = document.querySelectorAll('.cell');
                cells.forEach((cell) => {
                    cell.style.backgroundColor = gridBackgroundColor.value;
                })
            }
            else if (button.id == 'reset') {
                button.classList.add('button');
                resetClicked();
            }
            else {
                button.isOn = true;
                button.style.backgroundColor = 'greenyellow';
            };
        }
        else if (button.isOn === true) {
            if (button.id == 'rainbow-pen') {
                button.isOn = false;
                button.classList.remove('rainbow-click');
                button.style.backgroundColor = 'white';
                blackActive();
                blackPenEnabled();
            }
            else if (button.id == 'white-pen') {
                button.isOn = false;
                button.style.backgroundColor = 'white';
                blackActive();
                blackPenEnabled();
            }
            else if (button.id == 'reset') {
                button.isOn = true;
                resetClicked();
            }
            else {
                button.isOn = false;
                button.style.backgroundColor = 'white';
            }
        };
        switch (button.id) {
            case 'black-pen': {
                if (button.isOn == true) {
                    penColor.value = '#000000';
                    penColor.isOn = false;
                };
                blackPenEnabled();
            };
                break;
            case 'white-pen': {
                if (button.isOn == true) {
                    penColor.value = '#FFFFFF';
                    penColor.isOn = false;
                    whitePenEnabled();
                }
            };
                break;
            case 'rainbow-pen': {
                if (button.isOn == true) {
                    penColor.isOn = false;
                    rainbowPenEnabled();
                }
            };
                break;
            case 'go-darken': goDarken();
                break;
            case 'go-lighten': goLighten();
                break;
            case 'go-fade': goFade();
                break;
            case 'normal': normalMode();
                break;
            case 'white-grid': {
                gridBackgroundColor.value = '#FFFFFF';
                const cells = document.querySelectorAll('.cell');
                cells.forEach((item) => {
                    if (item.penUsed == false) {
                        item.style.backgroundColor = 'white';
                    }
                });
                const blackGrid = document.querySelector('#black-grid');
                blackGrid.isOn = false;
                blackGrid.style.backgroundColor = 'white';
                blackGrid.classList.add('button');

            };
                break;
            case 'black-grid': {
                gridBackgroundColor.value = '#000000';
                const cells = document.querySelectorAll('.cell');
                cells.forEach((item) => {
                    if (item.penUsed == false) {
                        item.style.backgroundColor = 'black';
                    }
                });
                const whiteGrid = document.querySelector('#white-grid');
                whiteGrid.isOn = false;
                whiteGrid.style.backgroundColor = 'white';
                whiteGrid.classList.add('button');
            };
                break;

        }

    });
});

//add event listener for color input values
inputs.forEach((input) => {
    if (input.id == 'color-picker' || input.id == 'grid-background') {
        input.addEventListener('input', () => {
            if (input.isOn == false) {
                input.isOn = true;
            };
            switch (input.id) {
                case 'color-picker': {
                    if (input.isOn == true) {
                        let color = input.value;
                        penColor.value = color;
                        colorPickerUsed();
                    }
                };
                    break;
                case 'grid-background': {
                    if (input.isOn = true) {
                        const whiteGrid = document.querySelector('#white-grid');
                        whiteGrid.isOn = false;
                        whiteGrid.style.backgroundColor = 'white';
                    };
                    const cells = document.querySelectorAll('.cell');
                    cells.forEach((item) => {
                        if (item.penUsed == false) {
                            item.style.backgroundColor = input.value;
                        }
                    })
                }
            }
        })
    }
})

//set variable to detect mousedown and mouseup and change value accordingly

let mouseDown = false;
document.addEventListener('mousedown', () => {
    mouseDown = true
});
document.addEventListener('mouseup', () => {
    mouseDown = false;
})

//create functions for buttons clicked
//make function for black color pen option clicked
function blackPenEnabled() {
    buttons.forEach((item) => {
        if (item.id == 'white-pen' || item.id == 'eraser') {
            item.isOn = false;
            item.style.backgroundColor = 'white';
        }
        else if (item.id == 'rainbow-pen') {
            item.isOn = false;
            item.classList.remove('rainbow-click');
            item.classList.add('rainbow');
            item.style.backgroundColor = 'white';
        }
    });

};

//make function for white-pen color enabled
function whitePenEnabled() {
    buttons.forEach((item) => {
        if (item.id == 'black-pen' || item.id == 'eraser') {
            item.isOn = false;
            item.style.backgroundColor = 'white';
        }
        else if (item.id == 'rainbow-pen') {
            item.isOn = false;
            item.classList.remove('rainbow-click');
            item.classList.add('rainbow');
        }
    })
};

//make function for rainbow color pen enabled
function rainbowPenEnabled() {
    buttons.forEach((item) => {
        if (item.id == 'black-pen' || item.id == 'eraser' || item.id == 'white-pen') {
            item.isOn = false;
            item.style.backgroundColor = 'white';
        }
    })
};

//make function for colorPicker used
function colorPickerUsed() {

    buttons.forEach((button) => {
        if (button.id == 'white-pen' || button.id == 'black-pen' || button.id == 'eraser') {
            button.isOn == false;
            button.style.backgroundColor = 'white';
        }
        else if (button.id == 'rainbow-pen') {
            button.isOn = false;
            button.classList.remove('rainbow-click');
            button.classList.add('rainbow');
        }
    })

};

function blackActive() {
    buttons.forEach((button) => {
        if (button.id == 'black-pen') {
            button.isOn = true;
            button.style.backgroundColor = 'greenyellow';
            penColor.value = '#000000';
        }
    })
}

// make function for lightner enabled
function goLighten() {
    buttons.forEach((button) => {
        if (button.id == 'go-darken' || button.id == 'go-fade' || button.id == 'normal') {
            button.isOn = false;
            button.style.backgroundColor = 'white';
        }
    });
};

//make function for darkner enabled
function goDarken() {
    buttons.forEach((button) => {
        if (button.id == 'go-lighten' || button.id == 'go-fade' || button.id == 'normal') {
            button.isOn = false;
            button.style.backgroundColor = 'white'
        }
    })
};

//make function for fade enabled
function goFade() {
    buttons.forEach((button) => {
        if (button.id == 'go-lighten' || button.id == 'go-darken' || button.id == 'normal') {
            button.isOn = false;
            button.style.backgroundColor = 'white';
        }
    })
};

//make function for normal enabled
function normalMode() {
    buttons.forEach((button) => {
        if (button.id == 'go-lighten' || button.id == 'go-darken' || button.id == 'go-fade') {
            button.isOn = false;
            button.style.backgroundColor = 'white';
        }
    })
};

//make function for white background button
function whiteGridButton() {
    buttons.forEach((button) => {
        button.isOn = true
    })
};

//make function for reset button clicked
function resetClicked() {
    gridBackgroundColor.value = '#FFFFFF';
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
        cell.style.backgroundColor = gridBackgroundColor.value;
    });

    // set grid size to 30 * 30
    valueBar.value = 30;
    createGridBoard();

    buttons.forEach((button) => {
        if (button.id == 'go-fade' || button.id == 'show-grid' || button.id == 'white-grid') {
            button.isOn == true;
            button.style.backgroundColor = 'greenyellow';

        }
        else if (button.id == 'rainbow-pen') {
            button.isOn == true;
            button.classList.add('rainbow-click');
        }
        else {
            button.isOn = false;
            button.style.backgroundColor = 'white';
            button.classList.add('button');
        }
    })
}
//create function to run the for each button enabled
