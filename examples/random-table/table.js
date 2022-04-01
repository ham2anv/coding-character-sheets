function highlightRow(table) {
    // get all of the cells in the table
    const allCells = table.querySelectorAll("td");
    // get all of the rows in the body of the table
    const bodyRows = table.querySelectorAll("tbody tr");
    // pick a random row from the table
    let rowNum = Math.floor(Math.random() * bodyRows.length);
    // if the table is weighted, pick a random row
    // based on the weights
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
    // clear the styles from any previous selection
    // then add the "gray-out" class to each row
    allCells.forEach(el => {
        el.classList.remove("highlight");
        el.classList.add("gray-out");
    });
    // remove the "gray-out" class from the selected row
    // and add the "highlight" class
    bodyRows[rowNum].querySelectorAll("td").forEach(el => {
        el.classList.remove("gray-out");
        el.classList.add("highlight");
    });
}

// clear all styles, resetting the table
function clearTable(table) {
    table.querySelectorAll("td").forEach(el => {
        el.classList.remove("highlight","gray-out");
    });
}

// add a listener for click events to each table on
// the page with an id that starts with "random"
// to run highlightRow() on that table
document.querySelectorAll("table[id^=\"random\"]").forEach(table => 
    table.addEventListener("click",ev => highlightRow(ev.currentTarget))
);

// add a listener for click events to each cell in any
// table whose id starts with "random" to clear the
// table if that cell has the "highlight" class
document.querySelectorAll("table[id^=\"random\"] td").forEach(cell => {
    cell.addEventListener("click", ev => {
        if (ev.currentTarget.classList.contains("highlight")) {
            clearTable(ev.currentTarget.closest("table"));
            ev.stopPropagation();
        }
    })
});