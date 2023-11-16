import Phaser from "phaser"

export default class StartScene extends Phaser.Scene{
    constructor(){
        super('start-scene')
    }

    init(data){
        this.startButton = undefined
    }

    preload(){
        this.load.image('BG Logo', 'Images/learn-and-leap-the-knowledge-quest-high-resolution-logo full.png')
        this.load.image('StartButton', 'Images/PNG/yellow_button00.png')
        this.load.image('BG White', 'Images/BG White.png')
    }

    create(){
        this.add.image(450, 220, 'BG White')
        this.add.image(280, 220, 'BG Logo').setScale(0.4)
        this.startButton = this.add.image(900, 100, 'StartButton').setInteractive().setScale(1.5)
        this.add.text(820, 80, 'Start Game', {fontSize: '32px', color: '#fff', fontFamily: 'Arial', fontStyle: 'bold'})
        this.startButton.once('pointerup', () => {
            this.scene.start('world-scene')
        })
    }

    update(time){

    }
}