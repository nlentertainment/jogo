export default class finalFeliz extends Phaser.Scene {
  constructor () {
    super('finalFeliz')
  }

  preload () {
    this.load.image('final', './assets/final.png')
  }

  create () {
    // Adiciona o texto de parabéns e a possibilidade de reiniciar o jogo
    this.add.image(400, 375, 'final')
    this.mensagem = this.add.text(100, 50, '', {
      fontSize: '32px',
      fill: '#fff',
      fontFamily: 'Courier New'
    })
      .setInteractive()
      .on('pointerdown', () => {
        location.reload()
      })

    // Inicializa o Google Sign-In
    google.accounts.id.initialize({
      client_id: '366879661071-i20f4pioa4lfaauil8rp6pmopo2mcj2u.apps.googleusercontent.com',
      callback: (res) => {
        if (res.error) {
          console.error(res.error)
        } else {
          globalThis.game.jwt = jwtDecode(res.credential)
          this.mensagem.setText(`Parabéns, ${globalThis.game.jwt.given_name}!`)

          axios.post('https://feira-de-jogos.dev.br/api/v2/credit', {
            product: 10, // id do jogo cadastrado no banco de dados da Feira de Jogos
            value: 500 // crédito em tijolinhos (coloquei 500, confirmar com professor depois)
          }, {
            headers: {
              Authorization: `Bearer ${res.credential}`
            }
          })
            .then(function (response) {
              console.log(response)
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      }
    })

    // Exibe o prompt de login
    google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        google.accounts.id.prompt()
      }
    })
  }

  update () { }
}