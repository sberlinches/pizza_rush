"use strict";

/**
 * Calculates and returns whether the two circles intersect or not.
 * @param circleA
 * @param circleB
 * @returns {boolean} Whether the two circles intersect or not
 */
function circleCollision(circleA, circleB) {

    let r = circleA.radius + circleB.radius;
    let x = circleA.x - circleB.x;
    let y = circleA.y - circleB.y;

    return (r > Math.sqrt((x * x) + (y * y)));
}

/**
 * Compares the color of each ingredient in the list with the provided
 * color. If there's a match the ingredient is returned.
 * @param ingredients The list of ingredients
 * @param color The color to look for
 */
function getIngredientByColor(ingredients, color) {

    for(let i = 0; i < ingredients.length; i++)
        if(ingredients[i].color === color)
            return ingredients[i].uid;
}

/**
 * Gets and returns the color of the pixel under the mouse cursor.
 * @param event The mouse event
 * @param canvas The canvas object
 * @returns {string} The color in hexadecimal
 */
function getPixelColor(event, canvas) {

    let pointer = getPointerCoordinates(event, canvas);
    let color = ctx.getImageData(pointer.x, pointer.y, 1, 1).data;

    return rgbToHex(color[0],color[1],color[2]);
}

/**
 * Converts rgb values into an hexadecimal string.
 * @param r Red
 * @param g Green
 * @param b Blue
 * @returns {string} The hexadecimal string
 */
function rgbToHex(r, g, b) {

    return decToHex(r)+decToHex(g)+decToHex(b);
}


/**
 * Converts a decimal number into an hexadecimal string.
 * @param d Decimal number
 * @returns {string} The hexadecimal string
 */
function decToHex(d) {

    let hex = Number(d).toString(16);

    if (hex.length < 2)
        hex = '0' + hex;

    return hex;
}

/**
 * Calculates and returns the pointer position inside the canvas.
 * @param event
 * @param canvas
 * @returns {{x: number, y: number, radius: number}}
 */
function getPointerCoordinates(event, canvas) {

    let rect = canvas.getBoundingClientRect();

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        radius: 0
    };
}

/**
 * Creates and returns the ingredient that matches the uid.
 * @param uid
 * @param x
 * @param y
 * @returns {*}
 */
function createIngredientByUid(uid, x, y) {

    switch (uid) {
        case BASE_UID:
            return new Base(x, y, 90);
        case TOMATO_SAUCE_UID:
            return new TomatoSauce(x, y, 80);
        case OLIVE_UID:
            return new Olive(x, y, 10);
    }
}

/**
 * Returns a random number between the given numbers
 * @param num1
 * @param num2
 * @returns {number}
 */
function getRandomNumber(num1, num2) {
    return Math.floor((Math.random() * num2) + num1);
}