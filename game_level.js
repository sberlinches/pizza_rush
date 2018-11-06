"use strict";

class Level {

    constructor(ingredients, pizza) {

        this.level = 1;
        this.ingredients = ingredients;
        this.pizza = pizza;
        this.order = [];
        this.orderList = document.getElementById('order');
        this.feedback = document.getElementById('feedback');
        this.resetLevel();
    }

    resetLevel() {

        this.level = 1;
        this.clearFeedback();
        this.renderFeedback('Hello!', 1000);
        this.clearOrder();
        this.createOrder();
        this.renderOrder();
        this.pizza.reset();
    }

    nextLevel() {

        this.level++;
        this.clearFeedback();
        this.clearOrder();
        this.createOrder();
        this.renderOrder();
        this.pizza.reset();
    }

    createOrder() {

        // Fills the order with random ingredients from the list
        for(let i = 0; i < this.level + 1; i++)
            this.order.push(this.ingredients[getRandomNumber(0, this.ingredients.length)]);
    }

    checkOrder(ingredientUid) {

        function reset(thist) {
            thist.resetLevel();
        }

        function next(thist) {
            thist.nextLevel();
        }

        if(this.order[0].uid === ingredientUid)
            this.order.shift();

        else {
            this.renderFeedback('You failed!');
            setTimeout(reset, 2000, this);
        }

        if(this.order.length === 0) {
            this.renderFeedback('great!');
            pizza.rotationSpeed = 0.3;
            setTimeout(next, 2000, this);
        }
    }

    renderOrder() {


        let title = document.createElement('h2');
        let list = document.createElement('ol');

        for (let i = 0; i < this.order.length; i++) {

            let li = document.createElement('li');
            let text = document.createTextNode(this.order[i].name);

            li.appendChild(text);
            list.appendChild(li);
        }

        title.appendChild(document.createTextNode('Level ' + this.level));
        this.orderList.appendChild(title);
        this.orderList.append(list);
    }

    clearOrder() {

        this.order = [];
        this.orderList.innerHTML = '';
    }

    renderFeedback(text, time = null) {

        this.feedback.append(document.createTextNode(text));

        if(time)
            setTimeout(this.clearFeedback, time);
    }

    clearFeedback() {
        this.feedback.innerHTML = '';
    }
}