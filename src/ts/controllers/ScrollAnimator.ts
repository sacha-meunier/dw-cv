/**
 * This class creates animations on scroll.
 */
export class ScrollAnimator {
    private observer: IntersectionObserver;

    constructor() {
        this.observer = new IntersectionObserver(this.handleIntersect, {
            threshold: 0.1
        });

        this.observeElements();
    }

    private handleIntersect: IntersectionObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target as HTMLElement;
                const animationType = element.dataset.animate;

                if (animationType) {
                    element.classList.add('animate', animationType);
                    observer.unobserve(element);
                }
            }
        });
    };

    private observeElements() {
        const animatedElements = document.querySelectorAll<HTMLElement>('[data-animate]');
        animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }

    static init() {
        new ScrollAnimator();
    }
}
