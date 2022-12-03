(() => {
    let cached_schedules = [
        [
            [8, 9, 3, 1, 2, 4],
            [2, 8, 9, 0, 3, 5],
            [1, 4, 8, 7, 0, 6],
            [9, 6, 0, 5, 1, 7],
            [5, 2, 7, 8, 6, 0],
            [4, 7, 6, 3, 8, 1],
            [7, 3, 5, 9, 4, 2],
            [6, 5, 4, 2, 9, 3],
            [0, 1, 2, 4, 5, 9],
            [3, 0, 1, 6, 7, 8],
        ],
        [
            [8, 9, 10, 1, 2, 3],
            [11, 8, 9, 0, 4, 6],
            [10, 11, 8, 5, 0, 7],
            [9, 10, 11, 6, 7, 0],
            [5, 6, 7, 8, 1, 11],
            [4, 7, 6, 2, 11, 9],
            [7, 4, 5, 3, 10, 1],
            [6, 5, 4, 11, 3, 2],
            [0, 1, 2, 4, 9, 10],
            [3, 0, 1, 10, 8, 5],
            [2, 3, 0, 9, 6, 8],
            [1, 2, 3, 7, 5, 4],
        ],
        [
            [8, 9, 10, 4, 5, 6],
            [11, 8, 9, 5, 4, 7],
            [10, 11, 8, 6, 7, 4],
            [9, 10, 11, 7, 6, 5],
            [5, 6, 7, 0, 1, 2],
            [4, 7, 6, 1, 0, 3],
            [7, 4, 5, 2, 3, 0],
            [6, 5, 4, 3, 2, 1],
            [0, 1, 2, 11, 9, 10],
            [3, 0, 1, 10, 8, 11],
            [2, 3, 0, 9, 11, 8],
            [1, 2, 3, 8, 10, 9],
        ],
        [
            [8, 9, 3, 1, 2, 4],
            [2, 8, 9, 0, 3, 7],
            [1, 6, 8, 5, 0, 3],
            [9, 7, 0, 6, 1, 2],
            [6, 5, 7, 8, 9, 0],
            [7, 4, 6, 2, 8, 9],
            [4, 2, 5, 3, 7, 8],
            [5, 3, 4, 9, 6, 1],
            [0, 1, 2, 4, 5, 6],
            [3, 0, 1, 7, 4, 5],
        ],
        [
            [8, 9, 3, 1, 2, 4],
            [2, 8, 9, 0, 3, 7],
            [1, 6, 8, 5, 0, 3],
            [9, 7, 0, 6, 1, 2],
            [6, 5, 7, 8, 9, 0],
            [7, 4, 6, 2, 8, 9],
            [4, 2, 5, 3, 7, 8],
            [5, 3, 4, 9, 6, 1],
            [0, 1, 2, 4, 5, 6],
            [3, 0, 1, 7, 4, 5],
        ],
        [
            [8, 9, 10, 1, 2, 3],
            [11, 8, 9, 0, 3, 2],
            [10, 11, 8, 3, 0, 1],
            [9, 10, 11, 2, 1, 0],
            [5, 6, 7, 8, 9, 10],
            [4, 7, 6, 11, 8, 9],
            [7, 4, 5, 10, 11, 8],
            [6, 5, 4, 9, 10, 11],
            [0, 1, 2, 4, 5, 6],
            [3, 0, 1, 7, 4, 5],
            [2, 3, 0, 6, 7, 4],
            [1, 2, 3, 5, 6, 7],
        ],
        [
            [8, 9, 10, 1, 2, 3],
            [11, 8, 9, 0, 3, 2],
            [10, 11, 8, 3, 0, 1],
            [9, 10, 11, 2, 1, 0],
            [5, 6, 7, 8, 9, 10],
            [4, 7, 6, 11, 8, 9],
            [7, 4, 5, 10, 11, 8],
            [6, 5, 4, 9, 10, 11],
            [0, 1, 2, 4, 5, 6],
            [3, 0, 1, 7, 4, 5],
            [2, 3, 0, 6, 7, 4],
            [1, 2, 3, 5, 6, 7],
        ],
        [
            [12, 13, 3, 10, 11, 4, 1, 2, 5, 6],
            [2, 12, 13, 5, 10, 11, 0, 3, 4, 7],
            [1, 3, 12, 8, 9, 10, 11, 0, 6, 4],
            [13, 2, 0, 11, 8, 9, 10, 1, 7, 5],
            [8, 9, 7, 12, 13, 0, 5, 6, 1, 2],
            [10, 8, 9, 1, 12, 13, 4, 7, 0, 3],
            [11, 10, 8, 9, 7, 12, 13, 4, 2, 0],
            [9, 11, 4, 13, 6, 8, 12, 5, 3, 1],
            [4, 5, 6, 2, 3, 7, 9, 12, 10, 11],
            [7, 4, 5, 6, 2, 3, 8, 11, 12, 10],
            [5, 6, 11, 0, 1, 2, 3, 13, 8, 9],
            [6, 7, 10, 3, 0, 1, 2, 9, 13, 8],
            [0, 1, 2, 4, 5, 6, 7, 8, 9, 13],
            [3, 0, 1, 7, 4, 5, 6, 10, 11, 12],
        ],
        [
            [12, 13, 14, 8, 9, 10, 11, 1, 2, 3],
            [15, 12, 13, 11, 8, 9, 10, 0, 3, 2],
            [14, 15, 12, 10, 11, 8, 9, 3, 0, 1],
            [13, 14, 15, 9, 10, 11, 8, 2, 1, 0],
            [8, 9, 10, 12, 13, 14, 15, 5, 6, 7],
            [11, 8, 9, 15, 12, 13, 14, 4, 7, 6],
            [10, 11, 8, 14, 15, 12, 13, 7, 4, 5],
            [9, 10, 11, 13, 14, 15, 12, 6, 5, 4],
            [4, 5, 6, 0, 1, 2, 3, 12, 9, 11],
            [7, 4, 5, 3, 0, 1, 2, 15, 8, 13],
            [6, 7, 4, 2, 3, 0, 1, 11, 14, 15],
            [5, 6, 7, 1, 2, 3, 0, 10, 15, 8],
            [0, 1, 2, 4, 5, 6, 7, 8, 13, 14],
            [3, 0, 1, 7, 4, 5, 6, 14, 12, 9],
            [2, 3, 0, 6, 7, 4, 5, 13, 10, 12],
            [1, 2, 3, 5, 6, 7, 4, 9, 11, 10],
        ],
        [
            [12, 13, 14, 8, 9, 10, 11, 1, 2, 3],
            [15, 12, 13, 11, 8, 9, 10, 0, 3, 2],
            [14, 15, 12, 10, 11, 8, 9, 3, 0, 1],
            [13, 14, 15, 9, 10, 11, 8, 2, 1, 0],
            [8, 9, 10, 12, 13, 14, 15, 5, 6, 7],
            [11, 8, 9, 15, 12, 13, 14, 4, 7, 6],
            [10, 11, 8, 14, 15, 12, 13, 7, 4, 5],
            [9, 10, 11, 13, 14, 15, 12, 6, 5, 4],
            [4, 5, 6, 0, 1, 2, 3, 9, 10, 11],
            [7, 4, 5, 3, 0, 1, 2, 8, 11, 10],
            [6, 7, 4, 2, 3, 0, 1, 11, 8, 9],
            [5, 6, 7, 1, 2, 3, 0, 10, 9, 8],
            [0, 1, 2, 4, 5, 6, 7, 15, 13, 14],
            [3, 0, 1, 7, 4, 5, 6, 14, 12, 15],
            [2, 3, 0, 6, 7, 4, 5, 13, 15, 12],
            [1, 2, 3, 5, 6, 7, 4, 12, 14, 13],
        ],
        [
            [12, 13, 3, 10, 11, 4, 1, 2, 5, 6],
            [2, 12, 13, 5, 10, 11, 0, 3, 4, 7],
            [1, 3, 12, 8, 9, 10, 11, 0, 6, 4],
            [13, 2, 0, 11, 8, 9, 10, 1, 7, 5],
            [8, 9, 10, 12, 13, 0, 5, 6, 1, 2],
            [11, 8, 9, 1, 12, 13, 4, 7, 0, 3],
            [10, 11, 8, 9, 7, 12, 13, 4, 2, 0],
            [9, 10, 11, 13, 6, 8, 12, 5, 3, 1],
            [4, 5, 6, 2, 3, 7, 9, 12, 13, 11],
            [7, 4, 5, 6, 2, 3, 8, 10, 12, 13],
            [6, 7, 4, 0, 1, 2, 3, 9, 11, 12],
            [5, 6, 7, 3, 0, 1, 2, 13, 10, 8],
            [0, 1, 2, 4, 5, 6, 7, 8, 9, 10],
            [3, 0, 1, 7, 4, 5, 6, 11, 8, 9],
        ],
        [
            [12, 13, 3, 10, 11, 4, 1, 2, 5, 6],
            [2, 12, 13, 5, 10, 11, 0, 3, 4, 7],
            [1, 3, 12, 8, 9, 10, 11, 0, 6, 4],
            [13, 2, 0, 11, 8, 9, 10, 1, 7, 5],
            [8, 9, 10, 12, 13, 0, 5, 6, 1, 2],
            [11, 8, 9, 1, 12, 13, 4, 7, 0, 3],
            [10, 11, 8, 9, 7, 12, 13, 4, 2, 0],
            [9, 10, 11, 13, 6, 8, 12, 5, 3, 1],
            [4, 5, 6, 2, 3, 7, 9, 12, 13, 11],
            [7, 4, 5, 6, 2, 3, 8, 10, 12, 13],
            [6, 7, 4, 0, 1, 2, 3, 9, 11, 12],
            [5, 6, 7, 3, 0, 1, 2, 13, 10, 8],
            [0, 1, 2, 4, 5, 6, 7, 8, 9, 10],
            [3, 0, 1, 7, 4, 5, 6, 11, 8, 9],
        ],
        [
            [12, 13, 14, 8, 9, 10, 11, 1, 2, 3],
            [15, 12, 13, 11, 8, 9, 10, 0, 3, 2],
            [14, 15, 12, 10, 11, 8, 9, 3, 0, 1],
            [13, 14, 15, 9, 10, 11, 8, 2, 1, 0],
            [8, 9, 10, 12, 13, 14, 15, 5, 6, 7],
            [11, 8, 9, 15, 12, 13, 14, 4, 7, 6],
            [10, 11, 8, 14, 15, 12, 13, 7, 4, 5],
            [9, 10, 11, 13, 14, 15, 12, 6, 5, 4],
            [4, 5, 6, 0, 1, 2, 3, 12, 13, 14],
            [7, 4, 5, 3, 0, 1, 2, 15, 12, 13],
            [6, 7, 4, 2, 3, 0, 1, 14, 15, 12],
            [5, 6, 7, 1, 2, 3, 0, 13, 14, 15],
            [0, 1, 2, 4, 5, 6, 7, 8, 9, 10],
            [3, 0, 1, 7, 4, 5, 6, 11, 8, 9],
            [2, 3, 0, 6, 7, 4, 5, 10, 11, 8],
            [1, 2, 3, 5, 6, 7, 4, 9, 10, 11],
        ],
        [
            [12, 13, 14, 8, 9, 10, 11, 1, 2, 3],
            [15, 12, 13, 11, 8, 9, 10, 0, 3, 2],
            [14, 15, 12, 10, 11, 8, 9, 3, 0, 1],
            [13, 14, 15, 9, 10, 11, 8, 2, 1, 0],
            [8, 9, 10, 12, 13, 14, 15, 5, 6, 7],
            [11, 8, 9, 15, 12, 13, 14, 4, 7, 6],
            [10, 11, 8, 14, 15, 12, 13, 7, 4, 5],
            [9, 10, 11, 13, 14, 15, 12, 6, 5, 4],
            [4, 5, 6, 0, 1, 2, 3, 12, 13, 14],
            [7, 4, 5, 3, 0, 1, 2, 15, 12, 13],
            [6, 7, 4, 2, 3, 0, 1, 14, 15, 12],
            [5, 6, 7, 1, 2, 3, 0, 13, 14, 15],
            [0, 1, 2, 4, 5, 6, 7, 8, 9, 10],
            [3, 0, 1, 7, 4, 5, 6, 11, 8, 9],
            [2, 3, 0, 6, 7, 4, 5, 10, 11, 8],
            [1, 2, 3, 5, 6, 7, 4, 9, 10, 11],
        ],
    ];
    function load_ai_teams(division) {
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
            { name: "Downton Utd.", type: 0, division: 4 },
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
            { name: "Stokepool City", type: 2, division: 2 },
            { name: "Northdale Town", type: 2, division: 2 },
            { name: "Brighsbury F.C.", type: 0, division: 2 },
        ];
        let division1 = [
            { name: "Sheepdale Shire", type: 1, division: 1 },
            { name: "Red Squirrels", type: 2, division: 1 },
            { name: "Port East", type: 0, division: 1 },
            { name: "Grasdale County", type: 0, division: 1 },
        ];
        let lower_list = [];
        let mid_list = [];
        let upper_list = [];
        if (division == 3) {
            lower_list = [...division3];
            mid_list = [...division32];
        } else if (division == 2) {
            lower_list = [...division32];
            mid_list = [...division21];
        } else if (division == 1) {
            lower_list = [...division21];
            mid_list = [...division1];
        } else if (division == 4) {
            lower_list = [...division32];
            mid_list = [...division21];
            upper_list = [...division1];
        } else if (division == 5) {
            lower_list = [...division3];
            mid_list = [...division32];
            upper_list = [...division21];
        }
        shuffle(lower_list);
        shuffle(mid_list);
        if (upper_list.length >= 0) {
            shuffle(upper_list);
            return [...lower_list, ...mid_list, ...upper_list];
        }
        return [...lower_list, ...mid_list];
    }

    function get_schedule(n_humans, pvp, epic_league) {
        let sid = ((n_humans - 1) % 4) + (epic_league ? 6 : -1) + (pvp ? 0 : 4);
        return cached_schedules[sid];
    }

    let setup_league_btn = document.getElementById("setup-league");
    setup_league_btn.addEventListener("click", () => {
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

        let pvp = document.getElementById("pvp-checkbox").checked;
        if (pvp && human_teams.length < 2) {
            document
                .getElementById("player-name-2")
                .classList.add("is-invalid");
            error_flag = true;
        }

        league.full = document.getElementById("full-checkbox").checked;
        league.auto_resolve = document.getElementById(
            "auto-resolve-checkbox"
        ).checked;
        league.modified_resolve = document.getElementById(
            "modified-resolve-checkbox"
        ).checked;

        let division = document.getElementById("division-select").value;
        let ai_teams = load_ai_teams(division);

        ai_teams.forEach((team) => {
            league.teams.push(team);
        });
        human_teams.forEach((team_name) => {
            league.teams.push({
                name: team_name,
                type: 3,
                division: ai_teams[Math.floor(ai_teams.length / 2)].division,
            });
        });
        if (league.n_humans % 2 == 1) {
            league.teams.push({
                name: "Forgers End",
                type: Math.floor(3 * Math.random()),
                division: ai_teams[Math.floor(ai_teams.length / 2)].division,
            });
        }
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

        league.schedule = get_schedule(
            league.n_humans,
            pvp,
            division == 4 || division == 5
        );

        if (!error_flag) {
            refresh_flag = true;
            switch_card("schedule-card");
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
