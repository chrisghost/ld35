function Planet() {}

Planet.prototype.init = function(game) {
  console.log("new planet")
  this.game = game
  this.bits = this.game.add.group()

  this.planetCenter = {x: this.game.width / 2, y: this.game.height / 2}

  this.bitsSize = 8
  this.radius = 64

  this.generate()
}

Planet.prototype.generate = function() {
  var start = {
    x: this.planetCenter.x - this.bitsSize * this.radius,
    y: this.planetCenter.x - this.bitsSize * this.radius
  }

  var end = {
    x: this.planetCenter.x + this.bitsSize * this.radius,
    y: this.planetCenter.x + this.bitsSize * this.radius
  }

  console.log(start)
  console.log(end)

  for (var x = start.x; x <= end.x; x += this.bitsSize) {
    for (var y = start.y; y <= end.y; y += this.bitsSize) {

      if(this.dst({x: x, y: y}, this.planetCenter) < this.radius) {
        this.bits.create(x, y, 'planet_bit')
      }

    }
  }
}

Planet.prototype.dst = function(from, to) {
  var xs = to.x - from.x
  var ys = to.y - from.y

  return Math.sqrt(
    (xs * xs) + (ys * ys)
  )
}

module.exports = Planet;
