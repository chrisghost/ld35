function Aliens() {}

Aliens.prototype.init = function(game) {
  this.game = game

  this.missiles = this.game.add.group()
  this.missiles.enableBody = true
  this.missiles.physicsBodyType = Phaser.Physics.P2JS
  //this.missiles.enableBodyDebug = true

  this.bigMissiles = this.game.add.group()
  this.bigMissiles.enableBody = true
  this.bigMissiles.physicsBodyType = Phaser.Physics.P2JS

  this.baseSpeed = 100

  this.missilesCollisions = this.game.physics.p2.createCollisionGroup()
}

Aliens.prototype.launchMissile = function() {
  var from = Math.random() * 2 * Math.PI

  var fromx = this.game.width / 2 + Math.cos(from) * this.game.width / 2
  var fromy = this.game.height / 2 + Math.sin(from) * this.game.height / 2

  var m

  if(Math.random() > 0.3) {
    m = this.bigMissiles.create(fromx, fromy, 'missile')
    m.explosionSize = 1
    m.body.angularVelocity = 3//.set(1)
  } else {
    m = this.missiles.create(fromx, fromy, 'big_missile')
    m.explosionSize = 8  + Math.random() * 16
  }

  //console.log(m.explosionSize)

  m.anchor.set(0.5)
  m.angle = from * 180 / Math.PI

  vx = (this.game.width / 2) - fromx
  vy = (this.game.height / 2) - fromy

  var v = Math.abs(vx) + Math.abs(vy)
  //console.log(vx, vy, v)

  m.body.velocity.x = (vx / v) * this.baseSpeed
  m.body.velocity.y = (vy / v) * this.baseSpeed

  m.body.setCollisionGroup(this.missilesCollisions)

  return m
}

module.exports = Aliens;
