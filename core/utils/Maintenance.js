export const RenameMaintenence = (value) => {

    if (value === "in_stock") {
        return "In stock";
    }

    if (value === "in_use") {
        return "In use";
    }

    return value;

}