import { action, extendObservable } from 'mobx'
import request from 'superagent'
import { toast } from 'react-toastify'

class Store {
  constructor() {
    extendObservable(this, {
      loading: true,
      widgets: {
        teams: true,
        stats: true,
        lineups: false
      },
      teams: [
        {
          name: 'Loughborough',
          shortName: 'LBO',
          color: '#782b73'
        },
        {
          name: 'Durham',
          shortName: 'DUR',
          color: '#29b6ee'
        }
      ],
      scores: [10, 3],
      tempScores: [null, null],
      stats: {
        tries: {
          name: 'tries',
          label: 'Tries',
          values: [1, 0],
          type: 'absolute',
          increment: 1,
          score: 5,
          _event: 'Try'
        },
        conversions: {
          name: 'conversions',
          label: 'Conversions',
          values: [1, 0],
          type: 'absolute',
          increment: 1,
          score: 5,
          _event: 'Conversion'
        },
        penalties: {
          name: 'penalties',
          label: 'Penalties',
          values: [1, 0],
          type: 'absolute',
          increment: 1,
          score: 3,
          _event: 'Penalty'
        },
        drop_goals: {
          name: 'drop_goals',
          label: 'Drop Goals',
          values: [0, 1],
          type: 'absolute',
          increment: 1,
          score: 3,
          _event: 'Drop Goal'
        },
        yellow_cards: {
          name: 'yellow_cards',
          label: 'Yellow Cards',
          values: [0, 1],
          type: 'absolute',
          increment: 1,
          _event: 'Yellow Card'
        },
        red_cards: {
          name: 'red_cards',
          label: 'Red Cards',
          values: [0, 0],
          type: 'absolute',
          increment: 1,
          _event: 'Red Card'
        },
        possession: {
          name: 'possession',
          label: 'Possession',
          values: [55, 45],
          type: 'percentage',
          increment: 5
        }
      },
      tempStats: {},
      lineups: [
        {
          1: { number: 1, first: 'Jamie', last: 'Lynch', active: true },
          2: {
            number: 2,
            first: 'Jack',
            last: 'Connor-Richards',
            active: true
          },
          3: { number: 3, first: 'Andy', last: 'Clark', active: true },
          4: { number: 4, first: 'Dan', last: 'Leedham', active: false }
        },
        {
          1: { number: 1, first: 'Alastair', last: 'Sutton', active: true },
          2: { number: 2, first: 'Stephen', last: 'Maughan', active: true },
          3: { number: 3, first: 'Matt', last: 'Oakley', active: true },
          4: { number: 4, first: 'Matt', last: 'James', active: false }
        }
      ]
    })
  }

  setInitialState = action('Set initial stage', ws => {
    this.handleWebsocketMessage(ws)

    request.get(`//${window.location.hostname}:3001/get-data`).end(
      action('Update the data', (err, res) => {
        if (err) toast.error(err.message || 'An unexpected error occurred')

        let data = res.body

        this.scores = data.score

        this.loading = false
      })
    )
  })

  handleWebsocketMessage = action('Listen for messages', ws => {
    ws.onmessage = action('Handle messages', received => {
      var msg = JSON.parse(received.data)
      var { type, data } = msg

      switch (type) {
        case 'score':
          this.scores = data
          this.tempScores = [null, null]
          toast.info('Scores Updated')
          break
        default:
          break
      }
    })
  })

  sendUpdate = action('Send update', data => {
    request
      .post(`//${window.location.hostname}:3001/update-data`)
      .set('Content-Type', 'application/json')
      .send(data)
      .end((err, res) => {
        if (err) toast.error(err.message || 'An unexpected error occurred')
      })
  })

  updateScore = action('Update score', e => {
    let type = e.type
    let score = Number(e.target.value)
    if (Number.isNaN(score)) {
      return true
    }
    let name = e.target.name
    let index = name.split('-')[1]

    switch (type) {
      case 'blur':
        let scores = this.scores.slice()
        scores[index] = score
        this.sendUpdate({ type: 'score', data: scores })
        break
      case 'change':
        this.tempScores[index] = String(score)
        break
      case 'keypress':
        if (e.charCode === 13) {
          e.target.blur()
        } else {
          return true
        }
        break
      default:
        break
    }
  })

  updateStats = action('Update stats', e => {
    let type = e.type
    let split = e.target.name.split('-')
    let name = split[0]
    let index = split[2]
    let value = Number(e.target.value)
    if (Number.isNaN(value)) {
      return true
    }

    let temp
    let tempStats
    switch (type) {
      case 'click':
        temp = [null, null]
        let stat = this.stats[name]
        temp[index] = stat.values[index] + stat.increment
        tempStats = Object.assign({}, this.tempStats, { [name]: temp })
        this.tempStats = tempStats
        this.sendUpdate({ type: 'stat-reset', data: this.tempStats[name] })
        break
      case 'change':
        temp = [null, null]
        temp[index] = value
        tempStats = Object.assign({}, this.tempStats, { [name]: temp })
        this.tempStats = tempStats
        break
      case 'blur':
        this.sendUpdate({ type: 'stat-reset', data: this.tempStats[name] })
        break
      case 'keypress':
        if (e.charCode === 13) {
          e.target.blur()
        } else {
          return true
        }
        break
      default:
        break
    }
  })

  incrementStat(row, index, inc) {
    this.setState(prevState => {
      let stats = prevState.stats.slice()
      stats[row].values[index] = String(Number(stats[row].values[index]) + inc)
      this.updateStats(stats)
      return { stats }
    })
  }

  handleChange(e) {
    let row = e.target.name.split('-')[1]
    let index = e.target.name.split('-')[2]
    let value = e.target.value

    this.setState(prevState => {
      let stats = prevState.stats.slice()
      stats[row].values[index] = value
      this.updateStats(stats)
      return { stats }
    })
  }

  toggleWidget = action('Set displayed widgets', name => {
    this.widgets[name] = !this.widgets[name]
  })
}

export default new Store()
