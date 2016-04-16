function Game() {}

Game.prototype.create = function () {
  this.game.physics.startSystem(Phaser.Physics.ARCADE)

  this.player = new Player()
  this.player.init(this.game)
  this.input.onDown.add(this.onInputDown, this);

  this.cursors = this.game.input.keyboard.createCursorKeys()

  this.planet = new Planet()
  this.planet.init(this.game)

  this.aliens = new Aliens()
  this.aliens.init(this.game)

  this.game.time.events.loop(Phaser.Timer.SECOND, this.aliens.launchMissile, this.aliens);

};

Game.prototype.update = function () {
  this.game.physics.arcade.collide(
      this.aliens.missiles,
      this.player.missiles,
      this.missileHit
  )

  this.game.physics.arcade.collide(
      this.aliens.missiles,
      this.planet.bits,
      this.missileHit
  )

  if(this.cursors.up.isDown) {
    this.player.fire()
  }
  if(this.cursors.left.isDown) {
    this.player.goLeft()
  } else if(this.cursors.right.isDown) {
    this.player.goRight()
  }

  this.player.update(this.game.time.elapsed)
};

Game.prototype.missileHit = function (m, b) {
  //m.body.destroy()
  //b.body.destroy()

  m.kill()
  b.kill()
}

Game.prototype.onInputDown = function () {
  this.game.state.start('menu');
};

module.exports = Game;
