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

  this.baseSpeed = 100
  this.missileRate = 200
  this.missileTimer = 0
}

Player.prototype.fire = function() {
  if(this.missileTimer > 0) return;
  console.log("Time", this.missileTimer)

  this.missileTimer = this.missileRate

  var from = this.angle

  var fromx = this.sprite.x
  var fromy = this.sprite.y

  for(var a = -0.3; a < 0.4; a+=0.3) {
    var m = this.missiles.create(fromx, fromy, 'player_missile')
    m.anchor.set(0.5)
    m.body.velocity.setTo(
        (Math.cos(from+a) * this.baseSpeed),
        (Math.sin(from+a) * this.baseSpeed)
    )
  }
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
