const tips = document.querySelectorAll(".tooltip");
tips.forEach(tip => tip.addEventListener("pointerenter",ev => {
    const el = ev.target;
    const rect = el.getBoundingClientRect();
    if (rect.left > window.visualViewport.width - rect.width*2) el.style.setProperty("--tt-space",`-50%`);
    else el.style.setProperty("--tt-space",`0`);
}));