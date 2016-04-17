function Menu() {}

Menu.prototype.create = function () {
  //this.input.onDown.add(this.onInputDown, this);

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
      'by @chradr for Ludum Dare #35 Theme: \'Shapeshift\''
      , {
        font: '24px bold Arial', fill: '#ffffff', align: 'center'
      }
  );
  credits.anchor.set(0.5);

  //text.font = 'Spacebar'

  this.btn_easy = this.game.add.sprite(130, 160, 'button')
  this.btn_easy.inputEnabled = true
  this.btn_easy.anchor.set(0.5)
  this.btn_easy.events.onInputDown.add(function() {
    this.btn_easy.frame = 1
    this.btn_medium.frame = 0
    this.btn_hard.frame = 0
  }, this)
  var txt_easy = this.add.text(135, 165, 'EASY'
      , {
        font: '24px Spacebar', fill: '#ffffff', align: 'center'
      }
  );
  txt_easy.anchor.set(0.5);


  this.btn_medium = this.game.add.sprite(this.game.width/2, 160, 'button')
  this.btn_medium.inputEnabled = true
  this.btn_medium.anchor.set(0.5)
  this.btn_medium.events.onInputDown.add(function() {
    this.btn_easy.frame = 0
    this.btn_medium.frame = 1
    this.btn_hard.frame = 0
  }, this)
  var txt_medium = this.add.text(this.game.width/2, 165, 'MEDIUM'
      , {
        font: '24px Spacebar', fill: '#ffffff', align: 'center'
      }
  );
  txt_medium.anchor.set(0.5);
  this.btn_medium.frame = 1

  this.btn_hard = this.game.add.sprite(510, 160, 'button')
  this.btn_hard.inputEnabled = true
  this.btn_hard.anchor.set(0.5)
  this.btn_hard.events.onInputDown.add(function() {
    this.btn_easy.frame = 0
    this.btn_medium.frame = 0
    this.btn_hard.frame = 1
  }, this)
  var txt_hard = this.add.text(505, 165, 'HARD'
      , {
        font: '24px Spacebar', fill: '#ffffff', align: 'center'
      }
  );
  txt_hard.anchor.set(0.5);


  this.btn_go = this.game.add.sprite(this.game.width/2, 380, 'button')
  this.btn_go.inputEnabled = true
  this.btn_go.anchor.set(0.5)
  this.btn_go.events.onInputDown.add(function() {
    this.game.difficulty = (this.btn_easy.frame == 1) ? 'easy' : (this.btn_medium.frame == 1) ? 'medium' : 'hard'

    this.game.state.start('game');
  }, this)
  var txt_go = this.add.text(this.game.width/2, 390, 'GO'
      , {
        font: '24px Spacebar', fill: '#ffffff', align: 'center'
      }
  );
  txt_go.anchor.set(0.5);

};

Menu.prototype.update = function () {
  this.bkg.tilePosition.x += this.bkg_xslide
  this.bkg.tilePosition.y += this.bkg_yslide
};

Menu.prototype.onInputDown = function () {
  //this.game.state.start('game');
};

module.exports = Menu;
