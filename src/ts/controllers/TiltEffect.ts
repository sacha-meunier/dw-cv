/**
 * This class creates a 3D tilt / pan effect on the child, the image and the highlight if there is one.
 */
export class TiltEffect {
    private tiltWrappers: NodeListOf<HTMLElement>;
    private readonly perspective: string;
    private readonly slowTransition: string;
    private readonly fastTransition: string;
    private readonly amount: number[];

    constructor(selector: string) {
        this.tiltWrappers = document.querySelectorAll(selector);
        this.perspective = "perspective(1000px)";
        this.slowTransition = "all 0.5s ease";
        this.fastTransition = "all 0.1s ease";
        this.amount = [10, 20, 50];

        this.tiltWrappers.forEach(tiltWrapper => {
            const tiltChild = tiltWrapper.children[0] as HTMLElement | null;
            const img = tiltWrapper.querySelector('img') as HTMLElement | null;
            const highlight = tiltWrapper.querySelector('.card-highlight') as HTMLElement | null;

            tiltWrapper.addEventListener('mousemove', (e) => this.handleMouseMove(e, tiltWrapper, tiltChild, img, highlight));
            tiltWrapper.addEventListener('mouseleave', () => this.handleMouseLeave(tiltChild, img, highlight));
        });
    }

    private handleMouseMove(event: MouseEvent, tiltWrapper: HTMLElement, tiltChild: HTMLElement | null, img: HTMLElement | null, highlight: HTMLElement | null) {
        const parentPosition = tiltWrapper.getBoundingClientRect();
        const cardHalfWidth = parentPosition.width / 2;
        const cardHalfHeight = parentPosition.height / 2;
        const mx = event.clientX - parentPosition.left;
        const my = event.clientY - parentPosition.top;

        const xTilt = (mx - cardHalfWidth) / 80;
        const yTilt = -(my - cardHalfHeight) / 80;
        const cardTransform = `rotateX(${yTilt}deg) rotateY(${xTilt}deg)`;

        this.applyTransform(tiltChild, this.fastTransition, cardTransform, this.perspective);

        if (img) {
            const xImgTilt = (mx - cardHalfWidth) * 0.001;
            const yImgTilt = (my - cardHalfHeight) * 0.001;
            const imgTransform = `translateX(${xImgTilt * this.amount[0]}px) translateY(${yImgTilt * this.amount[0]}px) rotateX(${xImgTilt}deg) rotateY(${yImgTilt}deg)`;
            this.applyTransform(img, this.fastTransition, imgTransform, this.perspective);
        }

        if (highlight) {
            const xHighlightTilt = -(mx - cardHalfWidth) / 80;
            const yHighlightTilt = -(my - cardHalfHeight) / 80;
            const highlightTransform = `translateX(${xHighlightTilt * this.amount[2]}px) translateY(${yHighlightTilt * this.amount[2]}px) rotateX(${xHighlightTilt}deg) rotateY(${yHighlightTilt}deg)`;
            this.applyTransform(highlight, this.fastTransition, highlightTransform, this.perspective);
        }
    }

    private handleMouseLeave(tiltChild: HTMLElement | null, img: HTMLElement | null, highlight: HTMLElement | null) {
        const defaultTransform = "translateX(0) translateY(0) rotateX(0) rotateY(0)";
        this.applyTransform(tiltChild, this.slowTransition, defaultTransform, this.perspective);
        this.applyTransform(img, this.slowTransition, defaultTransform, this.perspective);
        this.applyTransform(highlight, this.slowTransition, defaultTransform, this.perspective);
    }

    private applyTransform(element: HTMLElement | null, transition: string, transform: string, perspective: string) {
        if (element) {
            element.style.transition = transition;
            element.style.transform = `${perspective} ${transform}`;
        }
    }
}