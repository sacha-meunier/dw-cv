import { RotatingText } from "./RotatingText";
import { settings } from "./settings";

document.addEventListener("DOMContentLoaded", () => {
    const rotatingWrapper = document.querySelector(settings.rotatingText.containerSelector) as HTMLElement;
    if (rotatingWrapper) {
        new RotatingText(
            settings.rotatingText.containerSelector,
            settings.rotatingText.wordsSelector,
            settings.rotatingText.delay,
            settings.rotatingText.animationDuration,
            settings.rotatingText.distance
        );
    }
});
