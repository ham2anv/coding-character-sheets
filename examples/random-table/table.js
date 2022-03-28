function highlightRow(table) {
    const allCells = table.querySelectorAll("td");
    const bodyRows = table.querySelectorAll("tbody tr");
    let rowNum = Math.floor(Math.random() * bodyRows.length);
    if (table.dataset.weighted) {
        let totalWeight = 0;
        let entries = [];
        bodyRows.forEach((el, index) => {
            if (el.dataset.weight) {
                totalWeight += el.dataset.weight/1;
                entries.push({
                    row: index,
                    ceiling: totalWeight
                });
            }
        });
        let rand = Math.floor(Math.random() * totalWeight);
        rowNum = entries.find(el => el.ceiling > rand).row;
    }
    allCells.forEach(el => {
        el.classList.remove("highlight");
        el.classList.add("gray-out");
    });
    bodyRows[rowNum].querySelectorAll("td").forEach(el => {
        el.classList.remove("gray-out");
        el.classList.add("highlight");
    });
}

function clearTable(table) {
    table.querySelectorAll("td").forEach(el => {
        el.classList.remove("highlight","gray-out");
    });
}

document.querySelectorAll("table[id^=\"random\"]").forEach(table => {
    table.addEventListener("click",ev => {
        highlightRow(ev.currentTarget)
    });
});

document.querySelectorAll("table[id^=\"random\"] td").forEach(cell => {
    cell.addEventListener("click", ev => {
        if (ev.currentTarget.classList.contains("highlight")) {
            clearTable(ev.currentTarget.closest("table"));
            ev.stopPropagation();
        }
    })
});