function showRoll(span, defaultSides=6) {
    // Parse the text of the <span> by checking it against a
    // regular expression matching "XdY", where X is the number of
    // dice and Y is the size of those dice. The return is an array
    // where each element is an array containing the original string,
    // X, and Y. Store X as num and Y as sides. If Y is omitted, it
    // defaults to defaultSides (which defaults to 6).
    const parse = [...span.innerText.matchAll(/(\d+)d([\dF]*)([+-]\d+)*/g)];
    const num = parse[0][1];
    const sides = (parse[0][2])?parse[0][2]:defaultSides;
    const adds = (parse[0][3])?parse[0][3]:0;

    // Roll XdY and store the total as result.
    let result = 0;
    const fate = [-1,0,1];
    for (let i=0; i<num; i++) {
        if (sides === "F") {
            result += fate[Math.floor(Math.random() * 3)];
        }
        else {
            result += Math.floor(Math.random() * sides) + 1;
        }
    }
    result += adds * 1;

    // Create a new <div> element containing the result of the die
    // roll with the "overlay" class and an event listener to delete
    // itself when you click it. Then add that div as a child of the
    // original <span>.
    let overlay = document.createElement("div");
    result = ((sides === "F" && result > 0)?"+":"") + result;
    overlay.innerText = result;
    overlay.title = `Roll: ${span.innerText}\nResult: ${result}`;
    overlay.classList.add("dice-overlay");
    overlay.addEventListener("click",ev=>{
        span.removeChild(overlay);
        ev.stopPropagation();
    });
    span.appendChild(overlay);
}

// Add an event listener to each <span> with the "dice-roll" class.
document.querySelectorAll("span.dice-roll").forEach(el => {
    el.title = `Roll ${el.innerText}`;
    el.addEventListener("click",ev => showRoll(ev.currentTarget));
}
);
