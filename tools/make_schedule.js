function other_template(modifier, weeks = 4, n_teams = 4, other_teams = 4) {
    if (n_teams > other_teams) {
        // rely on fix_schedule to resolve scheduling issues
        return Array(n_teams).fill(-1);
    }
    return Array(n_teams)
        .fill(null)
        .map((w, j) => {
            return Array(weeks)
                .fill(null)
                .map((v, i) => {
                    return ((other_teams + i - j) % other_teams) + modifier;
                });
        });
}

function self_template(
    modifier,
    weeks = 3,
    n_teams = 4,
    against = [0, 1, 2, 3]
) {
    let effective_teams = n_teams;
    if (n_teams % 2 == 1) {
        effective_teams = n_teams + 1;
    }
    let effective_weeks = weeks;
    if (effective_weeks >= effective_weeks) {
        effective_weeks = effective_teams - 1;
    }
    let template = Array(effective_teams)
        .fill(null)
        .map((w, j) => {
            if (j == effective_teams - 1) {
                return Array(effective_weeks).fill(-1);
            }
            return Array(effective_weeks)
                .fill(null)
                .map((v, i) => {
                    return (
                        (effective_teams - 1 + i - j) % (effective_teams - 1)
                    );
                });
        });
    for (let i = 0; i < effective_teams - 1; i = i + 1) {
        let which = template[i].findIndex((v) => v == i);
        template[i][which] = effective_teams - 1;
        template[effective_teams - 1][which] = i;
    }
    if (n_teams < effective_teams) {
        for (let i = 0; i < effective_weeks; i = i + 1) {
            let round = template.map((v) => v[i]);
            let which = round.findIndex((v) => v == n_teams);
            template[n_teams][i] = -1;
            template[which][i] = -1;
        }
    }
    if (effective_weeks < weeks) {
        const pad = Array(weeks - effective_weeks).fill(-1);
        template = template.map((v) => [...pad, ...v]);
    }
    let against_id = -1;
    template = template.map((w, j) =>
        w.map((v, i) => {
            if (v >= 0) {
                return v + modifier;
            }
            if (n_teams % 2 == 0 || j < template.length - 1) {
                against_id = against_id + 1;
                return against[against_id];
            }
            return v;
        })
    );
    return template;
}

function add_to_schedule(schedule, i, j, template) {
    for (let k = 0; k < template.length; k = k + 1) {
        for (let l = 0; l < template[0].length; l = l + 1) {
            schedule[k + i][l + j] = template[k][l];
        }
    }
}

function backtrack_schedule(schedule, level = 0) {
    const all_candidates = Array(schedule.length)
        .fill(null)
        .map((v, i) => i);
    for (let i = 0; i < schedule.length; i = i + 1) {
        for (let j = 0; j < schedule[i].length; j = j + 1) {
            if (schedule[i][j] == -1) {
                const candidates = all_candidates.filter((v) => {
                    return (
                        i != v &&
                        schedule[i].findIndex((w) => w == v) == -1 &&
                        schedule.map((w) => w[j]).findIndex((w) => w == v) == -1
                    );
                });
                if (candidates.length == 0) {
                    return false;
                }
                candidates.every((k) => {
                    schedule[i][j] = k;
                    schedule[k][j] = i;
                    if (!backtrack_schedule(schedule, level + 1)) {
                        schedule[i][j] = -1;
                        schedule[k][j] = -1;
                        return true;
                    }
                    return false;
                });
            }
            if (schedule[i][j] == -1) {
                return false;
            }
        }
    }
    return true;
}

function get_simple_schedule(n_humans, pvp) {
    let schedule = null;
    if (n_humans == 4 || n_humans == 3) {
        schedule = Array(12)
            .fill(null)
            .map(() => Array(6).fill(-1));
        add_to_schedule(schedule, 0, 0, other_template(8, 3));
        add_to_schedule(schedule, 8, 0, other_template(0, 3));
        if (pvp) {
            add_to_schedule(
                schedule,
                8,
                3,
                self_template(8, 3, n_humans, [4, 5, 6, 7])
            );
        } else {
            add_to_schedule(schedule, 4, 3, other_template(8, 3));
            add_to_schedule(schedule, 8, 3, other_template(4, 3));
        }
    } else if (n_humans == 2 || n_humans == 1) {
        schedule = Array(10)
            .fill(null)
            .map(() => Array(6).fill(-1));
        add_to_schedule(schedule, 0, 0, other_template(8, 3, 4, 2));
        add_to_schedule(schedule, 8, 0, other_template(0, 3, 2, 4));
        if (pvp && n_humans == 2) {
            add_to_schedule(
                schedule,
                8,
                3,
                self_template(8, 3, n_humans, [4, 5, 6, 7])
            );
        } else {
            add_to_schedule(schedule, 4, 3, other_template(8, 3, 4, 2));
            add_to_schedule(schedule, 8, 3, other_template(4, 3, 2, 4));
        }
    }

    fix_schedule(schedule);
    backtrack_schedule(schedule);

    return schedule;
}

