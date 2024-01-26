(() => {
    let division_3_teams = [
        ["Blackston Kings", 0],
        ["Downtown United", 0],
        ["Brickton FC", 2],
        ["Middleham LC", 1],
    ];
    let division_32_teams = [
        ["Dafton United", 1],
        ["Steelchester FC", 0],
        ["Greytown Bulls", 1],
        ["Cornfield United", 2],
    ];
    let division_21_teams = [
        ["Smokepool City", 2],
        ["Royalford Town", 1],
        ["Brightsbury FC", 0],
        ["Northdale Town", 2],
    ];
    let division_1_teams = [
        ["Red Squirrels", 2],
        ["Sheepdale Shire", 1],
        ["Grassdale County", 0],
        ["Port East", 0],
    ];

    function add_eleven_teams() {
        if (document.getElementById("check-eleven-division-3").checked) {
            division_3_teams.forEach((v) => {
                setup_card.add_field(v[0], v[1], 4);
            });
        }
        if (document.getElementById("check-eleven-division-32").checked) {
            division_32_teams.forEach((v) => {
                setup_card.add_field(v[0], v[1], 3);
            });
        }
        if (document.getElementById("check-eleven-division-21").checked) {
            division_21_teams.forEach((v) => {
                setup_card.add_field(v[0], v[1], 2);
            });
        }
        if (document.getElementById("check-eleven-division-1").checked) {
            division_1_teams.forEach((v) => {
                setup_card.add_field(v[0], v[1], 1);
            });
        }
    }

    document
        .getElementById("add-eleven-teams")
        .addEventListener("click", () => {
            add_eleven_teams();
            switch_card("setup-card");
        });

    document
        .getElementById("cancel-eleven-teams")
        .addEventListener("click", () => {
            switch_card("setup-card");
        });
})();
