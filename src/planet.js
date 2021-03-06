function Planet() {}

Planet.prototype.init = function(game, aliensMissilesCG) {
  console.log("new planet")
  this.game = game

  this.aliensMissilesCG = aliensMissilesCG

  this.bits = this.game.add.group()
  this.bits.enableBody = true
  this.bits.physicsBodyType = Phaser.Physics.P2JS
  //this.bits.enableBodyDebug = true

  this.bitsCollisions = this.game.physics.p2.createCollisionGroup()

  this.planetCenter = {x: this.game.width / 2, y: this.game.height / 2}

  this.bitsSize = 8
  this.radius = 64

  /*
  poly = new Phaser.Polygon();
  var tsize = 0.7 * this.radius

  var tax = this.planetCenter.x + Math.cos(0) * tsize
  var tay = this.planetCenter.y + Math.sin(0) * tsize

  var tbx = this.planetCenter.x + Math.cos((Math.PI*2)/3) * tsize
  var tby = this.planetCenter.y + Math.sin((Math.PI*2)/3) * tsize

  var tcx = this.planetCenter.x + Math.cos(2*(Math.PI*2)/3) * tsize
  var tcy = this.planetCenter.y + Math.sin(2*(Math.PI*2)/3) * tsize


  poly.setTo([ new Phaser.Point(tax, tay), new Phaser.Point(tbx, tby), new Phaser.Point(tcx, tcy) ]);

  graphics = game.add.graphics(0, 0);

  graphics.beginFill(0xFF33ff);
  //graphics.drawPolygon(poly.points);
  graphics.endFill();
  */

  this.shapes = {
    'triangle': this.inFinalShapeTriangle.bind(this)
  , 'circle'  : this.inFinalShapeCircle.bind(this)
  , 'square'  : this.inFinalShapeSquare.bind(this)
  }


  console.log(this.game.shape)

  this.generate(this.game.shape)


}

Planet.prototype.generate = function(shape) {
  var start = {
    x: this.planetCenter.x - this.radius,
    y: this.planetCenter.y - this.radius
  }

  var end = {
    x: this.planetCenter.x + this.radius,
    y: this.planetCenter.y + this.radius
  }

  console.log(start)
  console.log(end)

  this.nbBlocks = 0
  this.nbBlocksToKeep = 0


  if(shape == 'circle') {
    this.generateCirclePlanet(start, end, (Math.random() > 0.5) ? 'square' : 'triangle')
  } else if (shape == 'square') {
    this.generateSquarePlanet(start, end, (Math.random() > 0.5) ? 'circle' : 'triangle')
  } else if (shape == 'triangle') {
    this.generateTrianglePlanet(start, end, (Math.random() > 0.5) ? 'square' : 'circle')
  }

  this.baseNbBlocksToKeep = this.nbBlocksToKeep
  this.baseNbBlocks = this.nbBlocks

}

Planet.prototype.generateCirclePlanet = function(start, end, shape) {
  for (var x = start.x; x <= end.x; x += this.bitsSize) {
    for (var y = start.y; y <= end.y; y += this.bitsSize) {

      if(this.dst({x: x, y: y}, this.planetCenter) < this.radius) {
        var sp = this.bits.create(x, y, 'planet_bit')
        sp.keepIt = false
        sp.body.setCollisionGroup(this.bitsCollisions)
        sp.body.collides(this.aliensMissilesCG)
        sp.body.static = true
        this.nbBlocks++

        if(this.shapes[shape](x, y)) {
        //if(this.inFinalShapeCircle(x, y)) {
          sp.tint = 0xFF2222
          sp.keepIt = true
          this.nbBlocksToKeep++
        }

        if(Math.abs(this.dst(sp, this.planetCenter) - this.radius) <= this.bitsSize) {
          sp.tint = 0x22FF22
        }
      }

    }
  }
}

Planet.prototype.generateSquarePlanet = function(start, end, shape) {
  for (var x = start.x; x <= end.x; x += this.bitsSize) {
    for (var y = start.y; y <= end.y; y += this.bitsSize) {

      var sp = this.bits.create(x, y, 'planet_bit')
      sp.keepIt = false
      sp.body.setCollisionGroup(this.bitsCollisions)
      sp.body.collides(this.aliensMissilesCG)
      sp.body.static = true
      this.nbBlocks++

      if(this.shapes[shape](x, y)) {
        //if(this.inFinalShapeCircle(x, y)) {
        sp.tint = 0xFF2222
          sp.keepIt = true
          this.nbBlocksToKeep++
      }

      if(x == start.x || x == end.x || y == start.y || y == end.y) { //Math.abs(this.dst(sp, this.planetCenter) - this.radius) <= this.bitsSize) {
        sp.tint = 0x22FF22
      }

    }
  }
}


