import Phaser from "phaser"

export default class GameOverScene extends Phaser.Scene{
    constructor(){
        super('game-over')
    }

    init(data){

    }

    preload(){
    this.load.image('BG', 'Images/BG/PNG/summer8/Summer8.png')
    }

    create(){
    this.add.image(250, 75, 'BG')
    }

    update(time){

    }
}