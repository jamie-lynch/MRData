# Messages

** Score Event **

```
{
  type: 'event',
  data: {
    type: 'score',
    data: {
      score: 10,
      player_id: 0,
      team: 'LBO',
      type: 'try'
      display: 'Try',
      stats: 'tries',
      time: 1518298214214
    }
  }
}
```

** Card Event **

```
{
  type: 'event',
  data: {
    type: 'yellow_card',
    data: {
      player_id: 0,
      team: 'LBO',
      stats: 'yellow_cards',
      time: 1518298214214
    }
  }
}
```

** Team Data **

```
{
  type: team,
  data: {
    teams: [
      {
        name: string,
        shortname: string
        colour: hex
      },
      {

      }
    ],
    lineups: [
      [
        {
          player_id: int,
          firstname: string,  // Team 1
          surname: string
        }
      ], [
        {
          player_id: int,
          firstname: string,  // Team 2
          surname: string
        }
      ]
    ]
  }
}
```
