function Game() {}

Game.prototype.create = function () {
  this.game.plugins.screenShake = this.game.plugins.add(Phaser.Plugin.ScreenShake);

  this.bkg = this.game.add.tileSprite(0, 0, 800, 600, 'background')
  this.bkg_xslide = (Math.random() > 0.5) ? 0.1 : -0.1
  this.bkg_yslide = (Math.random() > 0.5) ? 0.1 : -0.1

  this.sound_control = this.game.add.sprite(this.game.width - 42, 10, 'sound_control')
  this.sound_control.inputEnabled = true

  this.sound_control.events.onInputDown.add(function() {
    this.game.sound.mute = !this.game.sound.mute
    this.sound_control.frame = this.game.sound.mute ? 1 : 0
  }, this);

  this.game.physics.startSystem(Phaser.Physics.P2JS)
  this.game.physics.p2.setImpactEvents(true);

  this.player = new Player()
  this.player.init(this.game)
  //this.input.onDown.add(this.onInputDown, this);

  this.cursors = this.game.input.keyboard.createCursorKeys()

  this.aliens = new Aliens()
  this.aliens.init(this.game)

  this.planet = new Planet()
  this.planet.init(this.game, this.aliens.missilesCollisions)

  this.aliensTimer = this.game.time.events.loop(500, this.launchAlienMissile, this);

  this.cursors.down.onDown.add(this.createShield, this)


  this.particles = this.game.add.emitter(0, 0, 100)
  this.particles.makeParticles('particle')
  this.particles.gravity = 0
  this.particles.setRotation(10, 10)
  this.particles.setAlpha(0.3, 0.8)
  this.particles.setScale(0.5, 1)

  this.gameRunning = true

  this.lines = []

  this.theme = this.game.add.audio('themesong', 0.7, true)

  this.audio = {
    'explosion1': this.game.add.audio('explosion1', 0.3)
  , 'explosion2': this.game.add.audio('explosion2', 0.3)
  , 'laser1': this.game.add.audio('laser1', 0.3)
  , 'hit1': this.game.add.audio('hit1', 0.3)
  , 'hit2': this.game.add.audio('hit2', 0.3)
  , 'vanish1': this.game.add.audio('vanish1', 0.3)
  }

  this.theme.play()
};

Game.prototype.createShield = function () {
  var s = this.player.shield()
  if(s == null) return;

  s.body.collides([this.aliens.missilesCollisions])
}

Game.prototype.launchAlienMissile = function () {
  var m = this.aliens.launchMissile()

  this.lines.push(new Phaser.Line(m.x, m.y,
       m.x + m.body.velocity.x * 100,
       m.y + m.body.velocity.y * 100
       ))

  m.body.collides(this.player.missilesCollisions, this.missileHit, this)
  m.body.collides(this.player.shieldsCollisions, this.missileHitShield, this)
  m.body.collides(this.planet.bitsCollisions, this.missileHitPlanet, this)
}
Game.prototype.launchPlayerMissile = function () {
  var m = this.player.fire()
  if(m == null) return;

  this.audio.laser1.play()

  m.body.collides(this.game.physics.p2.boundsCollisionGroup,
      function(m, b) {
        m.sprite.kill()
        m.destroy()
      })

  m.body.collides(this.aliens.missilesCollisions, this.missileHit, this)
}

Game.prototype.particleBurst = function (x, y) {
  this.particles.x = x
  this.particles.y = y
  this.particles.start(true, 500, null, 5)
}

