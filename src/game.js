function Game() {}

Game.prototype.create = function () {
  this.player = new Player()
    console.log(this.game)
  this.player.init(this.game)
  this.input.onDown.add(this.onInputDown, this);

  this.cursors = this.game.input.keyboard.createCursorKeys()
};

Game.prototype.update = function () {
  if(this.cursors.left.isDown) {
    this.player.goLeft()
  } else if(this.cursors.right.isDown) {
    this.player.goRight()
  }
  this.player.update()
};

Game.prototype.onInputDown = function () {
  this.game.state.start('menu');
};

module.exports = Game;
