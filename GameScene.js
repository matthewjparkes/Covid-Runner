const gameState = {
    score: 0,
    endGame: 0, 
    timer: 0,
    text1: '',
    text2: '',
    music:'',
    coinscore: 0,
    coincollect:'',
    speed: -400, 
    coins: '',
    highScore: [{Score: 0, Name: 'Computer'}, {Score: 0, Name: 'Computer'}, {Score: 0, Name: 'Computer'}, {Score: 0, Name: 'Computer'}]
};


class GameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameScene' })
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
    this.load.image('mass_loa_icon', "./Images/email-marketing.png")
    this.load.audio('BackgroundMusic', "./Music/Minimalistic Loops/loopThree.wav");
    this.load.audio('coin_collect', "./Music/SFX/Fruit collect 1.wav");
    this.load.image('angry_icon', "./Images/angry.png")

}


create(data) {

//Background 
this.createParalaxBackgrounds();

//Add Timer 
gameState.timer = this.time.addEvent({
    delay: 999999,
    paused: false
  });

//Add Player



this.player = this.physics.add.sprite(320, 570, 'Player').setScale(3).setDepth(11).play('run');
this.player.setSize(15, 16, false);



let coins = this.physics.add.group({immovable: true, allowGravity: false});

//Add Music

//gameState.music = this.sound.add('BackgroundMusic', { loop: true});
gameState.coincollect = this.sound.add('coin_collect', {loop : false});




//Add World Physics
this.physics.world.setBounds(0, 0, 800, 600);
this.player.setCollideWorldBounds(true);
this.player.setImmovable(true);

//Add Covid Physics
const covid = this.physics.add.group({immovable: true,
    allowGravity: false});
covid.setDepth(11);


let magnets = this.physics.add.group({immovable: true, allowGravity: false})




//Add Test Text
gameState.text1 = this.add.text(700, 10, `Score = ${gameState.score}`);
gameState.text1.setOrigin(0.5, 0.5).setDepth(11);
gameState.text2 = this.add.text(400, 50, `Coins Collected = ${gameState.coinscore}`, { fontSize: '15px', fill: '#000000' });
gameState.text2.setOrigin(0.5, 0.5).setDepth(11)

//Random Score Used for Coin Spawn Generation
const CoinGenNumb = 250; 
//Random Score Used for Enemy Spawn Generation
const RandomCovidGenNumb = 2000;
//Random Scored used for Magnet
const MagnetSpawnNumb = 4000;
// Enemy Spawn
function CovidGen () {
    const yCoord = Math.random() * 600;
    covid.create(800, yCoord, 'angry_icon').setDepth(11).setScale(0.3);
    covid.setVelocityX(gameState.speed);

}

// Power Up Spawn 


// Adding Enemy Spawn Loop
const CovidGenLoop = this.time.addEvent({
    delay: RandomCovidGenNumb,
    callback: CovidGen,
    callbackScope: this,
    loop: true,
 });
 

this.yCoordIndex = 0;

 this.sequence = [[50, 55, 60, 65, 70, 75, 80, 85, 80, 75, 70, 65, 60, 55, 50], [300, 305, 310, 315, 320, 325, 320, 315, 310, 305, 300],[500, 505, 510, 515, 520, 515, 510, 505, 500], [100, 200, 300, 400, 500, 400, 300, 200, 100], [300, 302, 304, 306, 308, 310, 312, 314, 316, 318, 320, 318, 316, 314, 316, 318, 320], [50, 65, 80, 95, 110, 125, 110, 95, 80, 65, 50], 
[200, 220, 240, 280, 300, 280, 260, 240, 220, 200], [100, 500, 200, 400, 300, 350, 350, 300, 400, 200, 500, 100]];
 this.sequenceIndex = 0;
 this.yCoord = [];

 const CoinGenLoop = this.time.addEvent({
     delay: CoinGenNumb,
     callback: () => {
                this.yCoord = this.sequence[this.sequenceIndex];              
                 // Make something iterate that iterates through an array of array's randomly 
                let coin =  this.physics.add.sprite(800, this.yCoord[this.yCoordIndex], 'coin').setDepth(11).setScale(0.25);
                coin = this.physics.add.existing(coin);
                coins.add(coin);
                if (this.yCoordIndex >= this.yCoord.length){
                        this.yCoordIndex = 0;
                        this.sequenceIndex = Phaser.Math.Between(0, 7);
                    } else{
                        this.yCoordIndex++;
                    }
                coins.setVelocityX(-400); 
     },
     loop: true
 });

 



const MagnetGenLoop = this.time.addEvent({
    delay: MagnetSpawnNumb,
    callback: () => {
        for(let i = 0; i < 1; i++){
            let yCoord = Math.random() * 600;
            let magnet =  this.physics.add.sprite(800, yCoord, 'mass_loa_icon').setDepth(11).setScale(0.1);
            magnet = this.physics.add.existing(magnet);
            magnets.add(magnet);
        }
        magnets.setVelocityX(gameState.speed); 
    },
    loop: true,
 });



// Add Keyboard Input
this.SpaceBar = this.input.keyboard.addKey('SPACE');
this.wKey = this.input.keyboard.addKey('W');
this.hKey = this.input.keyboard.addKey('H');


//Setting Enemy Spawn Velocity
//covid.setVelocityX(-300);


gameState.highScore



//Adding Collider between enemy and player + scene restart
this.physics.add.collider(this.player, covid, () => {

    let failureBox = new Phaser.Geom.Rectangle(200, 200, 400, 200);
    
    let failureBoxGraphics = this.add.graphics({ fillStyle: { color: 0xae0f3b } });
    failureBoxGraphics.fillRectShape(failureBox);
    failureBoxGraphics.setDepth(12);
    gameState.score += gameState.coinscore;
    gameState.highScore.push({Score: gameState.score, Name: data}); 
    let failureText = this.add.text(400, 300, `            Game Over! \n\n Total Distance Travelled = ${gameState.score - gameState.coinscore}m \n Total Pensions Found = ${gameState.coinscore} \n Total Score = ${gameState.score} \n\n Click to Restart \n Press H to go to the Main Menu \n Press W to go to the High Score Table`, { fontSize: '15px', fill: '#FFFFFF' }).setOrigin(0.5, 0.5).setDepth(11);
    failureText.setOrigin(0.5, 0.5).setDepth(13);
    CovidGenLoop.destroy();
    CoinGenLoop.destroy();
    MagnetGenLoop.destroy()
    this.physics.pause();
    gameState.timer.paused = true;
    gameState.endGame += 1;
    this.anims.pauseAll();
    
    this.input.on('pointerup', () => {
        gameState.endGame -= 1;
        this.scene.restart();
        gameState.timer.remove();
        gameState.coinscore = 0;
        this.anims.resumeAll();

    });

    this.wKey.on('up', () => {
        console.log('Hit');
        this.scene.start('GameOver', gameState.highScore);
    })

    this.hKey.on('up', () => {
        this.scene.start('TitleScreen', gameState.highScore);
    })
    
})

//Adding Collider between player and coin
this.physics.add.collider(this.player, coins, (player, coin) => { 
    coin.destroy();
    gameState.coinscore += 1;
    gameState.coincollect.play();
})

//Adding Collider between player and magnet power up

this.physics.add.collider(this.player, magnets, (player, magnet, coin) => { 
    magnet.destroy();
    coins.children.each(coin =>  {
        if(coin.x >= 0){
            this.physics.moveToObject(coin, this.player, 60, 150);
            
        }
    })

    
    

})




}

