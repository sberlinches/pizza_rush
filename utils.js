"use strict";

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