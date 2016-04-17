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

  this.maxShields = 3
  this.shieldLife = 3

  this.shields = this.game.add.group()
  this.shields.enableBody = true
  this.shields.physicsBodyType = Phaser.Physics.P2JS

  this.activeShields = 0

  this.baseSpeed = 100
  this.missileRate = 200
  this.missileTimer = 0

  this.missilesCollisions = this.game.physics.p2.createCollisionGroup()
  this.shieldsCollisions = this.game.physics.p2.createCollisionGroup()

  this.destroyedMissiles = 0

  this.particles = this.game.add.emitter(this.sprite.x,this.sprite.y, 150)
  this.particles.makeParticles('fire')
  this.particles.gravity = 0
  this.particles.setRotation(10, 10)
  this.particles.setAlpha(0.3, 0.8)
  this.particles.setScale(0.5, 0.9, 0.5, 0.9)
}

Player.prototype.shield = function() {

  if(this.shields.countLiving() >= this.maxShields) return null;

  var x = this.sprite.x + Math.cos(this.angle) * 20
  var y = this.sprite.y + Math.sin(this.angle) * 20

  var s = this.shields.create(x, y, 'shield')
  s.animations.add('bzz', [1, 2, 3, 4, 1], 10)

  s.angle = this.angle * 180 / Math.PI
  s.life = this.shieldLife
  s.body.angle = s.angle
  s.body.static = true
  s.body.setCollisionGroup(this.shieldsCollisions)

  this.activeShields++

  return s
}

Player.prototype.destroyedMissile = function() {
  this.destroyedMissiles++
  this.maxShields = 3 + Math.floor(this.destroyedMissiles / 10)
  this.shieldLife = 3 + Math.floor(this.destroyedMissiles / 7)
  if(this.shieldLife > 10) this.shieldLife = 10
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
    m.body.setCollisionGroup(this.missilesCollisions)
  //}
  //
  return m
}

Player.prototype.goLeft = function() {
  this.angle -= this.angleSpeed
  this.particles.start(true, 300, null, 1)
}

Player.prototype.goRight = function() {
  this.angle += this.angleSpeed
  this.particles.start(true, 300, null, 1)
}

Player.prototype.update = function(elapsed) {
  this.missileTimer = (this.missileTimer < 0) ? 0 : (this.missileTimer - elapsed)

  this.angleToPos(this.angle)
  this.particles.x = this.sprite.x
  this.particles.y = this.sprite.y

  this.sprite.angle = 90 + this.angle * 180 / Math.PI
}

Player.prototype.angleToPos = function(angle) {
  this.sprite.position.x = (this.game.width / 2) + Math.cos(angle) * this.dstFromCenter
  this.sprite.position.y = (this.game.height  / 2) + Math.sin(angle) * this.dstFromCenter
}

module.exports = Player;
