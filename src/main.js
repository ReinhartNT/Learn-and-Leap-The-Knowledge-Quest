import Phaser from 'phaser'

import HelloWorldScene from './HelloWorldScene'
import WorldScene from './WorldScene'

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
	scene: [WorldScene],
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	}
}

export default new Phaser.Game(config)
