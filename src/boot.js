function Boot() {}

Boot.prototype.preload = function () {
  this.load.image('preloader', 'assets/preloader.gif');
  this.load.image('player', 'assets/player.png');
  this.load.image('planet_bit', 'assets/planet_bit.png');
  this.load.image('missile', 'assets/missile.png');
  this.load.image('player_missile', 'assets/playerMissile.png');
  this.load.image('shield', 'assets/shield.png');
  this.load.image('particle', 'assets/particle.png');
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
