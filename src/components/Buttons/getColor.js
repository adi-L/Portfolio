export function getColor(color) {
    let selectedColor = "primary";
    const colors = {
        primary: "primary",
        secondary: "secondary",
        success: "success",
        danger: "danger",
        info: "info",
        transparent: "transparent",
        dark: "dark",
        light:"light",
    
    };
    if (colors[color]) {
        selectedColor = colors[color];
    }
    return selectedColor;
}
