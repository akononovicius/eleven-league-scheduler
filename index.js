let current_version = 230426;
let league = null;
let league_name = "league";

let refresh_flag = false;
let refresh_custom_flag = false;

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
    window.localStorage.setItem(league_name, JSON.stringify(league));
}

function reset_league_form() {
    document
        .querySelectorAll("#game-setup-card .player-names input[type=text]")
        .forEach((elem) => {
            elem.value = "";
        });

    document.getElementById("division-select").value = 1;

    document
        .querySelectorAll("#game-setup-card input[type=checkbox]")
        .forEach((elem) => {
            elem.checked = false;
        });
    document.getElementById("modified-resolve-checkbox").checked = true;
}

function switch_card(to_card) {
    document.querySelectorAll(".card").forEach((elem) => {
        elem.style.display = "none";
    });
    document.getElementById(to_card).style.display = "block";
}

league = JSON.parse(window.localStorage.getItem(league_name));
let reset_choice = true;
if (league !== null && league.n_humans > 0) {
    reset_choice = false;
    if (league.version !== current_version) {
        reset_choice = confirm(
            "It seems that there was an update, which breaks the compatability with your saved League. Press [OK], if you are fine with a reset, otherwise press [Cancel] and take note of the league standings. Sorry!"
        );
    }
}
if (reset_choice) {
    reset_league();
    reset_league_form();
    switch_card("game-setup-card");
} else {
    if (league.ready) {
        refresh_flag = true;
        switch_card("schedule-card");
    } else {
        refresh_custom_flag = true;
        switch_card("custom-setup-card");
    }
}
