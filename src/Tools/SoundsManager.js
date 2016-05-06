var SoundsManager = (function(){
    function _SoundsManager(){
        return {       
            playSound:function(id){//play sound by resource id
				if(!Settings.getInstance().getSoundEnabled()) return;
				cc.audioEngine.playEffect(resource[id]);
            },
            stopMusic:function(){
                cc.audioEngine.stopMusic();
			    cc.audioEngine.stopAllEffects();
			    cc.audioEngine.stopEffect();
            },
            playMusic:function(id, loop){//play Music by resource id
				if(!Settings.getInstance().getMusicEnabled()) return;
                cc.audioEngine.playMusic(resource[id], loop);
            },
			
			stopMusic:function(id, loop){
				cc.audioEngine.stopMusic(resource[id]);
            },

           playSpin:function(){
                this.playSound("effect",false);
            },
            playBomb:function(){
                this.playSound("bomb",false);
            },
            playBgMusic:function(){
                this.playMusic("music",true);
            },
         
           
		}
	}
    var _instance;
    return {
        getInstance:function(){//different kind of singleton creation
            if(!_instance){
                _instance = new _SoundsManager();
            }
            return _instance;
        }
    }
})();