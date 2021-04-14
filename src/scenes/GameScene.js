import { createGoblinAnims } from '../anims/GoblinAnims'
import { createWarAnims } from '../anims/WarAnims'
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
    // this.cameras.main.zoom = 1.2;
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
        this.hp += 10
        this.setValue(this.healthBar, this.hp);
      }
      if (this.hp > 100) {
        this.hp = 100;
        this.setValue(this.healthBar, this.hp);
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
  makeBar(x, y, color) {
    //draw the bar
    this.bar = this.add.graphics();

    //color the bar
    this.bar.fillStyle(color, 1);

    //fill the bar with a rectangle
    this.bar.fillRect(0, 0, 100, 10);

    //position the bar
    this.bar.x = x;
    this.bar.y = y;

    //return the bar
    return this.bar;
  }
  setValue(bar, percentage) {
    bar.scaleX = percentage / 100;
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  preload() {
    this.greeting = this.add.text(400, 70, 'Welcome, Wanderer...TO YOUR DOOM!', { fontSize: '32px', fill: '#8E1600', fontFamily: 'Metal Mania' }).setDepth(4);
    this.greeting.setOrigin(0.5)
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
    createWarAnims(this.anims)
    createGoblinAnims(this.anims)
    this.hp = 100;
    this.player = this.physics.add.sprite(200, 300, 'warrior').setScale(1.5).refreshBody()
    this.healthBar = this.makeBar(350, 250, 0x2ecc71, this.player).setDepth(2);
    this.setValue(this.healthBar, this.hp);
    this.cameras.main.zoom = 1;
    this.foreground = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'foreground').setDepth(4).setScale(0.5)
    this.bg = this.add.image(400, 200, 'bg').setDepth(3);
    this.player.body.immovable = true
    this.player.body.moves = false
    this.player.setOrigin(0.5, 0.5)
    this.goblin = this.physics.add.sprite(200, 100, 'goblin', 'imp_idle_anim_f0.png').setScale(3)
    this.score = 0;
    this.scoreText = this.add.text(100, 70, 'Score: 0', {
      fontSize: '32px',
      fill: '#FFFFFF',
    }).setDepth(2);
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
    this.physics.add.collider(this.goblin, walls)
    this.physics.add.collider(this.goblin, traps)

    this.physics.add.overlap(this.player, obj1, () => {
      console.log(this.hp)
      if (this.hp < 100) {
        this.hp += 10
        this.setValue(this.healthBar, this.hp);
      }
      if (this.hp > 100) {
        this.hp = 100;
        this.setValue(this.healthBar, this.hp);
      }
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);
      obj1.destroy();
      this.time.addEvent({
        delay: 5000,
        callback: () => {
          if (this.player.x === this.getRandomInt(48, 360)) {
            obj1 = this.physics.add.image(this.getRandomInt(48, 350) + 5, 47, 'potion')
            this.obj_respawn(obj1, this.getRandomInt(48, 360), 47)
          } else {
            obj1 = this.physics.add.image(this.getRandomInt(48, 360), 47, 'potion')
            this.obj_respawn(obj1, this.getRandomInt(48, 360), 47)
          }
        },
        callbackScope: this,
        loop: false
      })

    }, false, this);
    this.physics.add.overlap(this.player, obj2, () => {
      console.log(this.hp)
      if (this.hp < 100) {
        this.hp += 10
        this.setValue(this.healthBar, this.hp);
      }
      if (this.hp > 100) {
        this.hp = 100;
        this.setValue(this.healthBar, this.hp);
      }
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);
      obj2.destroy();
      this.time.addEvent({
        delay: 5000,
        callback: () => {
          if (this.player.y === this.getRandomInt(431, 555)) {
            obj2 = this.physics.add.image(913, this.getRandomInt(431, 555) + 5, 'potion')
            this.obj_respawn(obj2, 913, this.getRandomInt(431, 561))
          } else {
            obj2 = this.physics.add.image(913, this.getRandomInt(431, 561), 'potion')
            this.obj_respawn(obj2, 913, this.getRandomInt(431, 561))
          }
        },
        callbackScope: this,
        loop: false
      })
    }, false, this);
    this.physics.add.overlap(this.player, obj3, () => {
      console.log(this.hp)
      if (this.hp < 100) {
        this.hp += 10
        this.setValue(this.healthBar, this.hp);
      }
      if (this.hp > 100) {
        this.hp = 100;
        this.setValue(this.healthBar, this.hp);
      }
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);
      obj3.destroy();
      this.time.addEvent({
        delay: 5000,
        callback: () => {
          if (this.player.x === this.getRandomInt(560, 900)) {
            obj3 = this.physics.add.image(this.getRandomInt(560, 880) + 5, 623, 'potion')
            this.obj_respawn(obj3, this.getRandomInt(560, 900), 623)
          } else {
            obj3 = this.physics.add.image(this.getRandomInt(560, 900), 623, 'potion')
            this.obj_respawn(obj3, this.getRandomInt(560, 900), 623)
          }
        },
        callbackScope: this,
        loop: false
      })
    }, false, this);
    this.physics.add.overlap(this.player, obj4, () => {
      console.log(this.hp)
      if (this.hp < 100) {
        this.hp += 10
        this.setValue(this.healthBar, this.hp);
      }
      if (this.hp > 100) {
        this.hp = 100;
        this.setValue(this.healthBar, this.hp);
      }
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);
      obj4.destroy();
      this.time.addEvent({
        delay: 5000,
        callback: () => {
          if (this.player.x === this.getRandomInt(47, 490)) {
            obj4 = this.physics.add.image(this.getRandomInt(47, 450), 900, 'potion')
            this.obj_respawn(obj4, this.getRandomInt(47, 490), 900)
          }
          else {
            obj4 = this.physics.add.image(this.getRandomInt(47, 490), 900, 'potion')
            this.obj_respawn(obj4, this.getRandomInt(47, 490), 900)
          }
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
    this.goblin.setVelocityX(50);
  }
  update() {
    this.player.setVelocity(0);
    this.bar.setScrollFactor(0, 0)
    this.scoreText.setScrollFactor(0, 0)
    if (this.goblin.x > 355) {
      this.goblin.setVelocityX(-50)
    }
    if (this.goblin.x < 100) {
      this.goblin.setVelocityX(50)
    }
    if (this.goblin.y >= 260 && Phaser.Math.Distance.BetweenPoints(this.player, this.goblin) > 200) {
      this.goblin.setVelocityY(-30)
    }
    if (this.goblin.y < 70 && Phaser.Math.Distance.BetweenPoints(this.player, this.goblin) > 200) {
      this.goblin.setVelocityY(10)
    }
    if (this.goblin.body.blocked.left || this.goblin.body.blocked.down || this.goblin.body.blocked.up || this.goblin.body.blocked.right) {
      this.goblin.setVelocity(0, 0)
    }
    if (Phaser.Math.Distance.BetweenPoints(this.player, this.goblin) < 200) {
      this.player.tint = 0xFF0000;
      this.physics.moveToObject(this.goblin, this.player, 50);
    } else {
      this.player.tint = 0xffffff;
    }
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
      console.log(this.player.x, this.player.y)
      this.player.anims.play('attack', true)
    }
  }
}