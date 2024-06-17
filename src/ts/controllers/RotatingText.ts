function assert(condition: boolean, message: string): asserts condition {
    if (!condition) {
        throw new Error(message);
    }
}

/**
 * This class animates a rotating text where one slides in and one slides out infinitely.
 */
export class RotatingText {
    private readonly container: HTMLDivElement;
    private readonly words: NodeListOf<HTMLElement>;
    private delay: number;
    private animationDuration: number;
    private distance: number;
    private currentIndex: number;
    private intervalId: number | null;
    private observer: IntersectionObserver;

    constructor(containerSelector: string, elementsSelector: string, delay: number, animationDuration: number, distance: number) {
        this.container = document.querySelector(containerSelector);
        assert(this.container != null, `No container was found using that selector: ${containerSelector}`);

        this.words = this.container.querySelectorAll(elementsSelector);
        assert(this.words.length > 0, `No words were found using that selector: ${elementsSelector}`);

        this.delay = delay;
        this.animationDuration = animationDuration;
        this.distance = distance;
        this.currentIndex = 0;
        this.intervalId = null;

        this.observer = new IntersectionObserver(this.handleVisibilityChange.bind(this), {
            threshold: 0.1,
        });

        this.observer.observe(this.container);
    }

    private handleVisibilityChange(entries: IntersectionObserverEntry[]) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                this.startRotation();
            } else {
                this.stopRotation();
            }
        });
    }

    private rotateWords() {
        const currentWord = this.words[this.currentIndex];
        const nextIndex = (this.currentIndex + 1) % this.words.length;
        const nextWord = this.words[nextIndex];

        currentWord.style.transform = `translateY(-${this.distance}%)`;
        nextWord.style.transform = "translateY(0%)";

        setTimeout(() => {
            currentWord.style.transition = "none";
            currentWord.style.transform = `translateY(${this.distance}%)`;

            setTimeout(() => {
                currentWord.style.transition = `transform ${this.animationDuration}ms ease-in-out`;
            }, 20);

            this.currentIndex = nextIndex;
        }, this.animationDuration);
    }

    private startRotation() {
        if (this.intervalId === null) {
            this.intervalId = window.setInterval(() => this.rotateWords(), this.delay);
        }
    }

    private stopRotation() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
