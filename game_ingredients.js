"use strict";

const PIZZA_UID         = 0;
const BASE_UID          = 1;
const TOMATO_SAUCE_UID  = 2;
const OLIVE_UID         = 3;
const PINEAPPLE_UID     = 4;
const HAM_UID           = 5;
const CHEESE_UID        = 6;

/**
 * Pizza class.
 */
class Pizza {

    constructor(x, y, radius) {

        this.uid = PIZZA_UID;
        this.name = 'Pizza tray';
        this.color = 'e5e5e5';
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.type = FULL_CIRCLE;
        this.fillColor = '#' + this.color;
        this.strokeColor = '#d6d6d6';
        this.strokeWidth = 6;
        this.globalAlpha = null;
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.ingredients = [];
    }

    addIngredient(ingredient) {
        this.ingredients.push(ingredient);
    }

    reset() {
        this.ingredients = [];
        this.rotationSpeed = 0;
    }

    render(ctx) {

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Render the pizza tray
        circle(ctx, 0, 0, this.radius, this.type, this.fillColor, this.strokeColor, this.strokeWidth, this.globalAlpha);

        // Render each ingredient of the list
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

    constructor(x, y, radius) {

        this.uid = BASE_UID;
        this.name = 'Pizza base';
        this.color = 'fcf5bf';
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.type = FULL_CIRCLE;
        this.fillColor = '#' + this.color;
        this.strokeColor = '#e2dcaa';
        this.strokeWidth = (this.radius*5)/100;
        this.globalAlpha = null;
    }

    render(ctx) {
        circle(ctx, this.x, this.y, this.radius, this.type, this.fillColor, this.strokeColor, this.strokeWidth, this.globalAlpha);
    }
}

/**
 * TomatoSauce class.
 */
class TomatoSauce {

    constructor(x, y, radius) {

        this.uid = TOMATO_SAUCE_UID;
        this.name = 'Tomato sauce';
        this.color = 'ff2b2b';
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.type = FULL_CIRCLE;
        this.fillColor = '#' + this.color;
        this.strokeColor = '#c12222';
        this.strokeWidth = (this.radius*5)/100;
        this.globalAlpha = null;
    }

    render(ctx) {
        circle(ctx, this.x, this.y, this.radius, this.type, this.fillColor, this.strokeColor, this.strokeWidth, this.globalAlpha);
    }
}

/**
 * Olive class.
 */
class Olive {

    constructor(x, y, radius) {

        this.uid = OLIVE_UID;
        this.name = 'Olive';
        this.color = '332929';
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.type = FULL_CIRCLE;
        this.fillColor = null;
        this.strokeColor = '#' + this.color;
        this.strokeWidth = (this.radius*70)/100;
        this.globalAlpha = null;
    }

    render(ctx) {
        circle(ctx, this.x, this.y, this.radius, this.type, this.fillColor, this.strokeColor, this.strokeWidth, this.globalAlpha);
    }
}

/**
 * Pineapple class.
 */
class Pineapple {

    constructor(x, y, size) {

        this.uid = PINEAPPLE_UID;
        this.name = 'Pineapple';
        this.color = 'edd525';
        this.x = x;
        this.y = y;
        this.width = size;
        this.height = size*2;
        this.fillColor = '#' + this.color;
        this.strokeColor = '#c6b111';
        this.strokeWidth = (size*5)/100;
        this.globalAlpha = null;
    }

    render(ctx) {
        triangle(ctx, this.x, this.y, this.width, this.height, this.fillColor, this.strokeColor, this.strokeWidth, this.globalAlpha);
    }
}

/**
 * Ham class.
 */
class Ham {

    constructor(x, y, size) {

        this.uid = HAM_UID;
        this.name = 'Ham';
        this.color = 'cc8eac';
        this.x = x;
        this.y = y;
        this.width = size*2;
        this.height = size*2;
        this.fillColor = '#' + this.color;
        this.strokeColor = '#ad728e';
        this.strokeWidth = (size*5)/100;
        this.globalAlpha = null;
    }

    render(ctx) {
        rhombus(ctx, this.x, this.y, this.width, this.height, this.fillColor, this.strokeColor, this.strokeWidth, this.globalAlpha);
    }
}

/**
 * Cheese class.
 */
class Cheese {

    constructor(x, y, size) {

        this.uid = CHEESE_UID;
        this.name = 'Cheese';
        this.color = 'faffb5';
        this.x = x;
        this.y = y;
        this.width = size*2;
        this.height = size*2;
        this.fillColor = '#' + this.color;
        this.strokeColor = '#e0e59c';
        this.strokeWidth = (size*5)/100;
        this.globalAlpha = null;
    }

    render(ctx) {
        rectangle(ctx, this.x, this.y, this.width, this.height, this.fillColor, this.strokeColor, this.strokeWidth, this.globalAlpha);
    }
}