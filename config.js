
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "ae0f3b",
    allowGravity: true,
    setImmovable: false,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 800}, 
        debug: false,
      debugShowBody: true,
      debugShowStaticBody: true
    
    },
        
    }, 
    scene: [TitleScreen, NameEntry,instructionsScreen, FirstScene, GameScene, GameOver]
        
    
    
}

const game = new Phaser.Game(config);


