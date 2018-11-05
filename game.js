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

    function initAction() {
        return { origin: null, destination: null }
    }

    let action = initAction();

    // Simulates the drag event
    canvas.addEventListener("mousedown", function(event) {

        // Gets the dragged ingredient
        action.origin = getIngredientByColor(ingredients, getPixelColor(event, canvas));
    });

    // Simulates the drop event
    canvas.addEventListener("mouseup", function(event) {

        if (action.origin) {

            let pointer = getPointerCoordinates(event, canvas);

            // If the destination is the pizza, the dragged ingredient is added.
            if (circleCollision(pizza, pointer))
                switch (action.origin) {
                    case BASE_UID:
                        pizza.addIngredient(ingredients.base);
                        break;
                    case TOMATO_SAUCE_UID:
                        pizza.addIngredient(ingredients.tomatoSauce);
                        break;
                }

            console.log(pizza.ingredients);

            // Resets the action
            action = initAction();
        }
    });
}