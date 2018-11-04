"use strict";

let canvas,
    ctx,
    pizza,
    ingredients = {};

/**
 * Starts the game.
 */
function startGame() {
    initGame();
    renderGame();
}

/**
 * Initializes all the variables and functions used in the game.
 */
function initGame() {

    canvas  = document.getElementById("canvas");
    ctx     = canvas.getContext("2d");

    // Add all the ingredients to be used to the ingredients' list
    ingredients.base        = new Base();
    ingredients.tomatoSauce = new TomatoSauce();

    // Initializes the pizza
    pizza = new Pizza();
    pizza.addIngredient(ingredients.base);

    // Initializes the drag and drop events
    initDragAndDrop();
}

/**
 * Renders all the game elements on the screen.
 */
function renderGame() {

    ctx.clearRect(0,0,canvas.width,canvas.height);
    pizza.render(ctx);
    //Static elements
    ingredients.tomatoSauce.render(ctx);
    requestAnimationFrame(renderGame);
}

/**
 * Initializes the drag and drop events.
 * Drags the ingredient to the pizza and add it.
 */
function initDragAndDrop() {

    let action = {
        origin: null,
        destination: null
    };

    // Simulates the drag event
    canvas.addEventListener("mousedown", function(event) {
        // Gets the dragged ingredient
        action.origin = getIngredientByColor(ingredients, getPixelColor(event, canvas));
    });

    // Simulates the drop event
    canvas.addEventListener("mouseup", function(event) {
        // Gets the ingredient where dragged ingredient is dropped
        action.destination = getIngredientByColor(ingredients, getPixelColor(event, canvas));

        // Only if the destination is the base, the dragged ingredient is added.
        if(action.destination === BASE_UID) {

            switch (action.origin) {
                case TOMATO_UID:
                    pizza.addIngredient(ingredients.tomatoSauce);
                    break;
            }

            // Resets the action object
            action.origin = null;
            action.destination = null;
        }
    });
}