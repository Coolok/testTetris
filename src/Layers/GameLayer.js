var GameLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        this.init();
    },
    field: {
        cells: [],
        position: {
            left: 80,
            bottom: 5
        },
        size: {
            width: 10,
            height: 20
        },
        brickSize: 24,
        brickScale: 0.36,
        fallen: []
    },
    fieldNextFigure: {
        cells: [],
        position: {
            left: 380,
            bottom: 390
        },
        size: {
            width: 4,
            height: 4
        },
        brickSize: 24,
        brickScale: 0.36,
    },
    score: 0,
    scoreLabel: null,
    figure: null,
    nextFigure: null,
    isActive: true,
    speed: 1000,
    setActive: function(isActive) {
        this.isActive = isActive;
    },
    getActive: function() {
        return this.isActive;
    },
    setSpeed: function(speed) {
        this.speed = speed;
    },
    getSpeed: function() {
        return this.speed;
    },
    setScore: function(score) {
        this.scoreLabel.setString('score: ' + score);
        this.score = score;
    },
    getScore: function() {
        return this.score;
    },
    init: function() {
        this._super();
        var size = cc.director.getWinSize();

        this.scoreLabel = cc.LabelTTF.create('score: ' + this.getScore(), "Arial", 16);
        this.scoreLabel.setPosition(this.field.position.left + (this.field.size.width * this.field.brickSize) + 250, 400);
        this.scoreLabel.setColor(cc.color(0, 255, 0));
        this.addChild(this.scoreLabel, 1);

        var infoLabel = cc.LabelTTF.create('', "Arial", 14);
        infoLabel.setPosition(this.field.position.left + (this.field.size.width * this.field.brickSize) + 250, 300);
        infoLabel.setColor(cc.color(155, 155, 155));
        this.addChild(infoLabel, 1, 'infoLabel');

        this.createField();
        this.initUserControl();
        this.figure = Figure.getInstance();
        this.figure.moveOnStart();

        this.createNextFigureBg();
        this.initNextFigure();

    },
    initNextFigure: function() {
        this.cleanNextFigureBg();
        this.getNextFigure();
        this.drawNextFigure();
    },
    drawNextFigure: function() {
        var nextFigureBricks = this.figure.getNextFigurePresenter();
        var top, left;

        for (var brick in nextFigureBricks) {
            top = nextFigureBricks[brick].top;
            left = nextFigureBricks[brick].left;
            this.fieldNextFigure.cells[top][left].setColor(this.nextFigure.color);
        };
    },
    cleanNextFigureBg: function() {
        for (var height = this.fieldNextFigure.size.height; height > 0; height--) {
            for (var width = this.fieldNextFigure.size.width; width > 0; width--) {
                this.fieldNextFigure.cells[height - 1][width - 1].setColor(CONSTANTS.GameBgColor);
            }
        }
    },
    getNextFigure: function() {
        this.nextFigure = this.figure.getNextFigure();
    },
    createNextFigureBg: function() {

        for (var height = this.fieldNextFigure.size.height; height > 0; height--) {
            var fieldRow = [];
            for (var width = this.fieldNextFigure.size.width; width > 0; width--) {
                var sprite = new cc.Sprite(resource.bg_png);
                var left = width * this.fieldNextFigure.brickSize + this.fieldNextFigure.position.left;
                var bottom = height * this.fieldNextFigure.brickSize + this.fieldNextFigure.position.bottom;
                sprite.setPosition(left, bottom);
                sprite.setScale(this.fieldNextFigure.brickScale);
                sprite.setColor(CONSTANTS.GameBgColor);
                this.addChild(sprite, 1);
                fieldRow.unshift(sprite);
            };
            this.fieldNextFigure.cells.push(fieldRow);
        };

    },
    startTick: function(speed) {
        this.setSpeed(speed);
        if (this.getChildByName('infoLabel')) this.getChildByName('infoLabel').setString(
            'move	blocks	horizontally	by	pressing	<left>	and	<right>	keys.\n' +
            'accelerate	falling	down	by	pressing <down>	key.\n' +
            'rotate	shapes by	90 degrees	by	pressing	<up>	key'
        );
        cc.director.getScheduler().scheduleCallbackForTarget(
            this,
            this.figureFall,
            this.getSpeed(),
            cc.REPEAT_FOREVER,
            0
        ); //this, function, interval, repeat, delay, !this._isRunning );		

        this.drawFallen(false);
        this.drawFigure(false);
        this.field.fallen = [];
        this.setScore(0);
        this.setActive(true);
    },
    stopTick: function() {
        SoundsManager.getInstance().playBomb();
        this.getChildByName('infoLabel').setString('Game over!\nPress "R" to restart');
        this.setActive(false);
        cc.director.getScheduler().unscheduleAllCallbacksForTarget(this);
    },
    createField: function() {
        for (var height = this.field.size.height; height > 0; height--) {
            var fieldRow = [];
            for (var width = this.field.size.width; width > 0; width--) {
                var sprite = new cc.Sprite(resource.bg_png);
                var left = width * this.field.brickSize + this.field.position.left;
                var bottom = height * this.field.brickSize + this.field.position.bottom;
                sprite.setPosition(left, bottom);
                sprite.setScale(this.field.brickScale);
                sprite.setColor(CONSTANTS.GameBgColor);
                this.addChild(sprite, 1);
                fieldRow.unshift(sprite);
            };
            this.field.cells.push(fieldRow);
        };
    },
    initUserControl: function() {
        if ('mouse' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: function(event) {
                    if (this.getActive() == false) return;
                    this.drawFigure(false);
                    this.figure.rotateCurrent();
                    if (!this.checkFigureFree()) {
                        this.figure.rotateCurrentBack();
                    }
                    this.drawFigure(true);
                }.bind(this)
            }, this);
        }
        if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: this.onKeyPressed.bind(this),
                onKeyReleased: null
            }, this);
        }
    },
    onKeyPressed: function(e) {

        this.drawFigure(false);
        if (e == 82) {
            GameController.getInstance().restartGame();
        }
        if (this.getActive() == false) {
            this.drawFigure(true);
            return;
        }
        if (e == 38) {
            SoundsManager.getInstance().playSpin();
            this.figure.rotateCurrent();
            if (!this.checkFigureFree()) {
                this.figure.rotateCurrentBack();
            }
        }
        if (e == 40) {
            this.figure.moveDown();
            if (!this.checkFigureFree()) {
                this.figure.moveUp();
            }
        }

        if (e == 37) {
            this.figure.moveRight();
            if (!this.checkFigureFree()) {
                this.figure.moveLeft();
            }
        }

        if (e == 39) {
            this.figure.moveLeft();
            if (!this.checkFigureFree()) {
                this.figure.moveRight();
            }
        }
        this.drawFigure(true);
    },
    speedUp: function() {
        var scheduler = cc.director.getScheduler();
        scheduler.unscheduleAllCallbacksForTarget(this);
        this.setSpeed(this.getSpeed() - parseInt(this.getSpeed() / 10));
        scheduler.scheduleCallbackForTarget(
            this,
            this.figureFall,
            this.getSpeed(),
            cc.REPEAT_FOREVER,
            0
        ); //this, function, interval, repeat, delay, !this._isRunning );				

    },
    figureFall: function() {
        this.drawFigure(false);
        this.figure.moveDown();
        if (!this.checkFigureFree()) {
            this.figure.moveUp();
            this.addFigureToFallen();
            this.figure.moveOnStart();
            this.initNextFigure();
            if (!this.checkFigureFree()) {
                GameController.getInstance().stopGame();
            }
            this.cleanRows();
        }
        this.drawFigure(true);
    },
    drawFigure: function(booleanShow) {
        var figureBricks = this.figure.presenter();
        var top, left;

        for (var brick in figureBricks) {
            top = this.figure.current.position.top + figureBricks[brick].top;
            left = this.figure.current.position.left + figureBricks[brick].left;
            this.field.cells[top][left].setColor(booleanShow?this.figure.current.color:CONSTANTS.GameBgColor);
        };
    },
    drawFallen: function(booleanShow) {
        var top, left;
        for (var fallenBrick in this.field.fallen) {
            top = this.field.fallen[fallenBrick].top;
            left = this.field.fallen[fallenBrick].left;
            this.field.cells[top][left].setColor(booleanShow?CONSTANTS.FallenBgColor:CONSTANTS.GameBgColor);
        };
    },
    addFigureToFallen: function() {
        var figureBricks = this.figure.presenter();
        for (var brick in figureBricks) {
            this.field.fallen.push({
                top: this.figure.current.position.top + figureBricks[brick].top,
                left: this.figure.current.position.left + figureBricks[brick].left
            });
        };
    },
    checkFigureFree: function() {
        var figureBricks = this.figure.presenter();
        var brickTop = 0;
        var brickLeft = 0;
        for (var brick in figureBricks) {
            brickTop = this.figure.current.position.top + figureBricks[brick].top;
            brickLeft = this.figure.current.position.left + figureBricks[brick].left;
            if (brickLeft < 0 || brickLeft >= this.field.size.width) {
                return false;
            };
            if (brickTop == this.field.size.height) {
                return false;
            };
            for (var fallenBrick in this.field.fallen) {
                if (brickTop == this.field.fallen[fallenBrick].top && brickLeft == this.field.fallen[fallenBrick].left) {
                    return false;
                }
            };
        };
        return true;
    },

    cleanRows: function() {
        SoundsManager.getInstance().playSpin();
        this.drawFallen(false);
        for (var heihgt = this.field.size.height - 1; heihgt >= 0; heihgt--) {
            var bricksInRow = 0;
            for (var fallenBrick in this.field.fallen) {
                if (this.field.fallen[fallenBrick].top == heihgt) {
                    bricksInRow++;
                }
            };
            if (bricksInRow == this.field.size.width) {
                var newFallen = this.field.fallen.filter(function(brick) {
                    if (brick.top == heihgt) {
                        return false;
                    }
                    return true;
                });
                this.field.fallen = newFallen;
                for (var fallenBrick in this.field.fallen) {
                    if (this.field.fallen[fallenBrick].top < heihgt) {
                        this.field.fallen[fallenBrick].top++;
                    }
                };
                this.setScore(this.getScore() + 1);
                SoundsManager.getInstance().playBomb();
                debugger
                this.addParticles();
                this.speedUp();
                heihgt++;
            };
        };
        this.drawFallen(true);
    },
    resetGame: function() {
        this.figure.moveOnStart();
    },
    addParticles: function() {
        var starsL = new cc.ParticleSystem(resource.particles_plist);
        starsL.setPosition(cc.p(210, 30));
        starsL.setScale(0.5);
        this.addChild(starsL, 200);
    },
    onEnter: function() {
        this._super();
        GameController.getInstance().startGame();
    }
});