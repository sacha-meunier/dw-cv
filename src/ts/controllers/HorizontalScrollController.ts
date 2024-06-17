/**
 * This class makes the arrows left and right scroll x amount horizontally of a scrollable element.
 */
export class HorizontalScrollController {
    private container: HTMLElement;
    private arrowLeft: HTMLElement;
    private arrowRight: HTMLElement;
    private scrollStep: number;
    private duration: number;
    private isScrolling: boolean;

    constructor(containerSelector: string, arrowLeftSelector: string, arrowRightSelector: string, duration: number, scrollStep: number = 200) {
        this.container = document.querySelector(containerSelector);
        this.arrowLeft = document.querySelector(arrowLeftSelector);
        this.arrowRight = document.querySelector(arrowRightSelector);
        this.scrollStep = scrollStep;
        this.duration = duration;
        this.isScrolling = false;

        if (this.container && this.arrowLeft && this.arrowRight) {
            this.arrowLeft.addEventListener("click", this.scrollLeft);
            this.arrowRight.addEventListener("click", this.scrollRight);
        } else {
            console.warn("One or more elements are not found. Check the selectors.", {container: this.container, arrowLeft: this.arrowLeft, arrowRight: this.arrowRight});
        }
    }

    private scrollLeft = () => {
        if (this.isScrolling) return;
        this.isScrolling = true;

        this.animateScroll(-this.scrollStep);
    };

    private scrollRight = () => {
        if (this.isScrolling) return;
        this.isScrolling = true;

        this.animateScroll(this.scrollStep);
    };

    private animateScroll = (step: number) => {
        const startTime = performance.now();
        const startScroll = this.container.scrollLeft;
        const targetScroll = startScroll + step;

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);
            const ease = this.easeInOutQuad(progress);

            this.container.scrollLeft = startScroll + (targetScroll - startScroll) * ease;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.isScrolling = false;
            }
        };

        requestAnimationFrame(animate);
    };

    private easeInOutQuad(t: number): number {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
}
