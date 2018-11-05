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

    for (let key in ingredients)
        if(ingredients[key].color === color)
            return ingredients[key].uid;
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

    return {
        x: event.clientX - canvas.offsetTop,
        y: event.clientY - canvas.offsetLeft,
        radius: 0
    };
}