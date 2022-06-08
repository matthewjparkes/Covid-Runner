class instructionsScreen extends Phaser.Scene {
    constructor() {
      super({ key: 'instructionsScreen' })
    }

    
    preload(){
        this.load.image('mass_loa_icon', "./Images/email-marketing.png");
        this.load.image('coin', "./Images/coin_01.png");
        this.load.image('angry_icon', "./Images/angry.png");
    }
    
    
    create(data){


        this.playername = data;
        this.add.sprite(100, 100, 'coin').setScale(0.3);
        this.add.sprite(100, 200, 'mass_loa_icon').setScale(0.2);
        this.add.sprite(100, 300, 'angry_icon').setScale(0.15);

        let coinInstructions = this.add.text(200, 100, 'Collect as many pensions as possible!');
        let massLoaInstructions = this.add.text(200, 200, 'Hit a Mass LoA to collect all of the pensions on screen!');
        let angryInstructions = this.add.text(200, 300, "Avoid all of the Transfer Outs, otherwise it's game over!");
        let spacebarinstructions = this.add.text (200, 400, "Press the Space Bar to Jump!");
        

        let StartGameButton = this.add.text(400, 550, 'Press Enter to Play Game'); 
        StartGameButton.setOrigin(0.5, 0.5); 
        StartGameButton.setInteractive();
        StartGameButton.on('pointerup', () => {
            this.scene.start('FirstScene', this.playername);
        });

        this.enterkey = this.input.keyboard.addKey('ENTER');
        this.enterkey.on('up', () => {
            this.scene.start('FirstScene', this.playername);
        });



    


}

}