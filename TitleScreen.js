class TitleScreen extends Phaser.Scene {
    constructor() {
      super({ key: 'TitleScreen' })
    }

preload(){
  this.load.image('NESTLogo', "./Images/Nest-pensions-180px.png" );
  this.load.image('AvivaLogo', "./Images/Aviva Primary Logo - full colour - RGB - transparent png_5273.png" );
  this.load.image('BCELogo', "./Images/client-logo-bandce-300x300.png" );
  this.load.image('LGLogo', "./Images/Legal-General.png" );
  

}

create(){


    let title = this.add.text(400, 200, 'Raindrop Runner',  {fontFamily: 'Impact',
    fontSize: '65px'});
    title.setOrigin(0.5, 0.5);
    title.setDepth(2);

    let subtitle = this.add.text(400, 300, 'A Pension Finding Infinite Runner', {fontFamily: 'Impact',
    fontSize: '25px'});
    subtitle.setOrigin(0.5, 0.5);
    subtitle.setDepth(2);

    let CTA = this.add.text(400, 400, 'Click to Start',  {fontFamily: 'Impact',
    fontSize: '30px'});
    CTA.setOrigin(0.5, 0.5);
    CTA.setDepth(2);
    CTA.setInteractive();
    CTA.on('pointerdown', () => {
        this.scene.start('NameEntry');
    })

    let HighScoreTable = this.add.text(400, 500, 'Highscore Table', { fontFamily: 'Impact', fontSize: '30px'});
    HighScoreTable.setOrigin(0.5, 0.5);
    HighScoreTable.setInteractive();
    HighScoreTable.setDepth(2);
    HighScoreTable.on('pointerdown', () => {
        this.scene.start('GameOver', gameState.highScore);
    })

    const provider = this.physics.add.group({immovable: true,
      allowGravity: true});
    provider.setDepth(11);

    
    function NESTGen () {
      const xCoord = Math.random() * 800;
      provider.create(xCoord, 0, 'NESTLogo').setScale(0.5).setDepth(1);
  }
    function BCEGen () {
      const xCoord = Math.random() * 800;
      provider.create(xCoord, 0, 'BCELogo').setScale(0.5).setDepth(1);
      

  }
    function AvivaGen () {
      const xCoord = Math.random() * 800;
      provider.create(xCoord, 0, 'AvivaLogo').setScale(0.25).setDepth(1);
     

    }
    function LGGen() {
      const xCoord = Math.random() * 800;
      provider.create(xCoord, 0, 'LGLogo').setScale(0.05).setDepth(1);
      

    }


  const NESTGenLoop = this.time.addEvent({
    delay: 500,
    callback: NESTGen,
    callbackScope: this,
    loop: true,
  });
  const AvivaGenLoop = this.time.addEvent({
  delay: 400,
  callback: AvivaGen,
  callbackScope: this,
  loop: true,
 });
 const LGGenLoop = this.time.addEvent({
  delay: 450,
  callback: LGGen,
  callbackScope: this,
  loop: true,
});
const BCEGenLoop = this.time.addEvent({
  delay: 550,
  callback: BCEGen,
  callbackScope: this,
  loop: true,
});
//graphics.setInteractive(rect, () => {
       // if(pointer.isDown) {
         ///   console.log('Matthew');
         //   this.scene.start('GameScene');
       // }
        //}, this);
    
}

update(){

}

}