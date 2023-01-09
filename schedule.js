(() => {
    let shown_week = 0;

    function is_human_team(id) {
        let n_ai_teams =
            league.n_teams - league.n_humans - (league.n_humans % 2);
        return n_ai_teams <= id && id < n_ai_teams + league.n_humans;
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
        if (is_human_team(id_1) || is_human_team(id_2)) {
            return;
        }

        const TYPES = ["011333", "001133", "001113"];
        let team_1 = league.teams[id_1];
        let team_2 = league.teams[id_2];
        if (league.game_results[id_1][id_2] == -1) {
            let r_1 = Math.floor(Math.random() * 6);
            let r_2 = Math.floor(Math.random() * 6);
            let g_1 = parseInt(TYPES[team_1.type][r_1]);
            let g_2 = parseInt(TYPES[team_2.type][r_2]);
            if (league.modified_resolve) {
                let r_standard = Math.floor(Math.random() * 6);
                if (
                    (team_1.type == 0 ||
                        (team_1.type == 1 && team_2.type == 2)) &&
                    r_standard > 3
                ) {
                    g_1 = g_1 + 1;
                }
                if (
                    (team_2.type == 0 ||
                        (team_2.type == 1 && team_1.type == 2)) &&
                    r_standard > 3
                ) {
                    g_2 = g_2 + 1;
                }
                if (
                    (team_1.type == 2 ||
                        (team_1.type == 1 && team_2.type == 0)) &&
                    r_standard < 4
                ) {
                    g_1 = Math.max(g_1 - 1, 0);
                }
                if (
                    (team_2.type == 2 ||
                        (team_2.type == 1 && team_1.type == 0)) &&
                    r_standard < 4
                ) {
                    g_2 = Math.max(g_2 - 1, 0);
                }
                if (team_1.division < team_2.division) {
                    g_1 = g_1 + 1;
                }
                if (team_2.division < team_1.division) {
                    g_2 = g_2 + 1;
                }
            }
            league.game_results[id_1][id_2] = g_1;
            league.game_results[id_2][id_1] = g_2;
            points_add(id_1, [g_1, g_2]);
            points_add(id_2, [g_2, g_1]);
        }
    }

    function get_team_class(team) {
        let team_class = "fake-team";
        if (team.type == 0) {
            team_class = "red-team";
        } else if (team.type == 1) {
            team_class = "blue-team";
        } else if (team.type == 2) {
            team_class = "green-team";
        } else if (team.type == 3) {
            team_class = "human-team";
        }
        return team_class;
    }

    function get_ranking_html(team, points, w, d, l, s, c) {
        let team_class = get_team_class(team);
        return `<div class="row"><div class="col col-5 team-name ${team_class}">${team.name}</div><div class="col col-3 ${team_class}">${w}-${d}-${l}</div><div class="col col-2 ${team_class}">${points}</div><div class="col col-2 ${team_class}">${s}:${c}</div></div>`;
    }

    function show_rankings() {
        const dsu = (
            team_names,
            points,
            scored_goals,
            conceded_goals,
            tie_break
        ) =>
            team_names
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
                        [, idx_1, points_1, scored_1, conceded_1, tie_1],
                        [, idx_2, points_2, scored_2, conceded_2, tie_2]
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

        let ranking_order = dsu(
            Array(league.n_teams)
                .fill(null)
                .map((v, i) => i),
            league.points,
            league.scored,
            league.conceded,
            league.tie_break
        );
        let html =
            "<div class='row'><h5 class='card-title text-center'>Tournament Table</h5></div>";
        ranking_order.forEach((v) => {
            html = `${html}${get_ranking_html(
                league.teams[v],
                league.points[v],
                league.won[v],
                league.drew[v],
                league.lost[v],
                league.scored[v],
                league.conceded[v]
            )}`;
        });
        document.getElementById("rankings").innerHTML = html;
    }

    function get_game_result(id_1, id_2) {
        return [
            league.game_results[id_1][id_2],
            league.game_results[id_2][id_1],
        ];
    }

    function get_game_html(id_1, id_2) {
        let team_1 = league.teams[id_1];
        let team_class_1 = get_team_class(team_1);
        let team_2 = league.teams[id_2];
        let team_class_2 = get_team_class(team_2);
        let result = get_game_result(id_1, id_2);
        let result_string = "";
        if (result[0] == -1) {
            if (is_human_team(id_1) || is_human_team(id_2)) {
                result_string = `<button id="enter-match-${id_1}-${id_2}" class="btn btn-secondary" type="button" title="Enter match result">*:*</button>`;
            } else {
                if (!league.auto_resolve) {
                    result_string = `<button id="resolve-match-${id_1}-${id_2}" class="btn btn-secondary" type="button" title="Resolve AI match">*:*</button>`;
                } else {
                    resolve_ai_match(id_1, id_2);
                    league.resolved = league.resolved + 2;
                    result = get_game_result(id_1, id_2);
                    result_string = `${result[0]}:${result[1]}`;
                }
            }
        } else {
            if (is_human_team(id_1) || is_human_team(id_2)) {
                result_string = `<button id="edit-match-${id_1}-${id_2}" class="btn btn-secondary" type="button" title="Edit match result">${result[0]}:${result[1]}</button>`;
            } else {
                result_string = `${result[0]}:${result[1]}`;
            }
        }
        return `<div class="row align-items-center"><div class="col col-5 text-end ${team_class_1}">${team_1.name}</div><div class="col col-2 text-center">${result_string}</div><div class="col col-5 text-start ${team_class_2}">${team_2.name}</div></div>`;
    }

    function resolve(event) {
        let elem_id = event.target.id.split("-");
        let id_1 = parseInt(elem_id[2]);
        let id_2 = parseInt(elem_id[3]);
        if (elem_id[0] == "resolve") {
            resolve_ai_match(id_1, id_2);
            league.resolved = league.resolved + 2;
        } else {
            let previous_result = [
                league.game_results[id_1][id_2],
                league.game_results[id_2][id_1],
            ];
            let result = null;
            try {
                result = prompt("Match result:", "0:0")
                    .split(":")
                    .map((v) => Math.abs(parseInt(v)));
            } catch (err) {
                return false;
            }
            if (
                result == null ||
                result.length != 2 ||
                isNaN(result[0]) ||
                isNaN(result[1])
            ) {
                return false;
            }
            if (previous_result[0] >= 0) {
                points_subtract(id_1, previous_result);
                points_subtract(id_2, previous_result.reverse());
            } else {
                league.resolved = league.resolved + 2;
            }
            league.game_results[id_1][id_2] = result[0];
            league.game_results[id_2][id_1] = result[1];
            points_add(id_1, result);
            points_add(id_2, result.reverse());
        }
        refresh_flag = true;
    }

    function show_schedule() {
        let already_listed = [];
        let html = `<h5 class="card-title">Week ${shown_week + 1}</h5>`;
        league.teams.forEach((team, team_id) => {
            if (already_listed.includes(team_id)) {
                return;
            }
            let against = league.schedule[team_id][shown_week];
            already_listed.push(team_id);
            already_listed.push(against);
            html = `${html}${get_game_html(team_id, against)}`;
        });
        document.getElementById("week-game-list").innerHTML = html;
        document.querySelectorAll("#week-game-list .btn").forEach((elem) => {
            elem.addEventListener("click", resolve);
        });
        document.getElementById("next-week").disabled =
            (shown_week == league.week && league.resolved < league.n_teams) ||
            shown_week == league.schedule[0].length - 1;
        document.getElementById("prev-week").disabled = shown_week == 0;
        document.getElementById("next-week").style.display = "inline-block";
        document.getElementById("prev-week").style.display = "inline-block";
    }

    function show_full_schedule() {
        let already_listed = [];
        let html = "";
        for (
            league.week = 0;
            league.week < league.schedule[0].length;
            league.week = league.week + 1
        ) {
            html = `${html}<h5 class="card-title">Week ${league.week + 1}</h5>`;
            already_listed = [];
            league.teams.forEach((team, team_id) => {
                if (already_listed.includes(team_id)) {
                    return;
                }
                let against = league.schedule[team_id][league.week];
                already_listed.push(team_id);
                already_listed.push(against);
                html = `${html}${get_game_html(team_id, against)}`;
            });
            html = `${html}<hr>`;
        }
        document.getElementById("week-game-list").innerHTML = html;
        document.querySelectorAll("#week-game-list .btn").forEach((elem) => {
            elem.addEventListener("click", resolve);
        });
        document.getElementById("next-week").disabled = true;
        document.getElementById("prev-week").disabled = true;
        document.getElementById("next-week").style.display = "none";
        document.getElementById("prev-week").style.display = "none";
    }

    function refresh_schedule() {
        if (refresh_flag) {
            if (league.n_teams > 0) {
                if (league.full) {
                    show_full_schedule();
                } else {
                    show_schedule();
                }
                show_rankings();
            }
            refresh_flag = false;
        }
        setTimeout(refresh_schedule, 100);
    }
    setTimeout(refresh_schedule, 100);

    document.getElementById("next-week").addEventListener("click", () => {
        refresh_flag = true;
        if (shown_week == league.week) {
            league.week = league.week + 1;
            shown_week = league.week;
            league.resolved = 0;
        } else {
            shown_week = shown_week + 1;
        }
    });
    document.getElementById("prev-week").addEventListener("click", () => {
        if (shown_week > 0) {
            refresh_flag = true;
            shown_week = shown_week - 1;
        }
    });
})();
