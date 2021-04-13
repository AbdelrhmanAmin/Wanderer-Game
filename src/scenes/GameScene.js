export class GameScene extends Phaser.Scene {
  constructor() {
    super('GAME')
  }
  delayDone() {
    this.player.body.setSize(20, 20, true);
  }
  welcome() {
    this.cameras.main.startFollow(this.player);
    this.greeting.setVisible(false);
    this.foreground.destroy();
    this.bg.destroy();
    this.player.body.immovable = false
    this.player.body.moves = true
    this.cameras.main.zoom = 1.2;
  }
  gameOver() {
    this.bg = this.add.image(400, 200, 'bg').setDepth(1);
    this.player.body.immovable = true
    this.player.body.moves = false
    this.video = this.add.video(this.player.x, this.player.y, 'died').setDepth(2);
    this.video.loop = false
    this.video.play(true);
    this.time.addEvent({
      delay: 5000,
      callback: () => {
        this.scene.start('MENU')
      },
      callbackScope: this,
      loop: false
    })
    this.input.keyboard.on('keydown', () => {
      this.scene.start('MENU')
    })
  }
  obj_respawn(obj, x, y) {
    this.physics.add.overlap(this.player, obj, () => {
      console.log(this.hp)
      if (this.hp < 100) {
        this.hp = +10
      }
      if (this.hp > 100) {
        this.hp = 100;
      }
      obj.destroy();
      this.time.addEvent({
        delay: 2000,
        callback: () => {
          obj = this.physics.add.image(x, y, 'potion')
          this.obj_respawn(obj)
        },
        callbackScope: this,
        loop: false
      })

    }, false, this);
  }
  preload() {
    this.load.image('terrain', './assets/image/terrain_atlas.png');
    this.load.image('items', './assets/image/icons_2.0.png');
    this.load.tilemapTiledJSON('map', './assets/maps/map.json')
    this.greeting = this.add.text(400, 70, 'Welcome, Wanderer...TO YOUR DOOM!', { fontSize: '32px', fill: '#8E1600', fontFamily: 'Metal Mania' }).setDepth(2);
    this.load.image('foreground', './assets/greeting2.jpg');
    this.greeting.setOrigin(0.5)
    this.load.image('bg', './assets/black.jpg');
    this.load.video('died', 'assets/died.mp4');
    this.load.image('potion', './assets/potion.png')
    this.time.addEvent({
      delay: 1000,
      callback: this.delayDone,
      callbackScope: this,
      loop: false
    })
    this.time.addEvent({
      delay: 2000,
      callback: this.welcome,
      callbackScope: this,
      loop: false
    })
  }
  create() {
    this.hp = 100;

    this.cameras.main.zoom = 1;
    this.player = this.physics.add.sprite(200, 300, 'warrior').setScale(1.5).refreshBody()
    this.foreground = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'foreground').setDepth(2).setScale(0.5)
    this.bg = this.add.image(400, 200, 'bg').setDepth(1);
    this.player.body.immovable = true
    this.player.body.moves = false
    this.player.setOrigin(0.5, 0.5)
    this.add.text(this.player.x, this.player.y, `${this.hp}%`, { fontSize: '32px', fill: '#8E1600', fontFamily: 'Metal Mania' })
    this.Enter = this.input.keyboard.addKey('ENTER');
    this.keyW = this.input.keyboard.addKey('W');
    this.keyD = this.input.keyboard.addKey('D');
    this.keyS = this.input.keyboard.addKey('S');
    this.keyA = this.input.keyboard.addKey('A');
    this.keyA = this.input.keyboard.addKey('A');
    this.key_Space = this.input.keyboard.addKey('SPACE');
    this.cursors = this.input.keyboard.createCursorKeys();
    let obj1 = this.physics.add.image(47, 47, 'potion')
    let obj2 = this.physics.add.image(913, 431, 'potion')
    let obj3 = this.physics.add.image(559, 623, 'potion')
    let obj4 = this.physics.add.image(50, 900, 'potion')
    let trapIndex = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 272, 273, 274, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 304, 305, 306, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 336, 337, 338, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 458, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 272, 273, 274, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 304, 305, 306, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 269, 270, 271, 0, 0, 0, 0, 0, 0, 0, 0, 0, 336, 337, 338, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 301, 302, 303, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 333, 334, 335, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 458, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let wallIndex = [856, 856, 856, 856, 856, 856, 856, 856, 856, 856, 856, 856, 857, 0, 0, 753, 754, 754, 754, 754, 754, 754, 754, 754, 754, 754, 754, 754, 754, 755, 793, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 794, 0, 0, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 793, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 794, 0, 0, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 793, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 794, 0, 0, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 793, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 794, 0, 0, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 793, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 793, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 793, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 793, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 794, 0, 0, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 793, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 794, 0, 0, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 793, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 794, 0, 0, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 856, 856, 856, 856, 856, 856, 856, 856, 856, 856, 856, 856, 856, 0, 0, 817, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 819, 753, 754, 754, 754, 754, 754, 754, 754, 754, 754, 754, 754, 754, 0, 0, 754, 754, 754, 754, 754, 754, 754, 754, 754, 754, 754, 754, 754, 754, 787, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 945, 946, 946, 946, 946, 946, 946, 946, 946, 946, 946, 946, 946, 787, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 977, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 977, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 977, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 977, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 977, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 977, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 977, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787, 817, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 818, 819]
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNames('a-warrior', {
        prefix: 'run-',
        end: 7,
      }),
      frameRate: 8,
    });
    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNames('a-warrior', {
        prefix: 'attack-',
        end: 2,
      }),
      frameRate: 8
    });
    this.player.setCollideWorldBounds(true);
    let map = this.add.tilemap('map');
    let terrain = map.addTilesetImage('terrain_atlas', 'terrain')

    let bottom = map.createLayer('ground', [terrain], 0, 0).setDepth(-1)
    let walls = map.createLayer('walls', [terrain], 0, 0)
    let traps = map.createLayer('traps', [terrain], 0, 0)
    walls.setCollision(wallIndex)
    traps.setCollision(trapIndex)
    this.physics.add.collider(this.player, walls)
    this.physics.add.collider(this.player, traps)

    this.physics.add.overlap(this.player, obj1, () => {
      console.log(this.hp)
      if (this.hp < 100) {
        this.hp = +10
      }
      if (this.hp > 100) {
        this.hp = 100;
      }
      obj1.destroy();
      this.time.addEvent({
        delay: 2000,
        callback: () => {
          obj1 = this.physics.add.image(47, 47, 'potion')
          this.obj_respawn(obj1, 47, 47)
        },
        callbackScope: this,
        loop: false
      })

    }, false, this);
    this.physics.add.overlap(this.player, obj2, () => {
      console.log(this.hp)
      if (this.hp < 100) {
        this.hp = +10
      }
      if (this.hp > 100) {
        this.hp = 100;
      }
      obj2.destroy();
      this.time.addEvent({
        delay: 2000,
        callback: () => {
          obj2 = this.physics.add.image(913, 431, 'potion')
          this.obj_respawn(obj2, 913, 431)
        },
        callbackScope: this,
        loop: false
      })
    }, false, this);
    this.physics.add.overlap(this.player, obj3, () => {
      console.log(this.hp)
      if (this.hp < 100) {
        this.hp += 10
      }
      if (this.hp > 100) {
        this.hp = 100;
      }
      obj3.destroy();
      this.time.addEvent({
        delay: 2000,
        callback: () => {
          obj3 = this.physics.add.image(559, 623, 'potion')
          this.obj_respawn(obj3, 559, 623)
        },
        callbackScope: this,
        loop: false
      })
    }, false, this);
    this.physics.add.overlap(this.player, obj4, () => {
      console.log(this.hp)
      if (this.hp < 100) {
        this.hp += 10
      }
      if (this.hp > 100) {
        this.hp = 100;
      }
      obj4.destroy();
      this.time.addEvent({
        delay: 2000,
        callback: () => {
          obj4 = this.physics.add.image(50, 900, 'potion')
          this.obj_respawn(obj4, 50, 900)
        },
        callbackScope: this,
        loop: false
      })
    }, false, this);

    traps.setTileIndexCallback(trapIndex, () => {
      this.gameOver()
    });
    this.physics.world.setBounds(5, 5, map.widthInPixels - 5, map.heightInPixels - 5)
    this.player.anims.play('run', true)
  }
  update() {
    this.player.setVelocity(0);
    // console.log(this.player.x, this.player.y)
    if (this.keyW.isDown || this.cursors.up.isDown) {
      this.player.setVelocityY(-250);
      this.player.flipY = false;
      this.player.anims.play('run', true)
    }
    if (this.keyS.isDown || this.cursors.down.isDown) {
      this.player.setVelocityY(250);
      this.player.anims.play('run', true)
    }
    if (this.keyD.isDown || this.cursors.right.isDown) {
      this.player.setVelocityX(250);
      this.player.flipX = false;
      this.player.anims.play('run', true)
    }

    if (this.keyA.isDown || this.cursors.left.isDown) {
      this.player.setVelocityX(-250);
      this.player.flipX = true;
      this.player.anims.play('run', true)
    }
    if (this.key_Space.isDown) {
      this.player.anims.play('attack', true)
    }
  }
}