export default class abertura extends Phaser.Game {
  constructor () {
    super('abertura')
  }

    preload() {
      this.load.image('fundo', './assets/fundo.png')
    }
    create() {
      this.add.image(400,255,'fundo')
        .setInteractive()
        .on('pointerdown', () => {
          this.game.scene.stop('abertura')
          this.game.scene.start('sala')
        })
      }

    update(){
    }
}
