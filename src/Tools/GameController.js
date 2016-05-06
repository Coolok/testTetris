var GameController = cc.Class.extend({
    init: function(scene, layer) {
        var scene = this.runScene();
        this.addLayerToScene(scene)
    },
    runScene: function() {
        var scene = new GameScene()
        cc.director.runScene(scene);
        return scene;
    },
    addLayerToScene: function(scene) {
        var layer = new GameLayer();
        scene.addChild(layer, 1, CONSTANTS.LayerName.GAME_LAYER);
    },
    startGame: function() {
        SoundsManager.getInstance().playBgMusic();
        var layer = cc.director.getRunningScene().getChildByName(CONSTANTS.LayerName.GAME_LAYER);
        layer.startTick(CONSTANTS.GameSpeed);
    },
    stopGame: function() {
        var layer = cc.director.getRunningScene().getChildByName(CONSTANTS.LayerName.GAME_LAYER);
        layer.stopTick();
    },
    restartGame: function() {
        var layer = cc.director.getRunningScene().getChildByName(CONSTANTS.LayerName.GAME_LAYER);
        this.stopGame();
        layer.figure.moveOnStart();
        this.startGame();
    },

});

GameController.getInstance = function() { // some kind of singleton creation
    if (!this._instance) {
        this._instance = new GameController();
        return this._instance;
    } else {
        return this._instance;
    }
    return null;
};
GameController._instance = null;