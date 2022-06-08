class GameOver extends Phaser.Scene {
    constructor() {
      super({ key: 'GameOver' })
    }
    


    preload(){

    }

    create(data){

      data.sort((a, b) => {
        return b.Score - a.Score;
      })
      console.log('game started', data);
      console.log(`${data[1].Name}`)


        let HighScoreTable = this.add.text(400, 100, 'Highscore Table', { fontFamily: 'Impact', fontSize: '30px'});
        HighScoreTable.setOrigin(0.5, 0.5);
        let Score1 = this.add.text(400, 150, `1.    ${data[0].Name}  ${data[0].Score}` );
        let Score2 = this.add.text(400, 175, `2.    ${data[1].Name}  ${data[1].Score}` );
        let Score3 = this.add.text(400, 200, `3.    ${data[2].Name}  ${data[2].Score}` );
        let Score4 = this.add.text(400, 225, `4.    ${data[3].Name}  ${data[3].Score}` );
        let Score5 = this.add.text(400, 250, `5.    ${data[4].Name}   ${data[4].Score}` );
        Score1.setOrigin(0.5, 0.5);
        Score2.setOrigin(0.5, 0.5);
        Score3.setOrigin(0.5, 0.5);
        Score4.setOrigin(0.5, 0.5);
        Score5.setOrigin(0.5, 0.5);
        
        let MainMenuButton = this.add.text(400, 500, 'Back to Main Menu');
        MainMenuButton.setOrigin(0.5, 0.5);
        MainMenuButton.setInteractive();
        MainMenuButton.on('pointerup', () => {
          this.scene.start('TitleScreen');
        })
    }

    update(){

    }

}