let current_version = 230518;

let league = null;
let league_name = "full-league";

let refresh_schedule = false;
let refresh_setup = true;

function reset_league() {
    league = {
        version: current_version,
        ready: false,
        team_names: [],
        schedule: [],
        game_results: [],
        won: [],
        drew: [],
        lost: [],
        points: [],
        scored: [],
        conceded: [],
        tie_break: [],
    };
    window.localStorage.setItem(league_name, JSON.stringify(league));
}

function switch_card(to_card) {
    document.querySelectorAll(".card").forEach((elem) => {
        elem.style.display = "none";
    });
    document.getElementById(to_card).style.display = "block";
}

(() => {
    league = JSON.parse(window.localStorage.getItem(league_name));
    let reset_flag = true;
    if (league !== null) {
        reset_flag = false;
        if (league.version !== current_version) {
            reset_flag = confirm(
                "It seems that there was an update, which breaks the compatability with your saved League. Press [OK], if you are fine with a reset, otherwise press [Cancel] and take note of the league standings. Sorry!"
            );
        }
    }
    if (reset_flag) {
        reset_league();
        refresh_schedule = false;
        refresh_setup = true;
        switch_card("setup-card");
    } else {
        if (league.ready) {
            refresh_schedule = true;
            refresh_setup = false;
            switch_card("schedule-card");
        } else {
            refresh_schedule = false;
            refresh_setup = true;
            switch_card("setup-card");
        }
    }
})();

