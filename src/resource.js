var resource = {

//Single images
	bg_png : 'res/Gameplay/bg.jpg',
	
//Sounds
    music : 'res/Sounds/Tetris.mp3',
    effect : 'res/Sounds/spin_end.wav',
	bomb : 'res/Sounds/CollisionBomb1.mp3',
	
//particles
	particles_plist :  'res/Particles/particleRaw.plist',

};

var g_resources = [];
for (var i in resource) {
    g_resources.push(resource[i]);
}