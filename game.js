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
    ingredients.base        = new Base(40, canvas.height-40, 40);
    ingredients.tomatoSauce = new TomatoSauce(120, canvas.height-40, 40);
    ingredients.olive       = new Olive(200, canvas.height-40, 30);

    // Initializes the pizza
    let r = 100;
    let x = (canvas.width-(r/2))/2;
    let y = (canvas.height-(r/2))/2;
    pizza = new Pizza(x, y, r);

    // Initializes the drag and drop events
    initDragAndDrop();
}

/**
 * Renders all the game elements on the screen.
 */
function renderGame() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pizza.render(ctx);

    // Draw each ingredient of the list
    for (let key in ingredients)
        ingredients[key].render(ctx);

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
            if (circleCollision(pizza, pointer)) {

                // Due the translation in the render method in the pizza object,
                // the dropped ingredients' coordinates have to be recalculated.
                let x = pointer.x - pizza.x;
                let y = pointer.y - pizza.y;

                switch (action.origin) {
                    case BASE_UID:
                        pizza.addIngredient(new Base(x, y, 90));
                        break;
                    case TOMATO_SAUCE_UID:
                        pizza.addIngredient(new TomatoSauce(x, y, 80));
                        break;
                    case OLIVE_UID:
                        pizza.addIngredient(new Olive(x, y, 10));
                        break;
                }
            }

            console.log(pizza.ingredients);

            // Resets the action
            action = initAction();
        }
    });
}