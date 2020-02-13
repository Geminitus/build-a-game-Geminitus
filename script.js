/* globals Keyboarder Image */

const canvas = document.querySelector('#display')
const ctx = canvas.getContext('2d')

const background = new Image()
background.src = 'stars-game-background.png'
let starsY = 5400
const starsDy = -1.75

class Game {
  constructor () {
    this.width = canvas.width
    this.height = canvas.height
    this.entities = []
    this.entities = this.entities.concat(createEnemy(this))
    this.entities = this.entities.concat(new Player(this))
    const tick = () => {
      this.update()
      this.draw(ctx, this.width, this.height)
      window.requestAnimationFrame(tick)
    }
    tick()
  }

  update () {
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update()
    }
  }

  draw (ctx, width, height) {
    ctx.clearRect(0, 0, width, height)
    if (starsY <= 0) {
      ctx.drawImage(background, 0, starsY + background.height, background.width, canvas.height, 0, 0, canvas.width, canvas.height)
    }
    if (starsY <= -5500) {
      starsY = 5500 + starsDy
    }
    ctx.drawImage(background, 0, starsY, background.width, canvas.height, 0, 0, canvas.width, canvas.height)
    starsY += starsDy
    for (let i = 0; i < this.entities.length; i++) {
      ctx.fillStyle = this.entities[i].color
      ctx.fillRect(this.entities[i].x, this.entities[i].y, this.entities[i].width, this.entities[i].height)
    }
  }

  addEntity (entity) {
    this.entities.push(entity)
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
  constructor (x, game) {
    this.x = x
    this.y = 0
    this.dx = 0
    this.dy = 1
    this.color = 'red'
    this.width = 10
    this.height = 10
  }

  update () {
    this.y += this.dy
    this.x += this.dx
  }
}

function createEnemy () {
  const enemy = []
  for (let i = 1; i < 11; i++) {
    const x = 50 * i
    enemy.push(new Enemy(x))
  }
  return enemy
}

class Bullet {
  constructor (x, y) {
    this.keyboarder = Keyboarder
    this.x = x
    this.y = y
    this.dy = 2
    this.width = 3
    this.height = 8
    this.color = '#61FF7E'
  }

  update () {
    this.y += this.dy
  }
}

class Player {
  constructor (game) {
    this.game = game
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
    this.dx = 0
    this.dy = 0
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT) || this.keyboarder.isDown(this.keyboarder.KEYS.A)) {
      this.dx = -2
    } if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT) || this.keyboarder.isDown(this.keyboarder.KEYS.D)) {
      this.dx = 2
    } if (this.keyboarder.isDown(this.keyboarder.KEYS.UP) || this.keyboarder.isDown(this.keyboarder.KEYS.W)) {
      this.dy = -1.75
    } if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN) || this.keyboarder.isDown(this.keyboarder.KEYS.S)) {
      this.dy = 1.75
    }
    if (this.x + this.dx >= (canvas.width - this.width)) {
      this.x = 0
    } else if (this.x + this.dx <= 0) {
      this.x = canvas.width - this.width
    } else if (this.y + this.dy <= 300) {
      this.y = 300
    } else if (this.y + this.height >= 599) {
      this.y = canvas.height - this.height
    }
    this.x += this.dx
    this.y += this.dy
    if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
      const bullet = new Bullet(this.x, this.y)
      this.game.addBody(bullet)
    }
  }
}
window.addEventListener('load', function () {
  new Game()
})
