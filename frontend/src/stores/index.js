import { action, extendObservable } from 'mobx'
import request from 'superagent'
import { toast } from 'react-toastify'

class Store {
  constructor() {
    extendObservable(this, {
      loading: true,
      widgets: {
        teams: true,
        stats: false,
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

  toggleWidget = action('Set displayed widgets', name => {
    this.widgets[name] = !this.widgets[name]
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
        this.tempScores[index] = String(score)
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

  sendUpdate = action('Send update', data => {
    request
      .post(`//${window.location.hostname}:3001/update-data`)
      .set('Content-Type', 'application/json')
      .send(data)
      .end((err, res) => {
        if (err) toast.error(err.message || 'An unexpected error occurred')
      })
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

  updateStats = action('Update stats', () => {
    // let stats = this.state.data.stats.slice()
    // stats[index].values[team_index] = value
    // var data = {
    //   type: 'stats',
    //   data: stats
    // }
    //
    // this.sendUpdate(data)
  })
}

export default new Store()
