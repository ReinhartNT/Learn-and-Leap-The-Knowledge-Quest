import Phaser from 'phaser'

import WorldScene from './WorldScene'
import QuestionScene from './QuestionScene'
import StartScene from './StartScene'
import GameOverScene from './GameOverScene'
import GameOverWinScene from './GameOverScene(Win)'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 1080,
	height: 468,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [StartScene, WorldScene, QuestionScene, GameOverScene, GameOverWinScene],
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	}
}

export default new Phaser.Game(config)
