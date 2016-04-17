function Boot() {}

Boot.prototype.preload = function () {
  this.load.spritesheet('button', 'assets/button.png', 160, 64, 2);

  this.load.image('preloader', 'assets/preloader.gif');
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

Boot.prototype.create = function () {
  this.game.input.maxPointers = 1;

  if (this.game.device.desktop) {
    this.game.scale.pageAlignHorizontally = true;
  } else {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.minWidth =  480;
    this.game.scale.minHeight = 260;
    this.game.scale.maxWidth = 640;
    this.game.scale.maxHeight = 480;
    this.game.scale.forceOrientation(true);
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.setScreenSize(true);
  }
  this.game.state.start('preloader');
};

module.exports = Boot;