update() {

    

// Spacebar Functionality
const SpaceBar = this.input.keyboard.addKey('SPACE')

// Jumping Mechanic
if (SpaceBar.isDown) {
    this.player.setVelocityY(-200);
}

//Updating Score and Text
gameState.text1.setText(`Distance= ${gameState.score}`, { fontSize: '15px', fill: '#FFFFFF' }).setDepth(11);
gameState.text2.setText(`Pensions Found = ${gameState.coinscore}`, { fontSize: '15px', fill: '#FFFFFF' })

// How do I get this to include coins collected too?
gameState.score = Math.ceil(gameState.timer.getElapsedSeconds() * 10);


if (this.player.y < 560) {
    this.anims.pauseAll();
} else if (gameState.endGame === 1){
    this.anims.pauseAll();
} else {
    this.anims.resumeAll();
};




// Making the background move
this.movingBackgrounds();






  

}



movingBackgrounds() {
    
    if(gameState.timer.getElapsedSeconds() < 100000000000 && gameState.endGame === 0) {
        gameState.bg1.tilePositionX += 2;
        gameState.bg4.titePositionX += 1;
        gameState.bg7.tilePositionX += 0.1;
        gameState.bg8.tilePositionX += 0.1;
        gameState.bg5.tilePositionX += 3;
        gameState.bg6.tilePositionX += 2.5;
        gameState.bg2.tilePositionX += 1.5;
        gameState.bg3.tilePositionX += 1.5;
    
    };
}

