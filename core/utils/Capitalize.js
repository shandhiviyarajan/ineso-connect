function toCapitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function removeUnderscore(string) {

    return string.replace(/_/g, " ");
}

export {
    toCapitalize,
    removeUnderscore,
}