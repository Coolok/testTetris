var GameScene = cc.Scene.extend({
	ctor:function () {
        this._super();
        this.init();
    },
	init:function () {
		cc.log("onEnter GameScene");
	},
   
});