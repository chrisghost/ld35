function Game() {}

Game.prototype.create = function () {
  this.game.physics.startSystem(Phaser.Physics.ARCADE)

  this.player = new Player()
  this.player.init(this.game)
  //this.input.onDown.add(this.onInputDown, this);

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
      this.missileHitPlanet,
      null,
      this
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


  if(this.planet.nbBlocksToKeep < 10) console.log("You loose")
  if(this.planet.nbBlocksToKeep / this.planet.nbBlocks > 0.8) console.log("You win!!")


  this.game.debug.text("N blocks : " + this.planet.nbBlocks, 10, 10)
  this.game.debug.text("N blocks to keep : " + this.planet.nbBlocksToKeep, 10, 30)
  this.game.debug.text("Prc : " + this.planet.nbBlocksToKeep / this.planet.nbBlocks, 10, 50)
};

Game.prototype.missileHitPlanet = function (m, b) {
  m.kill()
  b.kill()
  this.planet.nbBlocks--
  if(b.keepIt) this.planet.nbBlocksToKeep--
}

Game.prototype.missileHit = function (m, b) {
  m.kill()
  b.kill()
}

module.exports = Game;
