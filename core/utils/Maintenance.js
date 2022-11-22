export const RenameMaintenence = (value) => {

    if (value === "produced") {
        return "In stock";
    }

    if (value === "blank") {
        return "In use";
    }

    return value;

}