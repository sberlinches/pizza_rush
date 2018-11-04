"use strict";

const FULL_CIRCLE           = 0;
const HALF_TOP_CIRCLE       = 1;
const HALF_LEFT_CIRCLE      = 2;
const HALF_BOTTOM_CIRCLE    = 3;
const HALF_RIGHT_CIRCLE     = 4;

/**
 * @param ctx context
 * @param x start position (center)
 * @param y start position (center)
 * @param width
 * @param height
 * @param fillColor
 * @param strokeColor
 * @param strokeWidth
 */
function rectangle(ctx, x, y, width, height, fillColor, strokeColor, strokeWidth) {

    /*let coordinates = [
        [x, y],
        [x+width, y],
        [x+width, y+height],
        [x, y+height]
    ];*/

    let coordinates = [
        [0, 0],
        [width, 0],
        [width, height],
        [0, height]
    ];

    freeForm(ctx, x, y, coordinates, fillColor, strokeColor, strokeWidth, true);
}

/**
 * @param ctx context
 * @param x start position (center)
 * @param y start position (center)
 * @param width
 * @param height
 * @param fillColor
 * @param strokeColor
 * @param strokeWidth
 */
function triangle(ctx, x, y, width, height, fillColor, strokeColor, strokeWidth) {

    /*let coordinates = [
        [x+width/2, y],
        [x+width, y+height],
        [x, y+height]
    ];*/

    let coordinates = [
        [width/2, 0],
        [width, height],
        [0, height]
    ];

    freeForm(ctx, x, y, coordinates, fillColor, strokeColor, strokeWidth, true);
}

/**
 * @param ctx context
 * @param x start position (center)
 * @param y start position (center)
 * @param radius
 * @param type [FULL_CIRCLE, HALF_TOP_CIRCLE, HALF_LEFT_CIRCLE,
 *          HALF_BOTTOM_CIRCLE, HALF_RIGHT_CIRCLE]
 * @param fillColor
 * @param strokeColor
 * @param strokeWidth
 */
function circle(ctx, x, y, radius, type, fillColor, strokeColor, strokeWidth) {

    let sAngle  = 0;
    let eAngle  = 0;

    switch (type) {
        case FULL_CIRCLE:
            sAngle = 0;
            eAngle = 2*Math.PI;
            break;
        case HALF_RIGHT_CIRCLE:
            sAngle = 1.5*Math.PI;
            eAngle = 0.5*Math.PI;
            break;
        case HALF_TOP_CIRCLE:
            sAngle = Math.PI;
            eAngle = 0;
            break;
        case HALF_LEFT_CIRCLE:
            sAngle = 0.5*Math.PI;
            eAngle = 1.5*Math.PI;
            break;
        case HALF_BOTTOM_CIRCLE:
            sAngle = 0;
            eAngle = Math.PI;
            break;
    }

    ctx.beginPath();
    ctx.arc(x, y, radius, sAngle, eAngle);
    render(ctx, fillColor, strokeColor, strokeWidth);
}

/**
 * @param ctx context
 * @param x start position (bottom right)
 * @param y start position (bottom right)
 * @param text
 * @param font
 * @param size
 * @param fillColor
 */
function text(ctx, x, y, text, font, size, fillColor) {

    ctx.font = size + 'px ' + font;
    ctx.fillStyle = fillColor;
    ctx.fillText(text, x, y);
}

/**
 * @param ctx context
 * @param x start position (center)
 * @param y start position (center)
 * @param cs Coordinates
 * @param fillColor
 * @param strokeColor
 * @param strokeWidth
 * @param autoClose
 */
function freeForm(ctx, x, y, cs, fillColor, strokeColor, strokeWidth, autoClose = false) {

    ctx.save();

    let max = getMaxWidthHeight(cs);
    ctx.translate((-max.width/2)+x, (-max.height/2)+y);

    ctx.beginPath();
    ctx.moveTo(cs[0][0], cs[0][1]);

    for(let c = 1; c <= cs.length - 1; c++)
        // SP = Start point (X,Y)
        // EP = End point (X,Y)
        // CP = Control point (X,Y)
        switch (cs[c].length) {
            //Line [SP, EP]
            case 2:
                ctx.lineTo(cs[c][0], cs[c][1]);
                break;
            //Quadratic curve [CP, EP]
            case 4:
                ctx.quadraticCurveTo(cs[c][0], cs[c][1], cs[c][2], cs[c][3]);
                break;
            //Bezier curve [SP-CP, EP-CP, EP]
            case 6:
                ctx.bezierCurveTo(cs[c][0], cs[c][1], cs[c][2], cs[c][3], cs[c][4], cs[c][5]);
                break;
        }

    if (autoClose) ctx.closePath();

    ctx.restore();

    render(ctx, fillColor, strokeColor, strokeWidth);
}

/**
 *
 * @param cs
 */
function getMaxWidthHeight(cs) {

    let max = {width:2, height:0};

    for(let c = 1; c <= cs.length - 1; c++) {
        if(cs[c][0] > max.width)
            max.width = cs[c][0];

        if(cs[c][1] > max.height)
            max.height = cs[c][1];
    }


    return max;
}

/**
 * @param ctx context
 * @param fillColor
 * @param strokeColor
 * @param strokeWidth
 */
function render(ctx, fillColor, strokeColor, strokeWidth) {


    //ctx.save();
    //ctx.translate(this.x, this.y);
   // ctx.rotate(1);

    if(fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }

    if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.stroke();
    }


    // Add rotation here


    //context.strokeRect(-this.s/2, -this.s/2, this.s, this.s);
    //ctx.restore(); //Restore the original context before transform

}