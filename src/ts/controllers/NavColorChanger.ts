/**
 * This class changes the color of the burger menu after scrolling x amount.
 *
 * @var logo is the observed element for the toggler color change.
 * @var navToggler is the toggler that changes color if the logo is visible or if the input is checked.
 * @var buttonLines are the lines of the toggler which can also change.
 * @var navTogglerInput is the input used to check if the nav is opened.
 * @var threshold is the amount of the element that has to be visible to trigger the function.
 *
 */
export class NavColorChanger {
    private readonly logo: HTMLAnchorElement;
    private readonly navToggler: HTMLLabelElement;
    private readonly buttonLines: NodeListOf<HTMLSpanElement>;
    private readonly navTogglerInput: HTMLInputElement;
    private observer: IntersectionObserver;
    private threshold: number;

    constructor(logoSelector: string, navTogglerSelector: string, buttonLineSelector: string, navTogglerInputSelector: string) {
        this.logo = document.querySelector(logoSelector);
        this.navToggler = document.querySelector(navTogglerSelector);
        this.buttonLines = document.querySelectorAll(buttonLineSelector);
        this.navTogglerInput = document.querySelector(navTogglerInputSelector);
        this.threshold = 0.3;

        if (this.logo && this.navToggler && this.buttonLines.length) {
            this.observer = new IntersectionObserver(this.handleIntersect, {
                threshold: this.threshold
            });
            this.observer.observe(this.logo);
            this.navTogglerInput.addEventListener('change', this.handleToggleInputChange);
        } else {
            console.warn("One or more elements are not found. Check the selectors.");
        }
    }

    private handleIntersect = (entries: IntersectionObserverEntry[]) => {
        if (this.navTogglerInput.checked) {
            this.setDefaultColors();
            return;
        }

        let entry = entries[0];

        if (entry.isIntersecting) {
            this.setDefaultColors();
        } else {
            this.setModifiedColors();
        }
    };

    private handleToggleInputChange = () => {
        if (this.navTogglerInput.checked) {
            this.setDefaultColors();
        } else {
            this.observer.disconnect();
            this.observer.observe(this.logo);
        }
    };

    private setDefaultColors() {
        this.navToggler.style.backgroundColor = "white";
        this.buttonLines.forEach(line => {
            line.style.backgroundColor = "blue";
        });
    }

    private setModifiedColors() {
        this.navToggler.style.backgroundColor = "black";
        this.buttonLines.forEach(line => {
            line.style.backgroundColor = "white";
        });
    }
}
