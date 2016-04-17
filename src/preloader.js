function Preloader() {
  this.asset = null;
  this.ready = false;
}

Preloader.prototype.preload = function () {
  this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
  this.load.setPreloadSprite(this.asset);

  this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
  this.loadResources();
  this.ready = true;
};

Preloader.prototype.loadResources = function () {
  // load your resources here
  this.load.spritesheet('button', 'assets/button.png', 160, 64, 2);

  this.load.image('player', 'assets/player.png');
  this.load.image('planet_bit', 'assets/planet_bit.png');
  this.load.image('missile', 'assets/missile.png');
  this.load.image('big_missile', 'assets/bigMissile.png');
  this.load.image('player_missile', 'assets/playerMissile.png');
  this.load.spritesheet('shield', 'assets/shield.png', 8, 32, 4);
  this.load.image('particle', 'assets/particle.png');
  this.load.image('fire', 'assets/fire.png');
  this.load.spritesheet('sound_control', 'assets/sound_control.png', 32, 32, 2);
  this.load.image('progress_bkg', 'assets/progress_bkg.png');
  this.load.image('progress_keep', 'assets/progress_keep.png');
  this.load.image('progress_other', 'assets/progress_other.png');
  this.load.image('progress_goal', 'assets/progress_goal.png');

  this.load.spritesheet('level_vrect', 'assets/level_vrect.png', 64, 64, 2);
  this.load.spritesheet('level_triangle', 'assets/level_triangle.png', 64, 64, 2);
  this.load.spritesheet('level_circle', 'assets/level_circle.png', 64, 64, 2);

  this.load.image('background', 'assets/background.png');

  this.load.audio('themesong', 'assets/finalsong2.mp3');

  this.load.audio('explosion1', 'assets/explosion1.wav');
  this.load.audio('explosion2', 'assets/explosion2.wav');
  this.load.audio('laser1', 'assets/laser1.wav');
  this.load.audio('hit1', 'assets/hit1.wav');
  this.load.audio('hit2', 'assets/hit2.wav');
  this.load.audio('vanish1', 'assets/vanish1.wav');

};

Preloader.prototype.create = function () {

};

Preloader.prototype.update = function () {
  if (!!this.ready) {
    this.game.theme = null
    this.game.state.start('menu');
  }
};

Preloader.prototype.onLoadComplete = function () {
  // this.ready = true;
};

module.exports = Preloader;
