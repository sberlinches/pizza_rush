"use strict";

class Level {

    constructor(ingredients, pizza) {
        this.level = 1;
        this.isOrderValid = true;
        this.ingredients = ingredients;
        this.pizza = pizza;
        this.order = [];

        this.createOrder();
    }

    /**
     * Repeats the actual level
     */
    repeatLevel() {

        this.isRecipeOk = true;
        this.renderOrder();
    }

    /**
     * Initializes the next level
     */
    nextLevel() {

        this.level++;
        this.isRecipeOk = true;
        this.createOrder();
        this.renderOrder();
    }

    /**
     * Creates a order based on the ingredient list
     */
    createOrder() {

        this.order = [];

        // Fills the order with random ingredients from the list
        for(let i = 0; i < this.level + 1; i++)
            this.order.push(this.ingredients[getRandomNumber(0, this.ingredients.length)]);
    }

    /**
     *
     * @param ingredientUid
     */
    checkOrder(ingredientUid) {

        if(this.order[0].uid === ingredientUid)
            this.order.shift();
        else
            this.isOrderValid = false;

        if(this.order.length === 0) {
            if(this.isOrderValid) {
                console.log('You made it!');
                this.pizza.reset();
                level.nextLevel();
            }
            else {
                console.log('The recipe has been messed up! Try it again');
                this.pizza.reset();
                this.repeatLevel();
            }
        }
    }

    /**
     * Renders the order on screen
     */
    renderOrder() {

        let order = document.getElementById('order');
        order.innerHTML = '';
        let title = document.createElement('h2');
        let list = document.createElement('ol');

        for (let i = 0; i < this.order.length; i++) {

            let li = document.createElement('li');
            let text = document.createTextNode(this.order[i].name);

            li.appendChild(text);
            list.appendChild(li);
        }

        title.appendChild(document.createTextNode('Level ' + this.level));
        order.appendChild(title);
        order.append(list);
    }
}

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
    ingredients.push(new Base(40, canvas.height-40, 40));
    ingredients.push(new TomatoSauce(120, canvas.height-40, 40));
    ingredients.push(new Olive(200, canvas.height-40, 30));

    // Initializes the pizza
    pizza = new Pizza(canvas.width/2, canvas.height/2, 250);
    level = new Level(ingredients, pizza);
    level.renderOrder();

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