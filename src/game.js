function Game() {}

Game.prototype.create = function () {
  this.game.physics.startSystem(Phaser.Physics.P2JS)
  this.game.physics.p2.setImpactEvents(true);

  this.player = new Player()
  this.player.init(this.game)
  //this.input.onDown.add(this.onInputDown, this);

  this.cursors = this.game.input.keyboard.createCursorKeys()

  this.aliens = new Aliens()
  this.aliens.init(this.game)

  this.planet = new Planet()
  this.planet.init(this.game, this.aliens.missilesCollisions)

  this.game.time.events.loop(Phaser.Timer.SECOND, this.launchAlienMissile, this);

  this.cursors.down.onDown.add(this.createShield, this)

};

Game.prototype.createShield = function () {
  var s = this.player.shield()
  s.body.collides([this.aliens.missilesCollisions])
}

Game.prototype.launchAlienMissile = function () {
  var m = this.aliens.launchMissile()

  m.body.collides(this.player.missilesCollisions, this.missileHit)
  m.body.collides(this.player.shieldsCollisions, this.missileHitShield)
  m.body.collides([this.planet.bitsCollisions], this.missileHitPlanet, this)
}
Game.prototype.launchPlayerMissile = function () {
  var m = this.player.fire()
    if(m == null) return;

    console.log(m)
  m.body.collides(this.game.physics.p2.boundsCollisionGroup,
      function(m, b) {
        m.sprite.kill()
        m.destroy()
      })
}

Game.prototype.update = function () {
  if(this.cursors.up.isDown) {
    this.launchPlayerMissile()
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
  console.log("missileHitPlanet ")

  m.sprite.kill()
  m.destroy()

  b.sprite.kill()
  b.destroy()

  this.planet.nbBlocks--
  if(b.keepIt) this.planet.nbBlocksToKeep--
}

Game.prototype.missileHitShield = function (m, s) {
  console.log("missileHitShield ", s.sprite.life)
  m.sprite.kill()
  m.destroy()
  s.sprite.life--
  if(s.sprite.life <= 0) {
    s.sprite.kill()
    s.destroy()
  }
}

Game.prototype.missileHit = function (m, b) {
  console.log("missileHit ")
  m.destroy()
  b.destroy()
}

module.exports = Game;
