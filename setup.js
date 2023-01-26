(() => {
    let cached_schedules = [
        // 8 team league
        [
            [4, 5, 6, 3, 2, 1],
            [7, 4, 5, 2, 3, 0],
            [6, 7, 4, 1, 0, 3],
            [5, 6, 7, 0, 1, 2],
            [0, 1, 2, 7, 6, 5],
            [3, 0, 1, 6, 7, 4],
            [2, 3, 0, 5, 4, 7],
            [1, 2, 3, 4, 5, 6],
        ],
        // 12 team league
        [
            [8, 9, 10, 7, 3, 1, 2, 4, 6, 5],
            [11, 8, 9, 6, 2, 0, 3, 7, 5, 4],
            [10, 11, 8, 9, 1, 3, 0, 6, 4, 7],
            [9, 10, 11, 8, 0, 2, 1, 5, 7, 6],
            [7, 5, 6, 11, 8, 9, 10, 0, 2, 1],
            [6, 4, 7, 10, 11, 8, 9, 3, 1, 0],
            [5, 7, 4, 1, 10, 11, 8, 2, 0, 3],
            [4, 6, 5, 0, 9, 10, 11, 1, 3, 2],
            [0, 1, 2, 3, 4, 5, 6, 11, 10, 9],
            [3, 0, 1, 2, 7, 4, 5, 10, 11, 8],
            [2, 3, 0, 5, 6, 7, 4, 9, 8, 11],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        ],
        // 8 team league (PvP first)
        [
            [3, 2, 1, 4, 5, 6],
            [2, 3, 0, 7, 4, 5],
            [1, 0, 3, 6, 7, 4],
            [0, 1, 2, 5, 6, 7],
            [7, 6, 5, 0, 1, 2],
            [6, 7, 4, 3, 0, 1],
            [5, 4, 7, 2, 3, 0],
            [4, 5, 6, 1, 2, 3],
        ],
        // 12 team league (PvP first)
        [
            [4, 6, 5, 8, 9, 10, 7, 3, 1, 2],
            [7, 5, 4, 11, 8, 9, 6, 2, 0, 3],
            [6, 4, 7, 10, 11, 8, 9, 1, 3, 0],
            [5, 7, 6, 9, 10, 11, 8, 0, 2, 1],
            [0, 2, 1, 7, 5, 6, 11, 8, 9, 10],
            [3, 1, 0, 6, 4, 7, 10, 11, 8, 9],
            [2, 0, 3, 5, 7, 4, 1, 10, 11, 8],
            [1, 3, 2, 4, 6, 5, 0, 9, 10, 11],
            [11, 10, 9, 0, 1, 2, 3, 4, 5, 6],
            [10, 11, 8, 3, 0, 1, 2, 7, 4, 5],
            [9, 8, 11, 2, 3, 0, 5, 6, 7, 4],
            [8, 9, 10, 1, 2, 3, 4, 5, 6, 7],
        ],
    ];
    function load_ai_teams(division, n_humans) {
        const shuffle = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        };
        let division3 = [
            { name: "Middleham L.C.", type: 1, division: 4 },
            { name: "Blackston Kings", type: 0, division: 4 },
            { name: "Downtown Utd.", type: 0, division: 4 },
            { name: "Brickton F.C.", type: 2, division: 4 },
        ];
        let division32 = [
            { name: "Dafton Utd.", type: 1, division: 3 },
            { name: "Cornfield Utd.", type: 2, division: 3 },
            { name: "Steelchester F.C.", type: 0, division: 3 },
            { name: "Greytown Bulls", type: 1, division: 3 },
        ];
        let division21 = [
            { name: "Royalford Town", type: 1, division: 2 },
            { name: "Smokepool City", type: 2, division: 2 },
            { name: "Northdale Town", type: 2, division: 2 },
            { name: "Brightsbury F.C.", type: 0, division: 2 },
        ];
        let division1 = [
            { name: "Sheepdale Shire", type: 1, division: 1 },
            { name: "Red Squirrels", type: 2, division: 1 },
            { name: "Port East", type: 0, division: 1 },
            { name: "Grassdale County", type: 0, division: 1 },
        ];
        let lower_list = [];
        let mid_list = [];
        let upper_list = [];
        if (division == 1) {
            lower_list = [...division21];
            mid_list = [...division1];
        } else if (division == 2) {
            lower_list = [...division32];
            mid_list = [...division21];
        } else if (division == 3) {
            lower_list = [...division3];
            mid_list = [...division32];
        } else if (division == 4) {
            lower_list = [...division32];
            mid_list = [...division21];
            upper_list = [...division1];
        } else if (division == 5) {
            lower_list = [...division3];
            mid_list = [...division32];
            upper_list = [...division21];
        } else if (division == 6) {
            lower_list = [...division1];
            mid_list = [...division21];
        } else if (division == 7) {
            lower_list = [...division21];
            mid_list = [...division1];
            upper_list = [...division32];
        }
        shuffle(lower_list);
        shuffle(mid_list);
        let team_list = [...lower_list, ...mid_list];
        if (upper_list.length >= 0) {
            shuffle(upper_list);
            team_list = [...team_list, ...upper_list];
        }
        return team_list.slice(0, -n_humans);
    }

    let setup_league_btn = document.getElementById("setup-league");
    setup_league_btn.addEventListener("click", () => {
        reset_league();
        let error_flag = false;

        let human_teams = [];
        for (let i = 1; i <= 4; i += 1) {
            let obj = document.getElementById(`player-name-${i}`);
            obj.classList.remove("is-invalid");
            let name = obj.value;
            if (name.length > 0) {
                human_teams.push(name);
                league.n_humans = league.n_humans + 1;
            }
        }
        if (human_teams.length == 0) {
            document
                .getElementById("player-name-1")
                .classList.add("is-invalid");
            error_flag = true;
        }

        league.show_all = document.getElementById("show-all-checkbox").checked;
        league.auto_resolve = document.getElementById(
            "auto-resolve-checkbox"
        ).checked;
        league.modified_resolve = document.getElementById(
            "modified-resolve-checkbox"
        ).checked;

        let division = document.getElementById("division-select").value;
        if ((division == 6 || division == 7) && human_teams.length < 4) {
            for (let idx = 1; idx <= 4; idx = idx + 1) {
                let elem = document.getElementById(`player-name-${idx}`);
                if (elem.value === "") {
                    elem.classList.add("is-invalid");
                }
            }
            error_flag = true;
        }

        let ai_teams = load_ai_teams(division, league.n_humans);
        let customize = document.getElementById("customize-checkbox").checked;

        ai_teams.forEach((team) => {
            league.teams.push(team);
        });
        human_teams.forEach((team_name) => {
            league.teams.push({
                name: team_name,
                type: 3,
                division: 0,
            });
        });
        league.n_teams = league.teams.length;

        league.game_results = Array(league.n_teams)
            .fill(null)
            .map((v) => {
                return Array(league.n_teams).fill(-1);
            });
        league.points = Array(league.n_teams).fill(0);
        league.won = Array(league.n_teams).fill(0);
        league.drew = Array(league.n_teams).fill(0);
        league.lost = Array(league.n_teams).fill(0);
        league.scored = Array(league.n_teams).fill(0);
        league.conceded = Array(league.n_teams).fill(0);
        league.tie_break = Array(league.n_teams)
            .fill(null)
            .map((v) => Math.random());

        league.schedule = null;
        if (league.n_teams == 8) {
            if (division == 6) {
                league.schedule = cached_schedules[2];
            } else {
                league.schedule = cached_schedules[0];
            }
        } else if (league.n_teams == 12) {
            if (division == 7) {
                league.schedule = cached_schedules[3];
            } else {
                league.schedule = cached_schedules[1];
            }
        } else {
            error_flag = true;
            throw new Error("Bad total number of teams");
        }

        if (!error_flag) {
            if (!customize) {
                refresh_flag = true;
                league.ready = true;
                switch_card("schedule-card");
            } else {
                refresh_custom_flag = true;
                league.ready = false;
                switch_card("custom-setup-card");
            }
        }
    });
    let read_about_btn = document.getElementById("read-about");
    read_about_btn.addEventListener("click", () => {
        window.open(
            "https://github.com/akononovicius/eleven-league-scheduler/blob/gh-pages/README.md",
            "_self"
        );
    });
})();
