# Eleven League Scheduler

JavaScript app which generates schedules for board game
[Eleven](https://boardgamegeek.com/boardgame/329716/eleven-football-manager-board-game).
It supports variants of the Standard mode (6 week game) and the Epic mode
(10 week game). If multiple players play the game, player vs player matches
will be arranged.

## Schedule

Schedule is made following the guidelines of the board game. Human players
are first scheduled to play against easier opponents (from lower divisions),
and only after that they play against stronger teams (from higher divisions)
and/or among themselves.

To make leagues more consistent all opponent teams are assigned opponents
each week. Some of the opponent teams will play against humans, others will
play among themselves.

Unlike in the core game, here we build leagues, which are consistent with
Solo Campaign expansion and scale consistently when playing with multiple
players. In other words, leagues in the Standard mode will always have 8
teams independent of the player count. Likewise leagues in the Epic mode
will always have 12 teams. This means that we remove as much of the
strongest opponent teams as there are human teams.

Note that in the Epic mode it is impossible to build a balanced schedule
while following the guideline of "easier opponents first". This means that
if you play Epic mode with 3 or 4 players, some of the players will face 4
easier opponents, while others will face 3. This is so, because it is
impossible to build 12 team league schedule where all players would face
just 4 or just 3 easy opponents.

## Super League mode

When playing with 4 players no player would face any of the strongest
opponents. Actually these opponents would be removed from any of our
consistent Standard or Epic mode leagues. So, when playing with 4 players
you can choose to play Super League and face the strongest opponents.

In Super League player vs player matches are played during the first three
weeks. These initial player vs player matches replace matches against
easiest opponents instead of replacing matches against the strongest
opponents.

Note that Super League can only be played in the first division and only
when playing with 4 players.

## League customization

If you check corresponding box, then you'll be able to edit team names,
their colors ("types") and respective divisions. This option may be useful
for you if you play solo scenario which has special rules regarding which
opponents you play. Or if you have made your own custom opponent deck.

Note that after you customize the teams, they will be order by their
divisions (from lowest to highest). The order of the teams will be
shuffled within the division.

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
team). Against red team they can potentially lose a goal (as if they were a
green team).

## Making your own schedules

Tools directory includes `make_schedule.js` file. It might be useful for
generating other schedules. Schedules used in the app are cached, because
generating schedules in some cases might be slow.
