import {settings} from "./settings/settings";
import {NavColorChanger} from "./controllers/NavColorChanger";
import {ScrollAnimator} from "./controllers/ScrollAnimator";
import {RotatingText} from "./controllers/RotatingText";

import './controllers/testimonials';
import {HorizontalScrollController} from "./controllers/HorizontalScrollController";
import {MagneticButton} from "./controllers/MagneticButton";
import {TiltEffect} from "./controllers/TiltEffect";
import {Trailer} from "./controllers/Trailer";

document.addEventListener("DOMContentLoaded", () => {
    new NavColorChanger(".header__logo", ".nav-toggler__label", ".nav-toggler__line");

    ScrollAnimator.init();

    new HorizontalScrollController(".skills__carousel", ".skills__button--arrow-left", ".skills__button--arrow-right", 500, 600);
    new HorizontalScrollController(".skills__slider-column", ".skills__control-arrow:first-child", ".skills__control-arrow:last-child", 500, 600);

    new MagneticButton(`[data-magnetic="true"]`);

    new TiltEffect(".tilt");

    new Trailer('#trailer', 9, 300, 10);

    const rotatingText = document.querySelector(settings.rotatingText.containerSelector) as HTMLElement;
    if (rotatingText) {
        new RotatingText(
            settings.rotatingText.containerSelector,
            settings.rotatingText.wordsSelector,
            settings.rotatingText.delay,
            settings.rotatingText.animationDuration,
            settings.rotatingText.distance
        );
    }
});