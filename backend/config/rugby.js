const stats = [
  {
    name: 'yellow_cards',
    display: 'Yellow Cards',
    type: 'absolute',
    default: 0,
    increment: 1
  },
  {
    name: 'red_cards',
    display: 'Red Cards',
    type: 'absolute',
    default: 0,
    increment: 1
  },
  {
    name: 'tries',
    display: 'Tries',
    type: 'absolute',
    default: 0,
    increment: 1
  },
  {
    name: 'penalties',
    display: 'Penalties',
    type: 'absolute',
    default: 0,
    increment: 1
  },
  {
    name: 'conversions',
    display: 'Conversions',
    type: 'absolute',
    default: 0,
    increment: 1
  },
  {
    name: 'drop_kicks',
    display: 'Drop Kicks',
    type: 'absolute',
    default: 0,
    increment: 1
  },
  {
    name: 'tackles',
    display: 'Tackles',
    type: 'absolute',
    default: 0,
    increment: 1
  },
  {
    name: 'metres_made',
    display: 'Metres Made',
    type: 'absolute',
    default: 0,
    increment: 1
  },
  {
    name: 'lineouts_won',
    display: 'Lineouts Won',
    type: 'absolute',
    default: 0,
    increment: 1
  },
  {
    name: 'lineouts_lost',
    display: 'Lineouts Lost',
    type: 'absolute',
    default: 0,
    increment: 1
  },
  {
    name: 'possesion',
    display: 'Possesion',
    type: 'percentage',
    default: 0,
    increment: 5
  },
  {
    name: 'turnovers',
    display: 'Turnovers',
    type: 'absolute',
    default: 0,
    increment: 1
  }
]

const teams = [
  {
    name: 'Team 1',
    shortname: 'TM1',
    color: '#6931ba'
  },
  {
    name: 'Team 2',
    shortname: 'TM2',
    color: '#de13bd'
  }
]

const score = [0, 0]

const lineup = [
  [
    { number: 1, firstname: 'player', surname: '1' },
    { number: 2, firstname: 'player', surname: '2' },
    { number: 3, firstname: 'player', surname: '3' },
    { number: 4, firstname: 'player', surname: '4' },
    { number: 5, firstname: 'player', surname: '5' },
    { number: 6, firstname: 'player', surname: '6' },
    { number: 7, firstname: 'player', surname: '7' },
    { number: 8, firstname: 'player', surname: '8' },
    { number: 9, firstname: 'player', surname: '9' },
    { number: 10, firstname: 'player', surname: '10' },
    { number: 11, firstname: 'player', surname: '11' },
    { number: 12, firstname: 'player', surname: '12' },
    { number: 13, firstname: 'player', surname: '13' },
    { number: 14, firstname: 'player', surname: '14' },
    { number: 15, firstname: 'player', surname: '15' }
  ],
  [
    { number: 1, firstname: 'player', surname: '1' },
    { number: 2, firstname: 'player', surname: '2' },
    { number: 3, firstname: 'player', surname: '3' },
    { number: 4, firstname: 'player', surname: '4' },
    { number: 5, firstname: 'player', surname: '5' },
    { number: 6, firstname: 'player', surname: '6' },
    { number: 7, firstname: 'player', surname: '7' },
    { number: 8, firstname: 'player', surname: '8' },
    { number: 9, firstname: 'player', surname: '9' },
    { number: 10, firstname: 'player', surname: '10' },
    { number: 11, firstname: 'player', surname: '11' },
    { number: 12, firstname: 'player', surname: '12' },
    { number: 13, firstname: 'player', surname: '13' },
    { number: 14, firstname: 'player', surname: '14' },
    { number: 15, firstname: 'player', surname: '15' }
  ]
]

const events = [
  { type: 'score', subtype: 'try', display: 'Try', inc: 5, stats: 'tries' },
  {
    type: 'score',
    subtype: 'penalty',
    display: 'Penalty',
    inc: 3,
    stats: 'penalties'
  },
  // { type: 'score', display: 'Drop Kick', inc: 3, stats: 'drop_kicks' },
  // { type: 'score', display: 'Conversion', inc: 2, stats: 'conversions' },
  {
    type: 'yellow_card',
    display: 'Yellow Card',
    inc: 2,
    stats: 'yellow_cards'
  }
  // { type: 'red_card', display: 'red Card', inc: 2, stats: 'red_cards' }
]

module.exports = { stats, teams, score, lineup, events }
