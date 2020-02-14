/* globals Keyboarder Image */

const canvas = document.querySelector('#display')
const ctx = canvas.getContext('2d')

const background = new Image()
background.src = 'stars-game-background.png'
let starsY = 5400
const starsDy = -1.75
const playerModel = new Image()
playerModel.src = 'pngkey.com-spaceship-png-4392668.png'

class Game {
  constructor () {
    this.width = canvas.width
    this.height = canvas.height
    this.entities = []
    this.entities = this.entities.concat(new Player(this))
    this.ticks = 0
    this.score = 0
    const tick = () => {
      if (this.ticks % 45 === 0) {
        this.entities = this.entities.concat(new Enemy(50 + (Math.floor(Math.random() * 45)) * 10, 0, this))
      }
      this.update()
      this.draw(ctx, this.width, this.height)
      window.requestAnimationFrame(tick)
      this.ticks += 1
    }
    tick()
  }

  notColliding = (ent1) => {
    return this.entities.filter(function (ent2) { return colliding(ent1, ent2) }).length === 0
  }

  update () {
    this.entities = this.entities.filter(this.notColliding)
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update()
    }
    this.keepScore()
  }

  draw (ctx, width, height) {
    ctx.clearRect(0, 0, width, height)
    if (starsY <= 0) {
      ctx.drawImage(background, 0, starsY + background.height, background.width, canvas.height, 0, 0, canvas.width, canvas.height)
    }
    if (starsY <= -5500) {
      starsY = 5500
    }
    ctx.drawImage(background, 0, starsY, background.width, canvas.height, 0, 0, canvas.width, canvas.height)
    starsY += starsDy
    for (let i = 0; i < this.entities.length; i++) {
      if(this.entities[i].sprite === 0){
      ctx.fillStyle = this.entities[i].color
      ctx.fillRect(this.entities[i].x, this.entities[i].y, this.entities[i].width, this.entities[i].height)
      }
      else if(this.entities[i].sprite === 1) {
        ctx.drawImage(playerModel, 0, 0, playerModel.width, playerModel.height, this.entities[i].x, this.entities[i].y, this.entities[i].width, this.entities[i].height)
      }
    }
    ctx.fillStyle = 'aqua'
    ctx.font = '28px sans serif'
    ctx.fillText(`Score: ${this.score}`, 10, 30)
  }

  keepScore () {
    for (let entity of this.entities) {
      if (entity instanceof Bullet && !this.notColliding(entity)) {
        this.score += 10
      }
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

class Enemy {
  constructor (x, y, game) {
    this.sprite = 0
    this.game = game
    this.x = x
    this.y = y
    this.dx = 0
    this.dy = 1
    this.color = 'red'
    this.width = 20
    this.height = 20
  }

  update () {
    this.y += this.dy
    this.x += this.dx
    // if (Math.random() > 0.997) {
    //   const enemyBullet = (new Bullet(this.x + this.width / 2 - 1, this.y + 20, 3))
    //   this.game.addEntity(enemyBullet)
    // }
  }
}

function createEnemy (game) {
  const enemys = []
  for (let i = 0; i < 20; i++) {
    const x = 48 * i + 21
    const y = 50 * -i
    enemys.push(new Enemy(x, y, game))
  }
  return enemys
}

class Bullet {
  constructor (x, y, dy) {
    this.sprite = 0
    this.keyboarder = Keyboarder
    this.x = x
    this.y = y
    this.dy = dy
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
    this.sprite = 1
    this.game = game
    this.keyboarder = Keyboarder
    this.x = 249
    this.y = (canvas.height - canvas.height / 5)
    this.dx = 0
    this.dy = 0
    this.model = playerModel
    this.modelWidth = playerModel.width
    this.modelHeight = playerModel.height
    this.color = 'aqua'
    this.width = 30
    this.height = 40
    this.ticksSinceFired = 0
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
      if (this.game.ticks % 15 === 0) {
        const bullet = new Bullet(this.x + this.width / 2 - 1, this.y - 46, -3)
        this.game.addEntity(bullet)
      }
    }
  }
}

function colliding (ent1, ent2) {
  return !(
    ent1 === ent2 ||
        ent1.x + ent1.width < ent2.x - ent2.width ||
        ent1.y + ent1.height < ent2.y - ent2.height ||
        ent1.x - ent1.width > ent2.x + ent2.width ||
        ent1.y - ent1.height > ent2.y + ent2.height
  )
}

window.addEventListener('load', function () {
  new Game()
})
