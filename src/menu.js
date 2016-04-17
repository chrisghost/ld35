function Menu() {}

Menu.prototype.create = function () {
  this.input.onDown.add(this.onInputDown, this);

  this.bkg = this.game.add.tileSprite(0, 0, 800, 600, 'background')
  this.bkg_xslide = (Math.random() > 0.5) ? 0.1 : -0.1
  this.bkg_yslide = (Math.random() > 0.5) ? 0.1 : -0.1

  this.bkg.tilePosition.x += this.bkg_xslide
  this.bkg.tilePosition.y += this.bkg_yslide

  var text = this.add.text(
      this.game.width * 0.5,
      this.game.height * 0.3,
      'Planet Shaper\n' +
      '\n'
      , {
        font: '42px Spacebar', fill: '#ffffff', align: 'center'
      }
  );
  text.anchor.set(0.5);

  var credits = this.add.text(
      this.game.width * 0.5,
      this.game.height * 0.9,
      'by @chradr for Ludum Dare #35'
      , {
        font: '24px bold Arial', fill: '#ffffff', align: 'center'
      }
  );
  credits.anchor.set(0.5);

  //text.font = 'Spacebar'


};

Menu.prototype.update = function () {
  this.bkg.tilePosition.x += this.bkg_xslide
  this.bkg.tilePosition.y += this.bkg_yslide
};

Menu.prototype.onInputDown = function () {
  this.game.state.start('game');
};

module.exports = Menu;
