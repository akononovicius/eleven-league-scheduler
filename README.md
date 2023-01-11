# Eleven League Scheduler

JavaScript app which generates schedules for board game
[Eleven](https://boardgamegeek.com/boardgame/329716/eleven-football-manager-board-game).
Currently it supports Standard League mode (6 weeks) and Variant 
Epic League mode
(10 weeks). It also allows for player vs player matches, and it resolves
matches between non-human opponents.

Currently, it doesn't support [Official Epic League
mode](https://boardgamegeek.com/thread/3001927/article/41487578#41487578),
but it may be implemented some time in the future.

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

Matches between non-human teams are resolved by rolling two Opponent dice
(of respective colors) and one standard six-sided die. Opponent dice rolls
determine number of goals scored for each team, while the standard die
slightly modifies the results.

If non-human teams come from different divisions (e.g., "Division 3" and
"Division 3/2"), then team from a higher division scores an additional
goal.

Also, red teams score additional goal if the standard die rolled 4 or more.
Green team subtracts one goal if the standard die rolled 3 or less
(they score at least 0 goals).

Blue team changes their "behavior" depending on their opponent. Against
green team they can potentially score additional goal (as if they were a red
team). Against red team they can potentially loose a goal (as if they were a
green team).

## Epic League variant

Original rule book is pretty vague about how the opponent deck should be
built when playing with the Epic League variant. After a while an official
explanation on how to do it appeared on the [Board Game Geek
forums](https://boardgamegeek.com/thread/3001927/article/41487578#41487578),
but, personally, I do not like the official variant that much. I feel that
there is just a minor difference between the divisions this way. So, I have
decided to stay with my initial implementation of the Epic League.

As implemented, Epic League can be played in two divisions. The lower
(second) division is built from 3, 3/2 and 2/1 division opponent team decks.
The higher (first) division is built from 3/2, 2/1 and 1 division opponent
team decks. Either way first place three hardest opponent cards (from 2/1 or
1 division deck), then four medium opponent cards (from 3/2 or 2/1
respectively) and, finally, three easiest opponent cards (from 3 or 3/2
respectively).

For example, if you play in the first division, then first you will face 3
opponents from 3/2 deck, then 2 opponents from 2/1 deck. After these five
opponents do the winter break. Then face the other 2 opponents from 2/1
deck, and finally 3 opponents from the 1 deck.

## Making your own schedules

Tools directory includes `make_schedule.js` file. It might be useful for
generating other schedules. Schedules used in the app are cached, because
generating schedules in some cases might be slow.