(() => {
    function get_team_type_class(type) {
        if (type == 0) {
            return "red-team";
        }
        if (type == 1) {
            return "blue-team";
        }
        if (type == 2) {
            return "green-team";
        }
        return "human-team";
    }

    function render_single_game(game) {
        let main = document.createElement("div");
        main.classList.add("row", "align-items-center");

        let home_team = document.createElement("div");
        home_team.classList.add(
            "col",
            "col-5",
            "text-end",
            get_team_type_class(league.team_types[game["home"]])
        );
        home_team.innerText = league.team_names[game["home"]];
        main.appendChild(home_team);

        let result = document.createElement("div");
        result.classList.add("col", "col-2", "text-center");
        let result_btn = document.createElement("button");
        result_btn.classList.add("btn", "btn-secondary");
        let game_result = get_result(game["home"], game["away"]);
        if (game_result[0] == -1) {
            result_btn.id = `enter-match-${game["home"]}-${game["away"]}`;
            result_btn.title = "Enter match result";
            result_btn.innerText = "*:*";
        } else {
            result_btn.id = `edit-match-${game["home"]}-${game["away"]}`;
            result_btn.title = "Edit match result";
            result_btn.innerText = `${game_result[0]}:${game_result[1]}`;
        }
        result.appendChild(result_btn);
        main.appendChild(result);

        let away_team = document.createElement("div");
        away_team.classList.add(
            "col",
            "col-5",
            "text-start",
            get_team_type_class(league.team_types[game["away"]])
        );
        away_team.innerText = league.team_names[game["away"]];
        main.appendChild(away_team);

        return main;
    }

    function render_schedule() {
        let n_weeks = league.schedule.length;

        let game_list = document.getElementById("game-list");
        for (let week = 0; week < n_weeks; week = week + 1) {
            let header = document.createElement("h5");
            header.innerText = `Week ${week + 1}`;
            game_list.appendChild(header);
            league.schedule[week].forEach((game) => {
                if (
                    game["home"] < league.team_names.length &&
                    game["away"] < league.team_names.length
                ) {
                    let elem = render_single_game(game);
                    game_list.appendChild(elem);
                }
            });
        }

        document.querySelectorAll("#game-list .btn").forEach((elem) => {
            elem.addEventListener("click", resolve);
        });
    }

    function points_add(id, result) {
        league.points[id] =
            league.points[id] +
            3 * (result[0] > result[1]) +
            (result[0] == result[1]);
        if (result[0] > result[1]) {
            league.won[id] = league.won[id] + 1;
        } else if (result[0] == result[1]) {
            league.drew[id] = league.drew[id] + 1;
        } else {
            league.lost[id] = league.lost[id] + 1;
        }
        league.scored[id] = league.scored[id] + result[0];
        league.conceded[id] = league.conceded[id] + result[1];
    }

    function points_subtract(id, result) {
        league.points[id] =
            league.points[id] -
            3 * (result[0] > result[1]) -
            (result[0] == result[1]);
        if (result[0] > result[1]) {
            league.won[id] = league.won[id] - 1;
        } else if (result[0] == result[1]) {
            league.drew[id] = league.drew[id] - 1;
        } else {
            league.lost[id] = league.lost[id] - 1;
        }
        league.scored[id] = league.scored[id] - result[0];
        league.conceded[id] = league.conceded[id] - result[1];
    }

    function resolve_ai_match(id_1, id_2) {
        function convert_attempts(n) {
            let goals = 0;
            for (let i = 0; i < n; i += 1) {
                goals += Math.random() < 0.5;
            }
            return goals;
        }
        const TYPES = ["011333", "001133", "001113"];
        let team_1_type = league.team_types[id_1];
        let team_1_division = league.team_divs[id_1];
        let team_2_type = league.team_types[id_2];
        let team_2_division = league.team_divs[id_2];
        // interpretting colored die roll
        let roll_attempts_home = Math.floor(Math.random() * 6);
        let roll_attempts_away = Math.floor(Math.random() * 6);
        let attempts_home = parseInt(TYPES[team_1_type][roll_attempts_home]);
        let attempts_away = parseInt(TYPES[team_2_type][roll_attempts_away]);
        // home advantage
        let roll_home = Math.ceil(Math.random() * 6);
        if (roll_home > 3) {
            attempts_home = attempts_home + 1;
        }
        // type advantage (standard roll)
        let roll_standard = Math.ceil(Math.random() * 6);
        if (
            (team_1_type == 0 || (team_1_type == 1 && team_2_type == 2)) &&
            roll_standard > 3
        ) {
            attempts_home = attempts_home + 1;
        }
        if (
            (team_2_type == 0 || (team_2_type == 1 && team_1_type == 2)) &&
            roll_standard > 3
        ) {
            attempts_away = attempts_away + 1;
        }
        if (
            (team_1_type == 2 || (team_1_type == 1 && team_2_type == 0)) &&
            roll_standard < 4
        ) {
            attempts_home = Math.max(attempts_home - 1, 0);
        }
        if (
            (team_2_type == 2 || (team_2_type == 1 && team_1_type == 0)) &&
            roll_standard < 4
        ) {
            attempts_away = Math.max(attempts_away - 1, 0);
        }
        // division advantage
        if (team_1_division < team_2_division) {
            attempts_home = attempts_home + 1;
        }
        if (team_2_division < team_1_division) {
            attempts_away = attempts_away + 1;
        }
        // ---
        let goals_home = convert_attempts(attempts_home);
        let goals_away = convert_attempts(attempts_away);
        return [goals_home, goals_away];
    }

    function resolve(event) {
        let elem_id = event.target.id.split("-");
        let id_1 = parseInt(elem_id[2]);
        let id_2 = parseInt(elem_id[3]);
        let is_human =
            league.team_types[id_1] == 3 || league.team_types[id_2] == 3;
        let previous_result = get_result(id_1, id_2);
        let was_resolved = previous_result[0] >= 0;
        if (!is_human && was_resolved) {
            return false;
        }
        let result = null;
        if (!is_human) {
            result = resolve_ai_match(id_1, id_2);
        } else {
            try {
                result = prompt("Match result:", "0:0")
                    .split(":")
                    .map((v) => Math.abs(parseInt(v)));
            } catch (err) {
                return false;
            }
        }
        if (
            result == null ||
            result.length != 2 ||
            isNaN(result[0]) ||
            isNaN(result[1])
        ) {
            return false;
        }
        if (was_resolved) {
            points_subtract(id_1, previous_result);
            points_subtract(id_2, previous_result.reverse());
        } else {
            league.resolved = league.resolved + 2;
        }
        set_result(id_1, id_2, result);
        points_add(id_1, result);
        points_add(id_2, result.reverse());

        refresh_schedule = true;
    }

    function clear_ranking() {
        let body = document.getElementById("rankings");
        while (body.firstChild) {
            body.removeChild(body.firstChild);
        }
    }

    function clear_schedule() {
        let body = document.getElementById("game-list");
        while (body.firstChild) {
            body.removeChild(body.firstChild);
        }
    }

    function rank_teams(
        team_names,
        points,
        scored_goals,
        conceded_goals,
        tie_break
    ) {
        return team_names
            .map((item, index) => [
                item,
                index,
                points[index],
                scored_goals[index],
                conceded_goals[index],
                tie_break[index],
            ])
            .sort(
                (
                    [, , points_1, scored_1, conceded_1, tie_1],
                    [, , points_2, scored_2, conceded_2, tie_2]
                ) => {
                    if (points_1 == points_2) {
                        let goal_diff_1 = scored_1 - conceded_1;
                        let goal_diff_2 = scored_2 - conceded_2;
                        if (goal_diff_1 == goal_diff_2) {
                            if (scored_1 == scored_2) {
                                return tie_2 - tie_1;
                            }
                            return scored_2 - scored_1;
                        }
                        return goal_diff_2 - goal_diff_1;
                    }
                    return points_2 - points_1;
                }
            )
            .map(([item]) => item);
    }

    function get_rank_elem(id) {
        let body = document.createElement("div");
        body.classList.add("row");

        let team_name = document.createElement("div");
        team_name.classList.add(
            "col",
            "col-5",
            "team-name",
            get_team_type_class(league.team_types[id])
        );
        team_name.innerText = league.team_names[id];
        body.appendChild(team_name);

        let w_d_l = document.createElement("div");
        w_d_l.classList.add("col", "col-3");
        w_d_l.innerText = `${league.won[id]}-${league.drew[id]}-${league.lost[id]}`;
        body.appendChild(w_d_l);

        let points = document.createElement("div");
        points.classList.add("col", "col-2");
        points.innerText = `${league.points[id]}`;
        body.appendChild(points);

        let goals = document.createElement("div");
        goals.classList.add("col", "col-2");
        goals.innerText = `${league.scored[id]}:${league.conceded[id]}`;
        body.appendChild(goals);

        return body;
    }

    function render_ranking() {
        let ranking_order = rank_teams(
            Array(league.team_names.length)
                .fill(null)
                .map((v, i) => i),
            league.points,
            league.scored,
            league.conceded,
            league.tie_break
        );

        let body = document.createElement("div");
        body.classList.add("row");

        let header = document.createElement("h5");
        header.classList.add("card-title", "text-center");
        header.innerText = "Tournament Table";
        body.appendChild(header);

        ranking_order.forEach((v) => {
            let elem = get_rank_elem(v);
            body.appendChild(elem);
        });

        document.getElementById("rankings").appendChild(body);
    }

    function get_result(id_1, id_2) {
        let which = id_1 > id_2 ? 1 : 0;
        return [
            league.game_results[which][id_1][id_2],
            league.game_results[which][id_2][id_1],
        ];
    }

    function set_result(id_1, id_2, result) {
        let which = id_1 > id_2 ? 1 : 0;
        league.game_results[which][id_1][id_2] = result[0];
        league.game_results[which][id_2][id_1] = result[1];
    }

    function refresh_view() {
        if (league.ready && refresh_schedule) {
            refresh_schedule = false;

            clear_schedule();
            render_schedule();

            clear_ranking();
            render_ranking();

            window.localStorage.setItem(league_name, JSON.stringify(league));
        }
        setTimeout(refresh_view, 100);
    }
    setTimeout(refresh_view, 100);

    document.getElementById("reset-league").addEventListener("click", () => {
        let reply = confirm("Do you want to reset the league?");
        if (reply) {
            window.localStorage.removeItem(league_name);
            reset_league();
            refresh_schedule = false;
            refresh_setup = true;
            switch_card("setup-card");
        }
    });
})();
