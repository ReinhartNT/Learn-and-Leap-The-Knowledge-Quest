import Phaser from "phaser";

export default class WorldScene extends Phaser.Scene{
    constructor() {
        super('world-scene')
    }

    init(data){
        this.background = undefined
        this.platform = undefined
        this.movingPlatform = undefined
        this.player = undefined
        this.cursors = undefined
        this.speed = 75
        this.fence = undefined
        this.score = 0
        this.scoreText = undefined
        this.health = 3
        this.healthText = undefined

        // Get the score and health from the previous scene
        this.scoreTmp = data.score
        this.healthTmp = data.health
        this.isRight = data.isRight
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

        // If player touch fence
        this.physics.add.overlap(this.player, this.fence, this.startQuestion, null, this)

        // Score Text
        this.scoreText = this.add.text(16, 16, 'Score: ' + this.score, {fontSize: '24px', color: '#fff', fontFamily: 'Arial', fontStyle: 'bold'})

        // Health
        this.healthText =  this.add.text(16, 50, 'Health: ' + this.health, {fontSize: '24px', color: '#fff', fontFamily: 'Arial', fontStyle: 'bold'})

    }

    update(time){
        this.Movement(this.player, time)

        // Update Score and Health
        if(this.scoreTmp != undefined && this.healthTmp != undefined){
            this.scoreText.setText('Score: ' + this.scoreTmp)
            this.healthText.setText('Health: ' + this.healthTmp)

            this.score = this.scoreTmp
            this.health = this.healthTmp
        }

        if(this.health <= 0){
            this.scene.start('game-over', {score: this.score})
        }

        if (this.score >= 50){
            this.scene.start('win-scene', {score: this.score})
        }
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

    startQuestion(player, fence){
      // Destroy the fence
        fence.destroy()
      // Pause the scene
        this.scene.pause()
      // Move player to the next scene, bring the score and health
        this.scene.launch('question-scene', {score: this.score, health: this.health})
    }
}
