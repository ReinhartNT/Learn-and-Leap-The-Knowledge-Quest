import Phaser from "phaser";

export default class QuestionScene extends Phaser.Scene {
  constructor() {
    super("question-scene");
  }

  init(data){
    this.gameHalfWidth = this.scale.width * 0.5
    this.gameHalfHeight = this.scale.height * 0.5
    this.questionText = undefined
    this.resultText = undefined
    this.question = []
    this.number = 0
    this.numberArr = []
    this.correctAnswer = undefined
    this.scoreTmp = 0
    this.healthTmp = 0
    
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

    // Imported Data
    this.score = data.score
    this.health = data.health
  }

  preload(){
    this.load.image('BG', 'Images/BG/PNG/summer8/Summer8.png')
  }

  create(){
    this.add.image(250, 75, 'BG')

    this.questionStart()

    // Score
    this.add.text(16, 16, 'Score: ' + this.score, {fontSize: '24px', color: '#fff', fontFamily: 'Arial', fontStyle: 'bold'})
    this.add.text(16, 50, 'Health: ' + this.health, {fontSize: '24px', color: '#fff', fontFamily: 'Arial', fontStyle: 'bold'})
  }

  update(time){

  }

  questionStart(){
    // Start Question
    this.questionText = this.add.text(this.gameHalfWidth, 100, '', {fontSize: '64px', color: '#fff', fontFamily: 'Arial', fontStyle: 'bold'})
    this.questionText.setY(100)

    // Result 
    this.resultText = this.add.text(this.gameHalfWidth, 300, '', {fontSize: '32px', color: '#fc0328', fontFamily: 'Arial', fontStyle: 'bold'})
    this.resultText.setY(300)

    // Number
    this.createButtons()

    // Update Number every time player press number on createButtons()
    this.input.keyboard.on('keydown', this.updateNumber, this)

    this.generateQuestion()
  }

  getOperator(){
    const operator = ['+', '-', 'x', ':']
    return operator[Phaser.Math.Between(0,3)]
  }

  generateQuestion(){
      let numberA = Phaser.Math.Between(0, 100)
      let numberB = Phaser.Math.Between(0, 100)
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

  updateNumber(event){
    // If digit is < 10
    if(this.numberArr.length < 6){
        if(this.number0.isDown){
            this.numberArr.push('0')
        }
        if(this.number1.isDown){
            this.numberArr.push('1')
        }
        if(this.number2.isDown){
            this.numberArr.push('2')
        }
        if(this.number3.isDown){
            this.numberArr.push('3')
        }
        if(this.number4.isDown){
            this.numberArr.push('4')
        }
        if(this.number5.isDown){
            this.numberArr.push('5')
        }
        if(this.number6.isDown){
            this.numberArr.push('6')
        }
        if(this.number7.isDown){
            this.numberArr.push('7')
        }
        if(this.number8.isDown){
            this.numberArr.push('8')
        }
        if(this.number9.isDown){
            this.numberArr.push('9')
        }
    }

    // Backspace
    if(this.backspace.isDown){
        this.numberArr.pop()
    }

    // Enter
    if(this.enter.isDown){
        this.checkAnswer()
        if(this.correctAnswer){
            // Score +10
            this.scoreTmp += 10
            // continue to world-scene
            this.scene.stop('question-scene')
            this.scene.resume('world-scene', {score: this.scoreTmp, health: this.health})
        }else{
            // Health -1
            this.healthTmp += 1
            this.scene.stop('question-scene')
            this.scene.resume('world-scene', {score: this.score, health: this.healthTmp})
        }
    }


    this.number = parseInt(this.numberArr.join(''))

    // Show number on screen
    // @ts-ignore
    this.resultText.setText(this.number)
    const textHalfWidth = this.resultText.width * 0.5
    this.resultText.setX(this.gameHalfWidth - textHalfWidth)
    event.stopPropagation()
  }
}