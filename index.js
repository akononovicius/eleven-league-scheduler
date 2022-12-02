let league = {
    n_humans: 0,
    n_teams: 0,
    teams: [],
    game_results: [],
    points: [],
    schedule: [],
    week: 0,
    resolved: 0,
};

let refresh_flag = true;

function switch_card(to_card) {
    document.querySelectorAll(".card").forEach((elem) => {
        elem.style.display = "none";
    });
    document.getElementById(to_card).style.display = "block";
}
switch_card("game-setup-card");
