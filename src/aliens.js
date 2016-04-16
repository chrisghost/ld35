function Aliens() {}

Aliens.prototype.init = function(game) {
  this.game = game

  this.missiles = this.game.add.group()
  this.missiles.enableBody = true
  this.missiles.physicsBodyType = Phaser.Physics.P2JS
  //this.missiles.enableBodyDebug = true

  this.baseSpeed = 100

  this.missilesCollisions = this.game.physics.p2.createCollisionGroup()
}

Aliens.prototype.launchMissile = function() {
  var from = Math.random() * 2 * Math.PI

  var fromx = this.game.width / 2 + Math.cos(from) * this.game.width / 2
  var fromy = this.game.height / 2 + Math.sin(from) * this.game.height / 2

  var m = this.missiles.create(fromx, fromy, 'missile')

  m.anchor.set(0.5)
  m.angle = from * 180 / Math.PI
  m.body.velocity.x = -(Math.cos(from) * this.baseSpeed),
  m.body.velocity.y = -(Math.sin(from) * this.baseSpeed)

  //m.body.thrust(400)
  //console.log(m)
  m.body.setCollisionGroup(this.missilesCollisions)

  return m
}

module.exports = Aliens;
