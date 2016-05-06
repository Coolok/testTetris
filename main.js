cc.game.onStart = function() {
    cc.view.setDesignResolutionSize(760, 570, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    //load resources

    cc.LoaderScene.preload(g_resources, function() {
        var gameController = new GameController();
        gameController.init()
    }, this);
};

var config = { //config from project.json
    "project_type": "javascript",

    "debugMode": 0,
    "showFPS": false,
    "frameRate": 60,
    "id": "gameCanvas",
    "renderMode": 0,

    "jsList": [
        // "src/resource.js",
        // "src/Tools/GameController.js",
        // "src/Tools/Constants.js",
        // "src/Tools/SoundsManager.js",
        // "src/Tools/Settings.js",
        // "src/Scenes/GameScene.js",
        // "src/Layers/GameLayer.js",
        // "src/Layers/Figure.js"
    ]
}
cc.game.run(config);