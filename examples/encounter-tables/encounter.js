function showRoll(span, defaultSides=6) {
    if (span.dataset.success) {
        getHits(span, defaultSides);
    }
    else {
        rollTotal(span, defaultSides);
    }
}

function rollTotal(span, defaultSides) {
    // Parse the text of the span into individual dice expressions,
    // store those expressions in the dice array as objects, and 
    // store any numerical modifier as the adds property of the
    // result object.
    const parse = [...span.innerText.matchAll(/([+-]*)(\d+d*[\dF]*)/g)];
    let dice = [];
    let result = { rolls: [], total: 0, adds: 0 };
    parse.forEach(el => {
        if (/\d+d[\dF]*/g.test(el[2])) {
            const dieBreak = [...el[2].matchAll(/(\d+)d([\dF]*)/g)];
            dice.push({
                sign: el[1] ? el[1] : "",
                num: dieBreak[0][1],
                sides: dieBreak[0][2] ? dieBreak[0][2] : defaultSides
            });
        }
        else if (/\d+/.test(el[0])) result.adds += el[0] * 1;
    });

    // Roll each dice expression and add the results to the
    // rolls property of the result object. Keep only the highest
    // or lowest N dice if the data-highest or data-lowest attributes
    // are present, respectively.
    dice.forEach(el => result.rolls.push(span.dataset.explode 
        ? explodeDice(el.num, el.sides, el.sign) 
        : rollDice(el.num, el.sides, el.sign)));
    if (span.dataset.highest) {
        result.rolls = result.rolls.flat()
                        .sort((a, b) => a - b);
        result.total = result.rolls.flat()
                        .slice(result.rolls.length - span.dataset.highest)
                        .reduce((a, b) => a + b, 0) + result.adds;
    }
    else if (span.dataset.lowest) {
        result.rolls = result.rolls.flat()
                        .sort((a, b) => b - a);
        result.total = result.rolls.flat()
                        .slice(result.rolls.length - span.dataset.lowest)
                        .reduce((a, b) => a + b, 0) + result.adds;
    }
    else
        result.total = result.rolls.flat()
                        .reduce((a, b) => a + b, 0) + result.adds;

    addOverlay(span, result.total, `Roll: ${span.innerText}${span.dataset.highest?", keep "+span.dataset.highest+" highest":""}${span.dataset.lowest?", keep "+span.dataset.lowest+" lowest":""}\n(${result.rolls.flat()})\nResult: ${result.total}`);
}

function getHits(span, defaultSides) {
    // Roll the dice and check for successes, results >= the span's
    // data-success attribute. Results >= the data-again attribute
    // explode.
    const parse = [...span.innerText.matchAll(/(\d+)d(\d*)/g)];
    const num = parse[0][1];
    const sides = parse[0][2] 
                    ? parse[0][2] 
                    : defaultSides;
    let dice = {
        results: span.dataset.again 
                    ? explodeDice(num, sides, "", span.dataset.again) 
                    : rollDice(num, sides),
        hits: 0
    };
    dice.results.forEach(a => {
        if (a >= span.dataset.success)
            dice.hits++;
    });

    addOverlay(span, `${dice.hits}`, `Roll: ${span.innerText}\n(${dice.results.flat()})\nSuccesses/Hits: ${dice.hits}`);
}

function addOverlay(span,text,title) {
    // Create a new <div> element containing the result of the die
    // roll with the "overlay" class and an event listener to delete
    // itself when you click it. Then add that div as a child of the
    // original <span>.
    let overlay = document.createElement("div");
    overlay.innerText = text;
    overlay.title = title;
    overlay.classList.add("dice-overlay");
    span.appendChild(overlay);
}

function explodeDice(num, sides, sign="", again=false) {
    // Roll XdY, letting dice explode on their largest value, or on the
    // again argument, if present. Return the results as an array.
    let rollList = [];
    let roll = 0;
    const fate = [-1,0,1];
    let i = 0;

    // Loop through X dice, rerolling any dice that explode.
    while (i < num) {
        if (sides === "F") {
            roll = fate[Math.floor(Math.random() * 3)] 
                * (sign==="-" ? -1 : 1);
            rollList.push(roll);
            if (roll == 1 * (sign==="-" ? -1 : 1) 
                || (again && roll >= again)) continue;
        }
        else {
            roll = (Math.floor(Math.random() * sides) + 1) 
                * (sign==="-" ? -1 : 1);
            rollList.push(roll);
            if (roll == sides * (sign==="-" ? -1 : 1) 
                || (again && roll >= again)) continue;
        }
        i++;
    }
    return rollList;
}

function rollDice(num, sides, sign="") {
    // Roll XdY and return the results as an array.
    let rollList = [];
    let roll = 0;
    const fate = [-1,0,1];
    for (let i=0; i<num; i++) {
        if (sides === "F") {
            roll = fate[Math.floor(Math.random() * 3)] 
                * (sign==="-" ? -1 : 1);
            rollList.push(roll);
        }
        else {
            roll = (Math.floor(Math.random() * sides) + 1) 
                * (sign==="-" ? -1 : 1);
            rollList.push(roll);
        }
    }
    return rollList;
}


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
    // clear all dice spans in the table
    table.querySelectorAll(".dice-overlay").forEach(el => {
        el.remove();
    })
    // remove the "gray-out" class from the selected row
    // and add the "highlight" class; roll any dice spans
    // in the row
    bodyRows[rowNum].querySelectorAll("td").forEach(el => {
        el.classList.remove("gray-out");
        el.classList.add("highlight");
        el.querySelectorAll("span.dice-roll").forEach(span => showRoll(span));
    });
}

// clear all styles, resetting the table
function clearTable(table) {
    table.querySelectorAll("td").forEach(el => {
        el.classList.remove("highlight","gray-out");
    });
    table.querySelectorAll(".dice-overlay").forEach(el => {
        el.remove();
    })
}

// add a listener for click events to each table on
// the page with an id that starts with "random"
// to run highlightRow() on that table
document.querySelectorAll("table[id^=\"random\"]").forEach(table => {
    table.addEventListener("click",ev => highlightRow(ev.currentTarget));
    console.log("Click");
});

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