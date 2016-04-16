function Game() {}

Game.prototype.create = function () {
  this.game.plugins.screenShake = this.game.plugins.add(Phaser.Plugin.ScreenShake);


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

  this.game.time.events.loop(500, this.launchAlienMissile, this);

  this.cursors.down.onDown.add(this.createShield, this)


  this.particles = this.game.add.emitter(0, 0, 100)
  this.particles.makeParticles('particle')
  this.particles.gravity = 0
  this.particles.setRotation(10, 10)
  this.particles.setAlpha(0.3, 0.8)
  this.particles.setScale(0.5, 1)

};

Game.prototype.createShield = function () {
  var s = this.player.shield()
  s.body.collides([this.aliens.missilesCollisions])
}

Game.prototype.launchAlienMissile = function () {
  var m = this.aliens.launchMissile()

  m.body.collides(this.player.missilesCollisions, this.missileHit, this)
  m.body.collides(this.player.shieldsCollisions, this.missileHitShield, this)
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

Game.prototype.particleBurst = function (x, y) {
  this.particles.x = x
  this.particles.y = y
  this.particles.start(true, 500, null, 5)
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

  this.particleBurst(m.sprite.x, m.sprite.y)

  this.planet.nbBlocks--

  if(b.sprite.keepIt) {
    this.planet.nbBlocksToKeep--
    this.game.plugins.screenShake.shake(10)
  }

  m.sprite.kill()
  m.destroy()

  b.sprite.kill()
  b.destroy()

}

Game.prototype.missileHitShield = function (m, s) {
  console.log("missileHitShield ", s.sprite.life)

  this.particleBurst(m.sprite.x, m.sprite.y)

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
