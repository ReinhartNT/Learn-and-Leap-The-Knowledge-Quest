import Phaser from "phaser"

export default class GameOverScene extends Phaser.Scene{
    constructor(){
        super('game-over')
    }

    init(data){
        this.RestartButton = undefined

        // Score
        this.score = data.score
    }

    preload(){
    this.load.image('BG', 'Images/BG/PNG/summer8/Summer8.png')
    this.load.image('RestartButton', 'Images/PNG/yellow_button00.png')
    this.load.image('Sad', 'Images/9479419-removebg-preview.png')
    this.load.image('Logo', 'Images/learn-and-leap-the-knowledge-quest-high-resolution-logo-transparent.png')
    }

    create(){
    this.add.image(250, 75, 'BG')
    this.RestartButton = this.add.image(520, 350, 'RestartButton').setInteractive().setScale(1.5)
    this.add.text(460, 330, 'Restart', {fontSize: '32px', color: '#fff', fontFamily: 'Arial', fontStyle: 'bold'})
    this.RestartButton.once('pointerup', () => {
        this.scene.start('world-scene')
    })

    this.add.text(390, 200, "Score: " + this.score, {
        fontSize: "32px",
        color: "#fff",
        fontFamily: "Arial",
        fontStyle: "bold",
    });

    this.add.image(430, 40, 'Sad').setScale(0.75)
    this.add.image(100, 50, 'Logo').setScale(0.1)
    }

    update(time){

    }
}