function fix_schedule(schedule) {
    for (let team = 0; team < schedule.length; team = team + 1) {
        for (let week = 0; week < schedule.length; week = week + 1) {
            if (schedule[team][week] == -1) {
                schedule[team][week] = schedule
                    .map((w) => w[week])
                    .findIndex((v) => v == team);
            }
        }
    }
    for (let team = 0; team < schedule.length; team = team + 1) {
        for (let week = 0; week < schedule.length; week = week + 1) {
            if (schedule[team][week] > -1) {
                let team_check = schedule[team].filter((v, i) => i != week);
                if (team_check.includes(schedule[team][week])) {
                    throw new Error(
                        `Overlapping schedule @ (${team}, ${week}) on team basis.`
                    );
                }
                let week_check = schedule.map((t, j) => {
                    if (j != team) {
                        return t[week];
                    }
                    return -1;
                });
                if (week_check.includes(schedule[team][week])) {
                    throw new Error(
                        `Overlapping schedule @ (${team}, ${week}) on week basis.`
                    );
                }
            }
        }
    }
}

function get_epic_schedule(n_humans, pvp) {
    let schedule = null;
    if (n_humans == 4 || n_humans == 3) {
        schedule = Array(16)
            .fill(null)
            .map(() => Array(10).fill(-1));
        // phase 1
        add_to_schedule(schedule, 0, 0, other_template(12, 3));
        add_to_schedule(schedule, 4, 0, other_template(8, 3));
        add_to_schedule(schedule, 8, 0, other_template(4, 3));
        add_to_schedule(schedule, 12, 0, other_template(0, 3));
        // phase 2
        add_to_schedule(schedule, 0, 3, other_template(8, 4));
        add_to_schedule(schedule, 4, 3, other_template(12, 4));
        add_to_schedule(schedule, 8, 3, other_template(0, 4));
        add_to_schedule(schedule, 12, 3, other_template(4, 4));
        // phase 3
        if (pvp) {
            add_to_schedule(
                schedule,
                12,
                7,
                self_template(12, 3, n_humans, [8, 9, 10, 11])
            );
        } else {
            add_to_schedule(schedule, 8, 7, other_template(12, 3));
            add_to_schedule(schedule, 12, 7, other_template(8, 3));
        }
    } else if (n_humans == 2 || n_humans == 1) {
        schedule = Array(14)
            .fill(null)
            .map(() => Array(10).fill(-1));
        // phase 1
        add_to_schedule(schedule, 0, 0, other_template(12, 3, 4, 2));
        add_to_schedule(schedule, 4, 0, other_template(8, 3, 4, 2));
        add_to_schedule(schedule, 8, 0, other_template(4, 3, 2, 4));
        add_to_schedule(schedule, 12, 0, other_template(0, 3, 2, 4));
        // phase 2
        add_to_schedule(schedule, 0, 3, other_template(8, 4, 4, 2));
        add_to_schedule(schedule, 4, 3, other_template(12, 4, 4, 2));
        add_to_schedule(schedule, 10, 3, other_template(0, 4, 2, 4)); // shifted down
        add_to_schedule(schedule, 12, 3, other_template(4, 4, 2, 4));
        // phase 3
        if (pvp && n_humans == 2) {
            add_to_schedule(
                schedule,
                12,
                7,
                self_template(12, 3, n_humans, [8, 9, 10, 11])
            );
        } else {
            add_to_schedule(schedule, 8, 7, other_template(12, 3, 4, 2));
            add_to_schedule(schedule, 12, 7, other_template(8, 3, 2, 4));
        }
    }

    fix_schedule(schedule);
    backtrack_schedule(schedule);

    return schedule;
}
