let current_version = 230113;
let league = null;

let refresh_flag = true;

function reset_league() {
    league = {
        version: current_version,
        n_humans: 0,
        n_teams: 0,
        teams: [],
        game_results: [],
        points: [],
        schedule: [],
        week: 0,
        resolved: 0,
    };
    window.localStorage.setItem("league", JSON.stringify(league));
}

function switch_card(to_card) {
    document.querySelectorAll(".card").forEach((elem) => {
        elem.style.display = "none";
    });
    document.getElementById(to_card).style.display = "block";
}

league = JSON.parse(window.localStorage.getItem("league"));
let reset_choice = true;
if (league !== null && league.n_humans > 0) {
    reset_choice = false;
    if (league.version !== current_version) {
        reset_choice = prompt(
            "It seems that there was an update, which breaks the compatability with your saved League. Press [OK], if you are fine with a reset, otherwise press [Cancel] and take note of the league standings. Sorry!"
        );
    }
}
if (reset_choice) {
    reset_league();
    switch_card("game-setup-card");
} else {
    switch_card("schedule-card");
}
