/**
 * This class handles the colors of the burger menu / nav toggler.
 * The colors change after scrolling x amount if the nav isn't open.
 * The colors change when toggling the nav.
 *
 * @var observedElement is the observed element. If it disappears from the screen, the burger menu colors change.
 * @var navToggler is the toggler that changes color if the observedElement is visible or if the input is checked.
 * @var buttonLines are the lines of the toggler which can also change.
 * @var navTogglerInput is the input used to check if the nav is opened.
 * @var threshold is the amount of the element that has to be visible to trigger the function.
 *
 */
export class NavColorChanger {
    private readonly observedElement: HTMLElement;
    private readonly navToggler: HTMLLabelElement;
    private readonly buttonLines: NodeListOf<HTMLSpanElement>;
    private readonly navTogglerInput: HTMLInputElement;
    private observer: IntersectionObserver;
    private threshold: number;

    constructor(observedElementSelector: string, navTogglerSelector: string, buttonLineSelector: string, navTogglerInputSelector: string) {
        this.observedElement = document.querySelector(observedElementSelector);
        this.navToggler = document.querySelector(navTogglerSelector);
        this.buttonLines = document.querySelectorAll(buttonLineSelector);
        this.navTogglerInput = document.querySelector(navTogglerInputSelector);
        this.threshold = 0.3;

        if (this.observedElement && this.navToggler && this.buttonLines.length && this.navTogglerInput) {
            this.observer = new IntersectionObserver(this.handleIntersect, {
                threshold: this.threshold
            });
            this.observer.observe(this.observedElement);
            this.navTogglerInput.addEventListener('change', this.handleToggleInputChange);
        } else {
            console.warn("One or more elements are not found. Check the selectors.");
        }
    }

    private handleIntersect = (entries: IntersectionObserverEntry[]) => {
        if (this.navTogglerInput.checked) {
            this.setColorsWhenNavIsToggled();
            return;
        }

        let entry = entries[0];

        if (!entry) {
            return; // If no entry is available, exit the function
        }

        if (entry.isIntersecting) {
            this.setDefaultColors();
        } else {
            this.setModifiedColors();
        }
    };

    private handleToggleInputChange = () => {
        if (this.navTogglerInput.checked) {
            this.setColorsWhenNavIsToggled();
        } else {
            // Reconnect the observer to recalculate the colors based on the intersection
            this.observer.disconnect();
            this.observer.observe(this.observedElement);
            // Manually trigger the intersection logic to set colors correctly
            this.handleIntersect(this.observer.takeRecords());
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

    private setColorsWhenNavIsToggled() {
        this.navToggler.style.backgroundColor = "white";
        this.buttonLines.forEach(line => {
            line.style.backgroundColor = "black";
        });
    }
}
