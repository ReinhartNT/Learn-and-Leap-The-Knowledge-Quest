import Phaser from "phaser";

export default class WorldScene extends Phaser.Scene{
    constructor() {
        super('world-scene')
    }

    init(){
        this.background = undefined
        this.platform = undefined
        this.movingPlatform = undefined
        this.player = undefined
        this.cursors = undefined
        this.speed = 75
        this.fence = undefined
        this.questionText = undefined
        this.resultText = undefined
        this.question = []
        this.number = 0
        
        // Number
        this.number0 = undefined
        this.number1 = undefined
        this.number2 = undefined
        this.number3 = undefined
        this.number4 = undefined
        this.number5 = undefined
        this.number6 = undefined
        this.number7 = undefined
        this.number8 = undefined
        this.number9 = undefined
        this.backspace = undefined
        this.enter = undefined
    }

    preload(){
        this.load.image('BG', 'Images/BG/PNG/summer8/Summer8.png')
        this.load.image('Platform', 'Images/Kenny/Tiles/tile_0002.png')
        this.load.spritesheet('Player', 'Images/player_vector.png',{
            frameWidth: 80,
            frameHeight: 110
        })
        this.load.image('Fence', 'Images/Kenny/Tiles/tile_0105.png')
    }

    create(){
        this.background = this.add.image(250, 75, 'BG')
        this.platform = this.physics.add.group({
            key: 'Platform',
            repeat: 60,
            setXY: {x: 0, y: 425, stepX: 18, stepY: 0},
            setScale: {x: 3, y:3},
            collideWorldBounds: true
        })
        this.createButtons()

        // Obstacle
        this.fence = this.physics.add.group({
            key: 'Fence',
            repeat: 10,
            setXY: {x: 200, y: 0, stepX: 150},
            setScale: {x: 3, y:3}
        })
        this.physics.add.collider(this.fence, this.platform)
        this.fence.children.iterate(function(child){
            // @ts-ignore
            child.setBounceY(0.2)
        })
        
        // Movement
        this.cursors = this.input.keyboard.createCursorKeys()
        this.player = this.CreatePlayer()

        this.physics.add.overlap(
            this.player,
            this.fence,
            this.startQuestion,
            null,
            this
        )
    }

    update(time){
        this.Movement(this.player, time)

        // if(this.number0.isDown){
        //     console.log('0')
        // }
    }

    Movement(player, time){
        // Move
        if(this.cursors.right.isDown){
            this.player.setVelocityX(this.speed)
            player.anims.play('Right', true)
            this.player.setFlipX(false)
        }else if(this.cursors.left.isDown){
            this.player.setVelocityX(this.speed * -1)
            player.anims.play('Left', true)
            this.player.setFlipX(true)
        } else {
            this.player.setVelocityX(0)
            this.player.anims.play('Idle')
        }
        
    }
    CreatePlayer(){
        const player = this.physics.add.sprite(40, 300, 'Player').setScale(0.8)
        
        this.physics.add.collider(player, this.platform)
        player.setCollideWorldBounds(true)

        // Right Anims
        this.anims.create({
            key: 'Right',
            frames: this.anims.generateFrameNumbers('Player', {
                start: 9, end: 10
            }),
            frameRate: 10,
            repeat: -1
        })
        // Left Anims
        this.anims.create({
            key: 'Left',
            frames: this.anims.generateFrameNumbers('Player', {
                start: 9, end: 10
            }),
            frameRate: 10,
            repeat: -1
        })
        // Idle Anims
        this.anims.create({
            key: 'Idle',
            frames: [{
                key: 'Player', frame: 0
            }]
        })
        return player
    }
    getOperator(){
        const operator = ['+', '-', 'x', ':']
        return operator[Phaser.Math.Between(0,3)]
    }
    generateQuestion(){
        let numberA = Phaser.Math.Between(0, 50)
        let numberB = Phaser.Math.Between(0, 50)
        let operator = this.getOperator()
        if (operator === '+'){
            this.question[0] = `${numberA} + ${numberB}`
            this.question[1] = numberA + numberB
        }
        if (operator === 'x'){
            this.question[0] = `${numberA} x ${numberB}`
            this.question[1] = numberA * numberB
        }
        if (operator === '-'){
            if(numberB > numberA){
                this.question[0] = `${numberB} - ${numberA}`
                this.question[1] = numberB - numberA
            } else {
                this.question[0] = `${numberA} - ${numberB}`
                this.question[1] = numberA - numberB
            }
        }
        if (operator === ':'){
            do{
                numberA = Phaser.Math.Between(0, 50)
                numberB = Phaser.Math.Between(0, 50)
            }while(!Number.isInteger(numberA/numberB))
            this.question[0] =  `${numberA} : ${numberB}`
            this.question[1] = numberA / numberB
        }
        this.questionText.setText(this.question[0])
        const textHalfWidth = this.questionText.width * 0.5
        this.questionText.setX(540 - textHalfWidth)
    }
    checkAnswer(){
        if(this.number == this.question[1]){
            this.correctAnswer = true
        }else{
            this.correctAnswer = false
        }
    }
    startQuestion(player, fence){
        this.resultText = this.add.text(540, 200, '0', { fontSize: '32px', color: '#000'})
        this.questionText = this.add.text(540, 100, '0', { fontSize: '32px', color: '#000'})
        this.generateQuestion()

    }
    createButtons(){
        this.number0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO)
        this.number1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
        this.number2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
        this.number3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE)
        this.number4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR)
        this.number5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE)
        this.number6 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX)
        this.number7 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN)
        this.number8 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT)
        this.number9 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE)
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        this.backspace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE)
    }
}
