"use strict";

let canvas,
    ctx,
    pizza,
    ingredients = [],
    draggedIngredient = null,
    showDraggedIngredient = false,
    level;

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
    let size = 50;
    let margin = 20;
    ingredients.push(new Base(size+margin, size+margin, size));
    ingredients.push(new TomatoSauce(size+margin, size+margin*2+size*2, size));
    ingredients.push(new Olive(size+margin, size+margin*3+size*4, size-12));
    ingredients.push(new Pineapple(size+margin, size+margin*4+size*6, size));
    ingredients.push(new Ham(size+margin, size+margin*5+size*8, size));
    ingredients.push(new Cheese(size+margin, size+margin*6+size*10, size));

    // Initializes the pizza
    pizza = new Pizza(canvas.width/2, canvas.height/2, 250);
    level = new Level(ingredients, pizza);

    // Initializes the drag and drop events
    initDragAndDrop();
}

/**
 * Renders all the game elements on the screen.
 */
function renderGame() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pizza.render(ctx);

    // Render each ingredient of the list
    for(let i = 0; i < ingredients.length; i++)
        ingredients[i].render(ctx);

    // Render the ingredient when is being dragged
    if(showDraggedIngredient)
        draggedIngredient.render(ctx);

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

    // The dragged ingredient follows the cursor
    function dragIngredientAnimation() {
        let pointer = getPointerCoordinates(event, canvas);
        draggedIngredient.x = pointer.x;
        draggedIngredient.y = pointer.y;
    }

    let action = initAction();

    // Simulates the drag event
    canvas.addEventListener("mousedown", function(event) {

        // Gets the dragged ingredient
        action.origin = getIngredientByColor(ingredients, getPixelColor(event, canvas));

        if(action.origin) {

            let pointer = getPointerCoordinates(event, canvas);

            // Creates a shadow ingredient to animate the drag action
            showDraggedIngredient = true;
            draggedIngredient = createIngredientByUid(action.origin, pointer.x, pointer.y);
            draggedIngredient.globalAlpha = 0.7;
            canvas.addEventListener("mousemove", dragIngredientAnimation);
        }
    });


    // Simulates the drop event
    canvas.addEventListener("mouseup", function(event) {

        if (action.origin) {

            let pointer = getPointerCoordinates(event, canvas);

            // Once the ingredient has been dropped is the animation is removed
            showDraggedIngredient = false;
            draggedIngredient = null;
            canvas.removeEventListener("mousemove", dragIngredientAnimation);

            // If the destination is the pizza, the dragged ingredient is added.
            if (circleCollision(pizza, pointer)) {

                // Due the translation in the render method in the pizza object,
                // the dropped ingredients' coordinates have to be recalculated.
                let x = pointer.x - pizza.x;
                let y = pointer.y - pizza.y;

                pizza.addIngredient(createIngredientByUid(action.origin, x, y));
                level.checkOrder(action.origin);
            }

            // Resets the action
            action = initAction();
        }
    });
}