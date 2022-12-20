function toCapitalize(VALUE) {
    if (VALUE && VALUE.length > 0) {
        return VALUE && VALUE.charAt(0).toUpperCase() + VALUE.slice(1)
    } else {
        return "";
    }

}

function removeUnderscore(VALUE) {
    if (VALUE && VALUE.length > 0) {
        return VALUE && VALUE.replace(/_/g, " ");
    } else {
        return "";
    }
}

export {
    toCapitalize,
    removeUnderscore,
}