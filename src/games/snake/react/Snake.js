export const Direction = {
  'RIGHT': 'ArrowRight',
  'LEFT': 'ArrowLeft',
  'UP': 'ArrowUp',
  'DOWN': 'ArrowDown',
}

class Snake {

  constructor (snake) {
    const len = snake.length
    this.head = snake[len - 1]
    this.tail = snake[0]
    this.body = snake.slice(1, len - 1)
  }

  getSnake = () => {
    return [this.tail, ...this.body, this.head]
  }

  moving = (direction) => {
    let nextHead
    switch (direction) {
      case Direction.DOWN:
        nextHead = [this.head[0], this.head[1] - 1]
        break
      case  Direction.UP:
        nextHead = [this.head[0], this.head[1] + 1]
        break
      case Direction.LEFT:
        nextHead = [this.head[0] - 1, this.head[1]]
        break
      default:
        nextHead = [this.head[0] + 1, this.head[1]]
    }
    this.body = [...this.body, this.head]
    this.head = nextHead
    this.tail = this.body.shift()
  }
}

export default Snake