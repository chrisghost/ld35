function Player() {}

Player.prototype.init = function(game) {
  this.game = game
  this.sprite = this.game.add.sprite(100, 100, 'player');
  this.sprite.anchor.set(0.5)

  this.dstFromCenter = 100

  this.angle = 0.0
  this.angleSpeed = 0.1
}

Player.prototype.goLeft = function() {
  this.angle -= this.angleSpeed
}

Player.prototype.goRight = function() {
  this.angle += this.angleSpeed
}

Player.prototype.update = function() {
  this.angleToPos(this.angle)
  this.sprite.angle = 90 + this.angle * 180 / Math.PI
}

Player.prototype.angleToPos = function(angle) {
  this.sprite.position.x = (this.game.width / 2) + Math.cos(angle) * this.dstFromCenter
  this.sprite.position.y = (this.game.height  / 2) + Math.sin(angle) * this.dstFromCenter
}

module.exports = Player;