Planet.prototype.generateTrianglePlanet = function(start, end, shape) {

  var tsize = 1.5 * this.radius

  start.x -= this.radius
  start.y -= this.radius

  end.x += this.radius
  end.y += this.radius

  var tax = this.planetCenter.x + Math.cos(0) * tsize
  var tay = this.planetCenter.y + Math.sin(0) * tsize

  var tbx = this.planetCenter.x + Math.cos((Math.PI*2)/3) * tsize
  var tby = this.planetCenter.y + Math.sin((Math.PI*2)/3) * tsize

  var tcx = this.planetCenter.x + Math.cos(2*(Math.PI*2)/3) * tsize
  var tcy = this.planetCenter.y + Math.sin(2*(Math.PI*2)/3) * tsize

  //console.log(tax, tay, tbx, tby, tcx, tcy)

  for (var x = start.x; x <= end.x; x += this.bitsSize) {
    var colMarker = 0
    var sp = null
    for (var y = start.y; y <= end.y; y += this.bitsSize) {
      if(this.isInsideTriangle(tax, tay, tbx, tby, tcx, tcy, x, y)) {
        colMarker++

        sp = this.bits.create(x, y, 'planet_bit')
        sp.keepIt = false
        sp.body.setCollisionGroup(this.bitsCollisions)
        sp.body.collides(this.aliensMissilesCG)
        sp.body.static = true
        this.nbBlocks++

        if(colMarker == 1 || x == tbx || x == tcx) {
          sp.tint = 0x22FF22
        }

        if(this.shapes[shape](x, y)) {
          sp.tint = 0xFF2222
          sp.keepIt = true
          this.nbBlocksToKeep++
        }
      }
    }
    if(sp != null && sp.keepIt == false) sp.tint = 0x22FF22
  }
}


Planet.prototype.tarea = function(x1, y1, x2, y2, x3, y3)
{
  return Math.abs((x1*(y2-y3) + x2*(y3-y1)+ x3*(y1-y2))/2.0)
}

Planet.prototype.isInsideTriangle = function(x1, y1, x2, y2, x3, y3, x, y) {
  var A  = this.tarea (x1, y1, x2, y2, x3, y3)
  var A1 = this.tarea (x, y, x2, y2, x3, y3)
  var A2 = this.tarea (x1, y1, x, y, x3, y3)
  var A3 = this.tarea (x1, y1, x2, y2, x, y)

  console.log(A - (A1 + A2 + A3))
  return Math.abs(A - (A1 + A2 + A3)) < 0.1
}

Planet.prototype.inFinalShapeSquare = function(x, y) {

  var topleftx = this.planetCenter.x - this.radius * 0.5
  var toplefty = this.planetCenter.y - this.radius * 0.5

  var bottomrightx = this.planetCenter.x + this.radius * 0.5
  var bottomrighty = this.planetCenter.y + this.radius * 0.5

  return ( x >= topleftx
      &&   x <= bottomrightx
      &&   y >= toplefty
      &&   y <= bottomrighty
      )
}

Planet.prototype.inFinalShapeCircle = function(x, y) {
  var r = 0.7 * this.radius

  return this.dst({x:x, y:y}, this.planetCenter) < r
}

Planet.prototype.inFinalShapeTriangle = function(x, y) {
  var tsize = 0.9 * this.radius

  var tax = this.planetCenter.x + Math.cos(0) * tsize
  var tay = this.planetCenter.y + Math.sin(0) * tsize

  var tbx = this.planetCenter.x + Math.cos((Math.PI*2)/3) * tsize
  var tby = this.planetCenter.y + Math.sin((Math.PI*2)/3) * tsize

  var tcx = this.planetCenter.x + Math.cos(2*(Math.PI*2)/3) * tsize
  var tcy = this.planetCenter.y + Math.sin(2*(Math.PI*2)/3) * tsize

  //console.log(tax, tay, tbx, tby, tcx, tcy, x, y)
  return this.isInsideTriangle(tax, tay, tbx, tby, tcx, tcy, x, y)
}

Planet.prototype.dst = function(from, to) {
  var xs = to.x - from.x
  var ys = to.y - from.y

  return Math.sqrt(
    (xs * xs) + (ys * ys)
  )
}

module.exports = Planet;