Game.prototype.update = function () {
  this.bkg.tilePosition.x += this.bkg_xslide
  this.bkg.tilePosition.y += this.bkg_yslide

  if(this.gameRunning) {
    if(this.cursors.up.isDown) {
      this.launchPlayerMissile()
    }
    if(this.cursors.left.isDown) {
      this.player.goLeft()
    } else if(this.cursors.right.isDown) {
      this.player.goRight()
    }

    this.player.update(this.game.time.elapsed)


    if(this.planet.nbBlocksToKeep < 30
        || this.nbBlocksToKeep / this.baseNbBlocksToKeep < 0.8
        ) {
      this.gameRunning = false
      this.gameWon = false
    }
    if(this.planet.nbBlocksToKeep / this.planet.nbBlocks > 0.9) {
      this.gameRunning = false
      this.gameWon = true
    }

    this.game.debug.text("N blocks : " + this.planet.nbBlocks, 10, 10)
    this.game.debug.text("N blocks to keep : " + this.planet.nbBlocksToKeep, 10, 30)
    this.game.debug.text("Prc : " + this.planet.nbBlocksToKeep / this.planet.nbBlocks, 10, 50)
    this.game.debug.text("Destroyed missiles : " + this.player.destroyedMissiles, 10, 70)
    this.game.debug.text("Shields : " + this.player.activeShields + " / " + this.player.maxShields + " (" + this.player.shieldLife + " life)", 10, 90)

    //for(var i in this.lines) this.game.debug.geom(this.lines[i])

  } else {
      this.game.physics.p2.paused = true //console.log("You win!!")
      this.aliensTimer.loop = false

      if(this.gameWon) {
        var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'You won!', {
          font: '42px Arial', fill: '#ffffff', align: 'center'
        });
        text.anchor.set(0.5);
      } else {
        var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'You lost!', {
          font: '42px Arial', fill: '#ffffff', align: 'center'
        });
        text.anchor.set(0.5);
      }

  }
};

Game.prototype.missileHitPlanet = function (m, b) {

  this.particleBurst(m.sprite.x, m.sprite.y)


  if(b.sprite.keepIt) {
    this.game.plugins.screenShake.shake(10)
    this.audio.explosion2.play()
  } else {
    this.audio.explosion1.play()
  }

  console.log(m.sprite.explosionSize)

  if(m.sprite.explosionSize > 1) {
    var bodies = this.game.physics.p2.getBodies()
      console.log("YEAH")
    var todestroy = []
    for(var i in bodies) {
      //console.log(bodies[i])

      //console.log( this.planet.dst( {x: bodies[i].sprite.x, y: bodies[i].sprite.y} , {x: m.sprite.x, y:m.sprite.y}) )

      try {
        if(this.planet.dst(
              {x: bodies[i].x, y: bodies[i].y}
            , {x: m.sprite.x, y:m.sprite.y}) < m.sprite.explosionSize) {
          todestroy.push(bodies[i])
        }
      } catch (err) {
        console.log("ERROR!", err)
      }
    }
  }


  m.sprite.kill()
  m.destroy()

  b.sprite.kill()
  b.destroy()
  for(var i in todestroy) {
    if(todestroy[i] != null) {
      if(todestroy[i].sprite != null)
        todestroy[i].sprite.kill()
      todestroy[i].destroy()
    }
  }


  this.planet.nbBlocks = this.planet.bits.countLiving()
  var nbk = 0
  this.planet.bits.forEachAlive(function(e) {
    if(e.keepIt) nbk++
  }, this, nbk)

  this.planet.nbBlocksToKeep = nbk
}

Game.prototype.missileHitShield = function (m, s) {
  console.log("missileHitShield ", s.sprite.life)
  this.audio.hit1.play()

  this.player.destroyedMissile()

  this.particleBurst(m.sprite.x, m.sprite.y)


  m.sprite.kill()
  m.destroy()
  s.sprite.life--
  if(s.sprite.life <= 0) {
    this.audio.vanish1.play()
    this.player.activeShields--

    s.sprite.kill()
    s.destroy()
  }
}

Game.prototype.missileHit = function (m, b) {
  console.log("missileHit ")

  this.audio.hit2.play()

  this.player.destroyedMissile()

  m.sprite.kill()
  m.destroy()

  if(b.sprite != null)
    b.sprite.kill()
  b.destroy()
}

module.exports = Game;
