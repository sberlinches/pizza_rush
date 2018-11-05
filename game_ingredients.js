"use strict";

const PIZZA_UID         = 0;
const BASE_UID          = 1;
const TOMATO_SAUCE_UID  = 2;

/**
 * Pizza class.
 */
class Pizza {

    constructor() {
        this.uid = PIZZA_UID;
        this.name = 'Pizza tray';
        this.color = 'e5e5e5';
        this.x = 200;
        this.y = 200;
        this.radius = 100;
        this.rotation = 0;
        this.rotationSpeed = 0.001;
        this.ingredients = [];
    }

    addIngredient(ingredient) {
        this.ingredients.push(ingredient);
    }

    render(ctx) {

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Draw the pizza tray
        circle(ctx, 0, 0, this.radius, FULL_CIRCLE, '#'+this.color);

        // Draw each ingredient of the list
        for(let i = 0; i < this.ingredients.length; i++)
            this.ingredients[i].render(ctx);

        ctx.restore();

        // Sets up the rotation speed
        this.rotation += this.rotationSpeed;
    }
}

/**
 * Base class.
 */
class Base {

    constructor() {
        this.uid = BASE_UID;
        this.name = 'Pizza base';
        this.color = 'fcf5bf';
    }

    render(ctx) {
        circle(ctx,0,0,100,FULL_CIRCLE,'#'+this.color);
    }
}

/**
 * TomatoSauce class.
 */
class TomatoSauce {

    constructor() {
        this.uid = TOMATO_SAUCE_UID;
        this.name = 'Tomato sauce';
        this.color = 'ff2b2b';
    }

    render(ctx) {
        triangle(ctx,0,0,100,100,'#'+this.color);
    }
}