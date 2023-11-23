import Phaser from "phaser"

export default class GameOverWinScene extends Phaser.Scene{
    constructor(){
        super('game-over-win')
    }

    init(data){
        this.RestartButton = undefined

        // Score
        this.score = data.score
    }

    preload(){
    this.load.image('BG', 'Images/BG/PNG/summer8/Summer8.png')
    this.load.image('RestartButton', 'Images/PNG/yellow_button00.png')
    this.load.image('Happy', 'Images/image-removebg-preview.png')
    this.load.image('Logo', 'Images/learn-and-leap-the-knowledge-quest-high-resolution-logo-transparent.png')
    }

    create(){
    this.add.image(250, 75, 'BG')
    this.RestartButton = this.add.image(520, 350, 'RestartButton').setInteractive().setScale(1.5)
    this.add.text(460, 330, 'Restart', {fontSize: '32px', color: '#fff', fontFamily: 'Arial', fontStyle: 'bold'})
    this.RestartButton.once('pointerup', () => {
        this.scene.stop('question-scene')
        this.scene.start('world-scene')
    })

    this.add.image(430, 40, 'Happy').setScale(0.75)
    this.add.image(100, 50, 'Logo').setScale(0.1)

    this.add.text(440, 270, "Yay, You Did It!", {
        fontSize: "32px",
        color: "#fff",
        fontFamily: "Arial",
        fontStyle: "bold",
    });

    }

    update(time){

    }
}