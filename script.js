document.addEventListener("DOMContentLoaded", () => {
    const valueBar = document.querySelector("#valueBar");
    const displayValue = document.querySelector("#displayValue");

    // Set up an event listener to detect changes
    valueBar.addEventListener("input", (event) => {
        const selectedValue = event.target.value; // Get the value of the slider
        displayValue.textContent = selectedValue; // Display the value dynamically
        console.log("Slider Value:", selectedValue); // Log the value to the console
    });
});