createParalaxBackgrounds(){

    gameState.bg1 = this.add.tileSprite(0, 0, 800, 600, 'cloud_lonely');
    gameState.bg2 = this.add.tileSprite(0, 0, 800, 600, 'clouds_bg');
    gameState.bg3 = this.add.tileSprite(0, 0, 800, 600, 'clouds_mg_1_light');
    gameState.bg4 = this.add.tileSprite(0, 0, 800, 600, 'clouds_mg_1');
    gameState.bg5 = this.add.tileSprite(0, 0, 800, 600, 'clouds_mg_2');
    gameState.bg6 = this.add.tileSprite(0, 0, 800, 600,'clouds_mg_3');
    gameState.bg7 = this.add.tileSprite(0, 0, 800, 600, 'glacial_mountains_1');
    gameState.bg8 = this.add.tileSprite(0, 0, 800, 600, 'glacial_mountains_2');
    gameState.bg9 = this.add.tileSprite(0, 0, 800, 600, 'sky_1');
    gameState.bg10 = this.add.tileSprite(0, 0, 800, 600, 'sky_2');

    
    gameState.bg1.setOrigin(0, 0);
    gameState.bg2.setOrigin(0, 0);
    gameState.bg3.setOrigin(0, 0);
    gameState.bg4.setOrigin(0, 0);
    gameState.bg5.setOrigin(0, 0);
    gameState.bg6.setOrigin(0, 0);
    gameState.bg7.setOrigin(0, 0);
    gameState.bg8.setOrigin(0, 0);
    gameState.bg9.setOrigin(0, 0);
    gameState.bg10.setOrigin(0, 0);

    gameState.bg1.setScale(1, 3);
    gameState.bg2.setScale(1, 3);
    gameState.bg3.setScale(1, 3);
    gameState.bg4.setScale(1, 3);
    gameState.bg5.setScale(1, 3);
    gameState.bg6.setScale(1, 3);
    gameState.bg7.setScale(1, 3);
    gameState.bg8.setScale(1, 3);
    gameState.bg9.setScale(1, 3);


    gameState.bg1.setScrollFactor(1);
    gameState.bg2.setScrollFactor(2);
    gameState.bg3.setScrollFactor(2);
    gameState.bg4.setScrollFactor(2);
    gameState.bg5.setScrollFactor(2);
    gameState.bg6.setScrollFactor(2);
    gameState.bg7.setScrollFactor(2);
    gameState.bg8.setScrollFactor(2);
    gameState.bg9.setScrollFactor(2);
    gameState.bg10.setScrollFactor(2);


    gameState.bg1.setDepth(10);
    gameState.bg2.setDepth(2);
    gameState.bg3.setDepth(8);
    gameState.bg4.setDepth(7);
    gameState.bg5.setDepth(6);
    gameState.bg6.setDepth(5);
    gameState.bg7.setDepth(4);
    gameState.bg8.setDepth(3);
    gameState.bg9.setDepth(2);
    gameState.bg10.setDepth(1);
   
    gameState.bg4.setScrollFactor(0, 1);
    gameState.bg1.setScrollFactor(0, 1);  

    gameState.bg4.setTilePosition(this.cameras.main.scrollX);
    gameState.bg1.setTilePosition(this.cameras.main.scrollX);



}
}
