function Player() {}

Player.prototype.init = function(game) {
  this.game = game
  this.sprite = this.game.add.sprite(100, 100, 'player');
  this.sprite.anchor.set(0.5)

  this.dstFromCenter = 100

  this.angle = 0.0
  this.angleSpeed = 0.05

  this.missiles = this.game.add.group()
  this.missiles.enableBody = true
  this.missiles.physicsBodyType = Phaser.Physics.P2JS
  //this.missiles.enableBodyDebug = true

  this.shields = this.game.add.group()
  this.shields.enableBody = true
  this.shields.physicsBodyType = Phaser.Physics.P2JS

  this.baseSpeed = 100
  this.missileRate = 200
  this.missileTimer = 0

  this.missilesCollisions = this.game.physics.p2.createCollisionGroup()
  this.shieldsCollisions = this.game.physics.p2.createCollisionGroup()
}

Player.prototype.shield = function() {

  var x = this.sprite.x + Math.cos(this.angle) * 20
  var y = this.sprite.y + Math.sin(this.angle) * 20

  var s = this.shields.create(x, y, 'shield')
  s.angle = this.angle * 180 / Math.PI
  s.life = 3
  s.body.angle = s.angle
  s.body.static = true
  s.body.setCollisionGroup(this.shieldsCollisions)

  return s
}

Player.prototype.fire = function() {
  if(this.missileTimer > 0) return null;
  //console.log("Time", this.missileTimer)

  this.missileTimer = this.missileRate

  var from = this.angle

  var fromx = this.sprite.x
  var fromy = this.sprite.y

  //for(var a = -0.1; a < 0.2; a+=0.1) {
    var m = this.missiles.create(fromx, fromy, 'player_missile')
    m.anchor.set(0.5)
    m.body.velocity.x = (Math.cos(from) * this.baseSpeed)
    m.body.velocity.y = (Math.sin(from) * this.baseSpeed)
  //}
  //
  return m
}

Player.prototype.goLeft = function() {
  this.angle -= this.angleSpeed
}

Player.prototype.goRight = function() {
  this.angle += this.angleSpeed
}

Player.prototype.update = function(elapsed) {
  this.missileTimer = (this.missileTimer < 0) ? 0 : (this.missileTimer - elapsed)

  this.angleToPos(this.angle)
  this.sprite.angle = 90 + this.angle * 180 / Math.PI
}

Player.prototype.angleToPos = function(angle) {
  this.sprite.position.x = (this.game.width / 2) + Math.cos(angle) * this.dstFromCenter
  this.sprite.position.y = (this.game.height  / 2) + Math.sin(angle) * this.dstFromCenter
}

module.exports = Player;
