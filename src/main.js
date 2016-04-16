Player = require('./player')
Planet = require('./planet')
Aliens = require('./aliens')
ScreenShake = require('../plugins/ScreenShake')

var game = new Phaser.Game(640, 480, Phaser.AUTO, 'ld35-game');
game.state.add('boot', require('./boot'));
game.state.add('preloader', require('./preloader'));
game.state.add('menu', require('./menu'));
game.state.add('game', require('./game'));
game.state.start('boot');
