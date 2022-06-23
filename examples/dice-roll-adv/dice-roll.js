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
    overlay.addEventListener("click",ev=>{
        span.removeChild(overlay);
        ev.stopPropagation();
    });
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

// Add an event listener to each <span> with the "dice-roll" class.
document.querySelectorAll("span.dice-roll").forEach(el => {
    el.title = `Roll ${el.innerText}${el.dataset.explode?", exploding":""}${el.dataset.highest?", keep "+el.dataset.highest+" highest":""}${el.dataset.lowest?", keep "+el.dataset.lowest+" lowest":""}${el.dataset.success ? ", counting "+el.dataset.success+"+" : ""}${el.dataset.again?", "+el.dataset.again+"-again":""}`;
    el.addEventListener("click",ev => showRoll(ev.currentTarget));
});
