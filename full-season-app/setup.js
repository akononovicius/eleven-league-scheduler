let setup_card = (() => {
    let n_fields = 0;

    let TEAM_TYPES = { Red: 0, Blue: 1, Green: 2, Human: 3 };
    let TEAM_DIVS = {
        Human: 0,
        "World class": 1,
        "Strong team": 2,
        "Normal team": 3,
        "Relegation material": 4,
    };

    function render(id, fill = "", type = 3, division = 0) {
        let group = document.createElement("div");
        group.classList.add("input-group", "mb-3");

        let label = document.createElement("span");
        label.classList.add("input-group-text");
        label.innerText = `${id}: `;
        group.appendChild(label);

        let team_name_field = document.createElement("input");
        team_name_field.id = `team-name-${id}`;
        team_name_field.type = "text";
        team_name_field.classList.add("form-control");
        team_name_field.placeholder = `Team #${id}`;
        team_name_field.value = fill;
        group.appendChild(team_name_field);

        let team_type_field = document.createElement("select");
        team_type_field.id = `team-type-${id}`;
        team_type_field.type = "text";
        team_type_field.classList.add("form-select");
        group.appendChild(team_type_field);
        for (const prop in TEAM_TYPES) {
            let type_option = document.createElement("option");
            type_option.value = TEAM_TYPES[prop];
            type_option.innerText = prop;
            type_option.selected = TEAM_TYPES[prop] == type;
            team_type_field.appendChild(type_option);
        }

        let team_div_field = document.createElement("select");
        team_div_field.id = `team-div-${id}`;
        team_div_field.type = "text";
        team_div_field.classList.add("form-select");
        group.appendChild(team_div_field);
        for (const prop in TEAM_DIVS) {
            let type_option = document.createElement("option");
            type_option.value = TEAM_DIVS[prop];
            type_option.innerText = prop;
            type_option.selected = TEAM_DIVS[prop] == division;
            team_div_field.appendChild(type_option);
        }

        document.getElementById("customize-team-list").appendChild(group);
    }

    function clear_view() {
        let body = document.getElementById("customize-team-list");
        while (body.firstChild) {
            body.removeChild(body.firstChild);
        }
    }

    function add_field(fill = "", type, division) {
        n_fields = n_fields + 1;
        render(n_fields, fill, type, division);
    }

    function refresh_view() {
        if (!league.ready && refresh_setup) {
            refresh_setup = false;

            n_fields = league.team_names.length;

            clear_view();
            if (n_fields < 2) {
                reset_league();
                add_field();
                add_field();
            } else {
                let idx = 0;
                league.team_names.forEach((name) => {
                    idx = idx + 1;
                    render(idx, name);
                });
            }
        }
        setTimeout(refresh_view, 100);
    }

    function shuffle(arr) {
        let cur = arr.length;
        let tmpv = 0;
        let rid = 0;
        while (0 !== cur) {
            rid = Math.floor(Math.random() * cur);
            cur -= 1;
            tmpv = arr[cur];
            arr[cur] = arr[rid];
            arr[rid] = tmpv;
        }
        return arr;
    }

    function setup_league() {
        league.team_names = Array(n_fields)
            .fill(null)
            .map((_, i) => {
                return document.getElementById(`team-name-${i + 1}`).value;
            })
            .filter((v) => v);
        league.team_types = Array(n_fields)
            .fill(null)
            .map((_, i) => {
                if (
                    document.getElementById(`team-name-${i + 1}`).value.length >
                    0
                ) {
                    return parseInt(
                        document.getElementById(`team-type-${i + 1}`).value
                    );
                }
                return -1;
            })
            .filter((v) => v >= 0);
        league.team_divs = Array(n_fields)
            .fill(null)
            .map((_, i) => {
                if (
                    document.getElementById(`team-name-${i + 1}`).value.length >
                    0
                ) {
                    return parseInt(
                        document.getElementById(`team-div-${i + 1}`).value
                    );
                }
                return -1;
            })
            .filter((v) => v >= 0);
        let shuffled_ids = Array(league.team_names.length)
            .fill(null)
            .map((_, i) => {
                return i;
            });
        shuffled_ids = shuffle(shuffled_ids);
        league.team_names = shuffled_ids.map((v) => league.team_names[v]);
        league.team_types = shuffled_ids.map((v) => league.team_types[v]);
        league.team_divs = shuffled_ids.map((v) => league.team_divs[v]);
        league.schedule = [...generate_schedule(), ...generate_schedule(true)];
        league.game_results = Array(2)
            .fill(null)
            .map((_) => {
                return Array(league.team_names.length)
                    .fill(null)
                    .map((_) => {
                        return Array(league.team_names.length).fill(-1);
                    });
            });
        league.won = Array(league.team_names.length).fill(0);
        league.drew = Array(league.team_names.length).fill(0);
        league.lost = Array(league.team_names.length).fill(0);
        league.points = Array(league.team_names.length).fill(0);
        league.scored = Array(league.team_names.length).fill(0);
        league.conceded = Array(league.team_names.length).fill(0);
        league.tie_break = Array(league.team_names.length)
            .fill(null)
            .map((_) => Math.random());
        league.ready = true;
        switch_card("schedule-card");
        refresh_schedule = true;
    }

    function generate_schedule(flip) {
        let n = league.team_names.length;
        if (n % 2 == 1) {
            n = n + 1;
        }
        let mod = n - 1;
        let decr = 0;
        let incr = -1;
        let arr = { length: n / 2 - 1 };
        let props = ["away", "home"];
        if (flip) {
            props = ["home", "away"];
        }
        let template = {
            home: mod,
            away: mod,
        };
        let schedule = Array(mod + 1)
            .fill(null)
            .slice(1)
            .map((_, i) => {
                return [
                    {
                        ...template,
                        ...{
                            [props[i % 2]]: (incr = (incr + 1) % mod),
                        },
                    },
                    ...Array.from(arr, () => ({
                        [props[1]]: (incr = (incr + 1) % mod),
                        [props[0]]: (decr = (decr + mod - 1) % mod),
                    })),
                ];
            });
        if (flip) {
            let reversed = schedule.reverse();
            return [...reversed.slice(1), ...reversed.slice(0, 1)];
        }
        return schedule.slice();
    }

    refresh_view();

    let add_team_btn = document.getElementById("add-team");
    add_team_btn.addEventListener("click", () => {
        add_field();
    });
    let load_eleven_btn = document.getElementById("load-eleven");
    load_eleven_btn.addEventListener("click", () => {
        switch_card("eleven-teams-card");
    });
    let setup_league_btn = document.getElementById("setup-league");
    setup_league_btn.addEventListener("click", () => {
        setup_league();
    });
    let read_about_btn = document.getElementById("read-about");
    read_about_btn.addEventListener("click", () => {
        window.open(
            "https://github.com/akononovicius/eleven-league-scheduler/full-season-app/blob/gh-pages/README.md",
            "_self"
        );
    });
    let eleven_app_btn = document.getElementById("eleven-app");
    eleven_app_btn.addEventListener("click", () => {
        window.open("../", "_self");
    });

    return {
        add_field: add_field,
    };
})();
