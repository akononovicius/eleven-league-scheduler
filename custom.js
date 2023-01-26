(() => {
    function render_custom_team_form(team, id) {
        let html_main = `<div class="input-group mb-3">
                    <input id="team-name-${id}" type="text" class="form-control" placeholder="${team.name}">`;
        let html_selectors = "";
        if (team.type != 3) {
            html_selectors = `<select id="team-type-${id}" class="form-select">
                        <option value="0" ${
                            team.type == 0 ? "selected" : ""
                        }>Red</option>
                        <option value="1" ${
                            team.type == 1 ? "selected" : ""
                        }>Blue</option>
                        <option value="2" ${
                            team.type == 2 ? "selected" : ""
                        }>Green</option>
                    </select>
                    <select id="team-div-${id}" class="form-select">
                        <option value="1" ${
                            team.division == 1 ? "selected" : ""
                        }>Division 1</option>
                        <option value="2" ${
                            team.division == 2 ? "selected" : ""
                        }>Division 2/1</option>
                        <option value="3" ${
                            team.division == 3 ? "selected" : ""
                        }>Division 3/2</option>
                        <option value="4" ${
                            team.division == 4 ? "selected" : ""
                        }>Division 3</option>
                    </select>`;
        } else {
            html_selectors = `<select id="team-type-${id}" class="form-select" disabled="disabled">
                        <option value="3" selected>Human</option>
                    </select>
                    <select id="team-div-${id}" class="form-select" disabled="disabled">
                        <option value="0" selected>Human</option>
                    </select>`;
        }
        let html_close = "</div>";
        document.getElementById("custom-team-body").innerHTML +=
            html_main + html_selectors + html_close;
    }

    function render_custom_league_form() {
        document.getElementById("custom-team-body").innerHTML = "";
        league.teams.forEach((v, i) => render_custom_team_form(v, i));
    }

    function refresh_customize_form() {
        if (refresh_custom_flag) {
            if (league.ready === false) {
                render_custom_league_form();
            }
            window.localStorage.setItem("league", JSON.stringify(league));
            refresh_custom_flag = false;
        }
        setTimeout(refresh_customize_form, 100);
    }
    setTimeout(refresh_customize_form, 100);

    document
        .getElementById("reset-custom-league")
        .addEventListener("click", () => {
            let reply = confirm("Do you want to reset the league?");
            if (reply) {
                window.localStorage.removeItem("league");
                reset_league();
                switch_card("game-setup-card");
            }
        });
    document
        .getElementById("setup-custom-league")
        .addEventListener("click", () => {
            league.teams = league.teams.map((v, i) => {
                let name = document.getElementById(`team-name-${i}`).value;
                let type = document.getElementById(`team-type-${i}`).value;
                let div = document.getElementById(`team-div-${i}`).value;
                return {
                    name: name.length > 0 ? name : v.name,
                    type: type,
                    division: div,
                };
            });
            league.ready = true;
            refresh_flag = true;
            switch_card("schedule-card");
        });
})();
