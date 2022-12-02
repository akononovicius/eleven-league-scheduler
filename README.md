# Eleven League Scheduler

JavaScript app which generates schedules for board game
[Eleven](https://boardgamegeek.com/boardgame/329716/eleven-football-manager-board-game).
Currently it supports Standard League mode (6 weeks) and Epic League mode
(10 weeks). It also allows for player vs player matches, and it resolves
matches between non-human opponents.

## Schedule

Schedule is made following the guidelines of the board game. Human players
are first scheduled to play against easier opponents (from lower divisions),
and only after that they play against stronger teams (from higher divisions)
and/or among themselves.

To make leagues a bit more realistic all opponent teams are assigned
opponents. Some teams will play against humans, others will play among
themselves.

Note that no team plays two games in a single week. This raises an issue
when there is an odd number of human players. To resolve it this app adds
"fake" team into the mix - "Forgers End". Human players will never play
against this team, but it will play against left-over non-human teams.

"Forgers End" will have random color assigned at the start of the league. It
will be assigned to the lower division (in the Standard mode) or to the
middle division (in the Epic mode). This division is relevant when resolving
matches against other non-human teams.

## Matches between non-human teams

Matches between non-human teams are resolved by rolling Opponent die and a
standard d6 die. Opponent die rolls determine number of goals scored for
each team, while standard d6 die slightly modifies the results.

If non-human teams come from different division (e.g., "Division 3" and
"Division 3/2"), then teams from stronger division scores an additional
goal.

Red teams score additional goal if the standard die rolled 4 or more.
Green team scores subtracts one goal if the standard die rolled 3 or less
(they score at least 0 goals). When playing against green team blue team is
treated as a red team. When playing red team blue team is treated as a green
team.

## Making your own schedules

Tools directory includes `make_schedule.js` file. It might be useful for
generating other schedules. Schedules used in the app are cached, because
generating schedules in some cases might be slow.
