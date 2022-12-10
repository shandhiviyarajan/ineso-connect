export const RenameMaintenence = (value) => {

    if (value === "produced") {
        return "In stock";
    }

    if (value === "in_stock") {
        return "In stock";
    }

    if (value === "blank") {
        return "In use";
    }

    if (value === "in_use") {
        return "In use";
    }

    return value;

}