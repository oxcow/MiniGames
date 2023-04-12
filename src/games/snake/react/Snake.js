export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export const Direction = {
  'RIGHT': 'ArrowRight',
  'LEFT': 'ArrowLeft',
  'UP': 'ArrowUp',
  'DOWN': 'ArrowDown',
}

const DirectionCode = {
  'ArrowRight': 1,
  'ArrowLeft': -1,
  'ArrowUp': 2,
  'ArrowDown': -2,
}

class Snake {
  direction = Direction.RIGHT;

  constructor(tail, head, body = []) {
    this.head = head;
    this.tail = tail;
    this.body = body;
  }

  getSnake = () => {
    return [this.tail, ...this.body, this.head];
  }

  changeDirection = (toDirection) => {
    const map = new Map();
    for (let [key, value] of Object.entries(Direction)) {
      map.set(value, key);
    }
    const targetDirection = Direction[map.get(toDirection)];
    if (targetDirection !== this.direction &&
      DirectionCode[targetDirection] + DirectionCode[this.direction] !== 0) {
      this.direction = targetDirection;
    }
  }

  moveAndEat = (food) => {
    let nextHead;
    let eaten = false;
    switch (this.direction) {
      case Direction.DOWN:
        nextHead = new Point(this.head.x, this.head.y - 1);
        break;
      case  Direction.UP:
        nextHead = new Point(this.head.x, this.head.y + 1);
        break;
      case Direction.LEFT:
        nextHead = new Point(this.head.x - 1, this.head.y);
        break;
      default:
        nextHead = new Point(this.head.x + 1, this.head.y);
    }
    if (nextHead && nextHead.x === food.x && nextHead.y === food.y) {
      this.body.push(this.head);
      this.head = nextHead;
      eaten = true;
    } else {
      this.body.push(this.head);
      this.tail = this.body.shift();
      this.head = nextHead;
    }
    console.debug("snake is ====> ", this.getSnake());
    return [this, eaten];
  }
}

export default Snake;