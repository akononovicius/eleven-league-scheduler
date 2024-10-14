# Full Season App

This app generates a full season schedule for a league of any size. All the
teams will play home and away against every other team. Also unlike the
parent app, this app does not respect "play weaker teams first" rule. You
might be unlucky and get a strong opponent during the first week!

This app has almost no configuration (but this might change in the future):
you have to use custom teams (although you are allowed to load Eleven
teams), all games are shown at once, the matches are not auto-resolved (you
need to click), and the modified rolls are used resolve matches between
non-human teams.

This app uses slightly different language for classifying non-human teams.
They still come in the usual three color types (red, green and blue), but
the division classification is replaced by "World class" / "Strong team" /
"Normal team" / "Relegation material" classification. This replacement was
made to allow greater variation in non-human team strengths.

To account for a possible greater variation in team strengths the "modified
rolls" match resolution variant is further modified. First important change
is that goals are treated as opportunities (roll standard die, on a roll of
4+ the goal is scored). The second change is that now the stronger teams get
additional opportunities based on the difference in team strength rank. So,
if the "World class" team plays "Normal team", the "World class" team would
get 2 additional opportunities (not 1 as per the original rules).

**Note:** In theory, the leagues managed by the Full Season App, do not
interfere with the leagues managed by the Eleven Scheduler App.
