var Settings = cc.Class.extend({
    sound: 1,
    music: 1,

    ctor: function() {
        this.settings = null;
    },
    // read settings from server
    readSettings: function(callback) {
        cc.log('readSettings');

    },
	 // save settings from server
    saveSettings: function() {

    },

    getSoundEnabled: function() {
        return this.sound;
    },
    getMusicEnabled: function() {
        return this.music;
    },
    setSoundEnabled: function(enabled) {
        cc.log("setSoundEnabled: " + enabled);
        this.sound = enabled;
    },
    setMusicEnabled: function(enabled) {
        cc.log("setMusicEnabled: " + enabled);
        this.music = enabled;
    },
    toggleMusic: function() {
        if (this.getMusicEnabled())
            this.setMusicEnabled(0);
        else
            this.setMusicEnabled(1);
    },
    toggleSound: function() {
        if (this.getSoundEnabled())
            this.setSoundEnabled(0);
        else
            this.setSoundEnabled(1);
    },
});
Settings._instance = null;
Settings.getInstance = function() {//get singleton
    if (!this._instance)
        this._instance = new Settings();
    return this._instance;
}