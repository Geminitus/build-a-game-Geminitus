/* globals Keyboarder Image */

const canvas = document.querySelector('#display')
const ctx = canvas.getContext('2d')

const background = new Image()
background.src = 'stars-game-background.png'
let starsY = 5500
const starsDy = -1.75

class Game {
  constructor () {
    
  }
}

// function blurDisplay () {
//   ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
//   ctx.fillRect(0, 0, canvas.width, canvas.height)
// }

// function stars() {
//   for (let i = 0; i < 6; i++) {
//     const rng1 = Math.floor(Math.random() * canvas.width)
//     const rng2 = Math.floor(Math.random() * 4)
//     const rng3 = Math.floor(Math.random() * canvas.height)
//     ctx.fillStyle = 'rgb(255, 255, 255)'
//     ctx.fillRect(rng1, rng3, rng2, rng2)
//   }
// }

class Enemy {
  constructor () {
    this.x = 250
    this.y = 0
    this.dx = 0
    this.dy = 0
    this.color = 'red'
    this.width = 10
    this.height = 10
  }

  spawn (type) {
    if (type === 1) {
      for (let i = 1; i < 11; i++) {
        this.dy = 1
        enemy.x = 50 * i
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
      }
    }
  }
}

class Bullet {
  constructor () {
    this.keyboarder = Keyboarder
    this.x = 0
    this.y = 0
    this.dy = 2
    this.width = 3
    this.height = 8
    this.color = '#61FF7E'
  }

  draw () {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  update () {
    this.y += this.dy
  }
}

class Player {
  constructor () {
    this.keyboarder = Keyboarder
    this.x = 249
    this.y = (canvas.height - canvas.height / 5)
    this.dx = 0
    this.dy = 0
    this.color = 'aqua'
    this.width = 10
    this.height = 10
  }

  update () {
    player.dx = 0
    player.dy = 0
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT) || this.keyboarder.isDown(this.keyboarder.KEYS.A)) {
      player.dx = -2
    } if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT) || this.keyboarder.isDown(this.keyboarder.KEYS.D)) {
      player.dx = 2
    } if (this.keyboarder.isDown(this.keyboarder.KEYS.UP) || this.keyboarder.isDown(this.keyboarder.KEYS.W)) {
      player.dy = -1.75
    } if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN) || this.keyboarder.isDown(this.keyboarder.KEYS.S)) {
      player.dy = 1.75
    }
    if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
      let bullet = new Bullet()
      bullet.x = this.x
      bullet.y = this.y
      bullet.draw()
      bullet.y += bullet.dy
      bullet.update()
    }
  }

  draw () {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

const player = new Player()
const enemy = new Enemy()
function renderDisplay () {
  ctx.fillStyle = 'rgb(0,0,0)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

// function draw () {
//   ctx.clearRect(0, 0, canvas.width, canvas.height)
//   renderDisplay()
//   if (starsY <= 0) {
//     ctx.drawImage(background, 0, starsY + background.height, background.width, canvas.height, 0, 0, canvas.width, canvas.height)
//   }
//   if (starsY <= -5500) {
//     starsY = 5500 + starsDy
//   }
//   ctx.drawImage(background, 0, starsY, background.width, canvas.height, 0, 0, canvas.width, canvas.height)
//   player.draw()
//   player.update()
//   player.x += player.dx
//   player.y += player.dy
//   if (player.x + player.dx >= (canvas.width - player.width)) {
//     player.x = 0
//   } else if (player.x + player.dx <= 0) {
//     player.x = canvas.width - player.width
//   } else if (player.y + player.dy <= 300) {
//     player.y = 300
//   } else if (player.y + player.height >= 599) {
//     player.y = canvas.height - player.height
//   }
//   enemy.spawn(1)
//   enemy.y += enemy.dy
//   starsY += starsDy
//   window.requestAnimationFrame(draw)
// }
draw()
