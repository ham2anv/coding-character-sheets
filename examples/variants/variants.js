const params = (new URL(document.location)).searchParams;

if (params.has("system")) loadVariant(params.get("system"));

function loadVariant(v) {
    const variantList = document.querySelectorAll(`.${v}`);
    const hiddenList = document.querySelectorAll(`*:where(.variant):not(.${v})`);
    hiddenList.forEach(el => document.body.removeChild(el));
}