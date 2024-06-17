/**
 * This class changes the color of the burger menu after scrolling x amount.
 */
export class NavColorChanger {
    private readonly logo: HTMLAnchorElement;
    private readonly navToggler: HTMLLabelElement;
    private readonly buttonLine: NodeListOf<HTMLSpanElement>;
    private observer: IntersectionObserver;

    constructor(logoSelector: string, navTogglerSelector: string, buttonLineSelector: string) {
        this.logo = document.querySelector(logoSelector);
        this.navToggler = document.querySelector(navTogglerSelector);
        this.buttonLine = document.querySelectorAll(buttonLineSelector);

        if (this.logo && this.navToggler && this.buttonLine.length) {
            this.observer = new IntersectionObserver(this.handleIntersect, {
                threshold: 0.3
            });

            this.observer.observe(this.logo);
        } else {
            console.warn("One or more elements are not found. Check the selectors.");
        }
    }

    private handleIntersect = (entries: IntersectionObserverEntry[]) => {
        let entry = entries[0];

        if (entry.isIntersecting) {
            this.navToggler.style.backgroundColor = "white";
            this.buttonLine.forEach(line => {
                line.style.backgroundColor = "blue";
            });
        } else {
            this.navToggler.style.backgroundColor = "black";
            this.buttonLine.forEach(line => {
                line.style.backgroundColor = "white";
            });
        }
    };
}
