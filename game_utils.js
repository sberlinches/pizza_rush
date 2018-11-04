"use strict";

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

    let x = event.clientX - canvas.offsetTop;
    let y = event.clientY - canvas.offsetLeft;
    let p = ctx.getImageData(x, y, 1, 1).data;

    return rgbToHex(p[0],p[1],p[2]);
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