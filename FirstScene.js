class FirstScene extends Phaser.Scene {
    constructor() {
      super({ key: 'FirstScene' })
    }


    

preload() {
    this.load.atlas('player', "./Images/spritesheet.png", "./Images/Dinosprites.json");
    this.load.image('Covid', "./Images/zombie_slide.png" );
    this.load.image('cloud_lonely', "./Background/Glacial-mountains-parallax-background_vnitti/Layers/cloud_lonely.png");
    this.load.image('clouds_bg',"./Background/Glacial-mountains-parallax-background_vnitti/Layers/clouds_bg.png");
    this.load.image('clouds_mg_1_light', "./Background/Glacial-mountains-parallax-background_vnitti/Layers/clouds_mg_1_lightened.png");
    this.load.image('clouds_mg_1', "./Background/Glacial-mountains-parallax-background_vnitti/Layers/clouds_mg_1.png");
    this.load.image('clouds_mg_2', "./Background/Glacial-mountains-parallax-background_vnitti/Layers/clouds_mg_2.png");
    this.load.image('clouds_mg_3', "./Background/Glacial-mountains-parallax-background_vnitti/Layers/clouds_mg_3.png");
    this.load.image('glacial_mountains_1', "./Background/Glacial-mountains-parallax-background_vnitti/Layers/glacial_mountains_lightened.png");
    this.load.image('glacial_mountains_2', "./Background/Glacial-mountains-parallax-background_vnitti/Layers/glacial_mountains.png");
    this.load.image('sky_1', "./Background/Glacial-mountains-parallax-background_vnitti/Layers/sky_lightened.png");
    this.load.image('sky_2', "./Background/Glacial-mountains-parallax-background_vnitti/Layers/sky.png");
    this.load.image('coin', "./Images/coin_01.png");
    this.load.image('coin_magnet', "./Images/PNG/flat_medal6.png")
    this.load.audio('BackgroundMusic', "./Music/Minimalistic Loops/loopThree.wav");
    this.load.audio('coin_collect', "./Music/SFX/Fruit collect 1.wav");

}

create(data){
   this.firstSceneTimer = this.time.addEvent({
        delay: 999999,
        paused: false
      });

      var playerAnimation = this.anims.create({
        key: 'run',
        frames: [ 
        {
            key: 'player',
            frame: "sprite22"
        }, 
        {
            key: 'player',
            frame: "sprite23"
        },{
            key: 'player',
            frame: "sprite24"
        }],
        frameRate: 10,
        repeat: -1
      });
    
    this.anims.create(playerAnimation);
    
    this.player = this.physics.add.sprite(0, 585, 'Player').setScale(3).setDepth(11).play('run');
    this.player.setSize(15, 16, false);
    this.physics.world.setBounds(0, 0, 800, 600);
    this.player.setCollideWorldBounds(true);
    this.player.setImmovable(true);

    this.createParalaxBackgrounds();
    this.playername = data;

    this.number3 = this.add.text(400, 100, '3', {fontfamily: 'Impact', fontSize: '100px'}).setDepth(11).setVisible(false).setOrigin(0.5, 0.5);
    this.number2 = this.add.text(400, 100, '2', {fontfamily: 'Impact', fontSize: '100px'}).setDepth(11).setVisible(false).setOrigin(0.5, 0.5);
    this.number1 = this.add.text(400, 100, '1', {fontfamily: 'Impact', fontSize: '100px'}).setDepth(11).setVisible(false).setOrigin(0.5, 0.5);
    this.number0 = this.add.text(400, 100, 'GO!', {fontfamily: 'Impact', fontSize: '100px'}).setDepth(11).setVisible(false).setOrigin(0.5, 0.5);

    
    
}

update(){

    if(this.firstSceneTimer.getElapsed() >= 5000){
        this.scene.start('GameScene', this.playername);
    }

    if(this.firstSceneTimer.getElapsed() >= 1000 && this.firstSceneTimer.getElapsed() < 2000){
        this.number3.setVisible(true);
        this.player.setVelocityX(50);
    } else if (this.firstSceneTimer.getElapsed() >= 2000 && this.firstSceneTimer.getElapsed() < 3000){
        this.number3.setVisible(false);
        this.number2.setVisible(true);
        this.player.setVelocityX(50);
        
    } else if (this.firstSceneTimer.getElapsed() >= 3000 && this.firstSceneTimer.getElapsed() < 4000){
        this.number2.setVisible(false);
        this.number1.setVisible(true);
        this.player.setVelocityX(100);
    } else if (this.firstSceneTimer.getElapsed() >= 4000 && this.firstSceneTimer.getElapsed() < 5000){
        this.number1.setVisible(false);
        this.number0.setVisible(true);
    }
}

createParalaxBackgrounds(){

    let bg1 = this.add.tileSprite(0, 0, 800, 600, 'cloud_lonely');
    let bg2 = this.add.tileSprite(0, 0, 800, 600, 'clouds_bg');
    let bg3 = this.add.tileSprite(0, 0, 800, 600, 'clouds_mg_1_light');
    let bg4 = this.add.tileSprite(0, 0, 800, 600, 'clouds_mg_1');
    let bg5 = this.add.tileSprite(0, 0, 800, 600, 'clouds_mg_2');
    let bg6 = this.add.tileSprite(0, 0, 800, 600,'clouds_mg_3');
    let bg7 = this.add.tileSprite(0, 0, 800, 600, 'glacial_mountains_1');
    let bg8 = this.add.tileSprite(0, 0, 800, 600, 'glacial_mountains_2');
    let bg9 = this.add.tileSprite(0, 0, 800, 600, 'sky_1');
    let bg10 = this.add.tileSprite(0, 0, 800, 600, 'sky_2');

    
    bg1.setOrigin(0, 0);
    bg2.setOrigin(0, 0);
    bg3.setOrigin(0, 0);
    bg4.setOrigin(0, 0);
    bg5.setOrigin(0, 0);
    bg6.setOrigin(0, 0);
    bg7.setOrigin(0, 0);
    bg8.setOrigin(0, 0);
    bg9.setOrigin(0, 0);
    bg10.setOrigin(0, 0);

    bg1.setScale(1, 3);
    bg2.setScale(1, 3);
    bg3.setScale(1, 3);
    bg4.setScale(1, 3);
    bg5.setScale(1, 3);
    bg6.setScale(1, 3);
    bg7.setScale(1, 3);
    bg8.setScale(1, 3);
    bg9.setScale(1, 3);


    bg1.setScrollFactor(1);
    bg2.setScrollFactor(2);
    bg3.setScrollFactor(2);
    bg4.setScrollFactor(2);
    bg5.setScrollFactor(2);
    bg6.setScrollFactor(2);
    bg7.setScrollFactor(2);
    bg8.setScrollFactor(2);
    bg9.setScrollFactor(2);
    bg10.setScrollFactor(2);


    bg1.setDepth(10);
    bg2.setDepth(2);
    bg3.setDepth(8);
    bg4.setDepth(7);
    bg5.setDepth(6);
    bg6.setDepth(5);
    bg7.setDepth(4);
    bg8.setDepth(3);
    bg9.setDepth(2);
    bg10.setDepth(1);
   
    bg4.setScrollFactor(0, 1);
    bg1.setScrollFactor(0, 1);  

    bg4.setTilePosition(this.cameras.main.scrollX);
    bg1.setTilePosition(this.cameras.main.scrollX);



}

}