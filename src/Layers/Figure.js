var Figure = cc.Class.extend({
    isFree: true,
    figuresStack: [],
    current: {
        figure: null,
        rotation: 0,
        position: {
            top: 0,
            left: 4
        },
        color: null,
    },
    next: {
        figure: null,
        rotation: 0,
        position: {
            top: 0,
            left: 4
        },
        color: null,
    },
    moveOnStart: function() {
        if (this.figuresStack.length == 0) {
            this.figuresStackAddFigure(2);
        } else {
            this.figuresStackRefresh();
        }
        this.current.figure = this.figuresStack[0].figure;
        this.setDefaultSettings(this.current);
        this.setFigureColor(this.current, this.figuresStack[0].num);

        this.next.figure = this.figuresStack[1].figure;
        this.setDefaultSettings(this.next);
        this.setFigureColor(this.next, this.figuresStack[1].num);
    },
    setDefaultSettings: function(figureObj) {
        figureObj.position.top = 0;
        figureObj.position.left = 4;
        figureObj.rotation = 0;
    },
    figuresStackAddFigure: function(num) {
        for (var i = 0; i < num; i++) this.figuresStack.push(this.getRandomFigure());
    },
    figuresStackRefresh: function(num) {
        this.current.figure = this.figuresStack.shift();
        this.figuresStack.push(this.getRandomFigure());
        return this.current.figure;
    },
    getNextFigure: function() {
        return this.next;
    },
    getNextFigurePresenter: function() {
        return this.next.figure[this.current.rotation];
    },
    setFigureColor: function(fugure, num) {
        fugure.color = CONSTANTS.FiguresColors[num];
    },
    getRandomFigure: function() {
        var random = parseInt(Math.random() * CONSTANTS.Figures.length);
        return {
            figure: CONSTANTS.Figures[random],
            num: random
        };
    },
    presenter: function() {
        return this.current.figure[this.current.rotation];
    },
    rotateCurrent: function() {
        this.current.rotation++;
        if (this.current.rotation == this.current.figure.length) {
            this.current.rotation = 0;
        }
    },
    rotateCurrentBack: function() {
        this.current.rotation--;
        if (this.current.rotation < 0) {
            this.current.rotation = this.current.figure.length - 1;
        }
    },
    moveDown: function() {
        this.current.position.top++;
    },
    moveUp: function() {
        this.current.position.top--;
    },
    moveLeft: function() {
        SoundsManager.getInstance().playSpin();
        this.current.position.left++;
    },
    moveRight: function() {
        SoundsManager.getInstance().playSpin();
        this.current.position.left--;
    }
});


Figure.getInstance = function() { // some kind of singleton creation
    if (!this._instance) {
        this._instance = new Figure();
        return this._instance;
    } else {
        return this._instance;
    }
    return null;
};
Figure._instance = null;