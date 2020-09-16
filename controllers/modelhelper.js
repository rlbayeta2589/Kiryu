const fs = require('fs');

class ModelHelper {

	constructor() {
        this.MODELS = null;
        this.COLORS = null;
    }

    initialize() {
        this.MODELS = fs.readdirSync('./assets/models').filter(file => file.endsWith('.png'));

        let temp = this.MODELS.map((x) => {
            let color = x.slice(0, -4).slice(x.indexOf('_') + 1).toUpperCase();
            return color;
        });
        console.log(temp);
    }

    getRamdomModel() {
        return this.MODELS[~~(this.MODELS.length * Math.random())];
    }

    getColor(model) {
        let color = model.slice(0, -4).slice(model.indexOf('_') + 1).toUpperCase();

        if (color == "RED") return '#C51111';
        if (color == "BLUE") return '#132FD2';
        if (color == "GREEN") return '#127F2D';
        if (color == "PINK") return '#ED53B9';
        if (color == "ORANGE") return '#EF7D0E';
        if (color == "YELLOW") return '#F5F558';
        if (color == "BLACK") return '#3F484E';
        if (color == "WHITE") return '#D5E1ED';
        if (color == "PURPLE") return '#6B30BC';
        if (color == "BROWN") return '#72491E';
        if (color == "CYAN") return '#39FEDB';
        if (color == "LIME") return '#50EF3A';

        return color;
    }
}

module.exports = new ModelHelper();
