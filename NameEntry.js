class NameEntry extends Phaser.Scene {
    constructor() {
      super({ key: 'NameEntry' })
    }

    create(){

    let textEntry = this.add.text(400, 250, '');
    textEntry.setOrigin(0.5, 0.5);
    

    let textEntryInstructions = this.add.text(400, 200, 'Type Your Name:')
    textEntryInstructions.setOrigin(0.5, 0.5);

    this.input.keyboard.on('keydown', function (event) {
    
        if (event.keyCode === 8 && textEntry.text.length > 0)
        {
            textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
        }
        else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90))
        {
            textEntry.text += event.key;
        }
        
    });

    let StartGameButton = this.add.text(400, 300, 'Press Enter to go to instructions'); 
    StartGameButton.setOrigin(0.5, 0.5); 
    StartGameButton.setInteractive();
    StartGameButton.on('pointerup', () => {
        this.scene.start('instructionsScreen', textEntry.text);
    })
    this.enterkey = this.input.keyboard.addKey('ENTER');
    this.enterkey.on('up', () => {
        this.scene.start('instructionsScreen', textEntry.text);
    });

}

}