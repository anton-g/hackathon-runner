import { Socket } from 'socket.io'
import { SnapshotInterpolation } from '@geckos.io/snapshot-interpolation'

const SI = new SnapshotInterpolation()

export class Game {
  private sockets: { [key: string]: Socket }
  private players: { [key: string]: Player }

  constructor() {
    this.sockets = {}
    this.players = {}
    setInterval(this.update.bind(this), 1000 / 30)
  }

  addPlayer(socket: Socket, username: string) {
    this.sockets[socket.id] = socket

    this.players[socket.id] = new Player(socket.id, username)
  }

  removePlayer(socket: Socket) {
    delete this.sockets[socket.id]
    delete this.players[socket.id]
  }

  handleInput(
    socket: Socket,
    input: {
      x: number
      y: number
    },
  ) {
    if (this.players[socket.id]) {
      this.players[socket.id].setPosition(input.x, input.y)
    }
  }

  update() {
    const ps = Object.values(this.players)
    if (ps.length === 0) return

    const snapshot = SI.snapshot.create(
      ps.map((p) => ({
        x: p.x,
        y: p.y,
        id: p.id,
      })),
    )
    Object.values(this.sockets).forEach((s) => s.emit('update', snapshot))
  }
}

class Player {
  id: string
  x: number = null
  y: number = null
  private username: string
  private score: number

  constructor(id, username) {
    this.id = id
    this.username = username
    this.score = 0
    this.x = 16 * 8 - 8
    this.y = 380
  }

  setPosition(x: number, y: number) {
    this.x = x
    this.y = y
  }

  serializeForUpdate() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
    }
  }
}
