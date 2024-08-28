/**
 * This class creates a 3D tilt / pan effect
 */
export class TiltEffect {
    private readonly perspective: string = "perspective(1000px)";
    private readonly mouseEnterDelay: string = "all 0.5s ease-in";
    private readonly mouseHoverDelay: string = "all 0.15s ease";
    private readonly mouseLeaveDelay: string = "all 0.5s ease-out";
    private readonly defaultParallaxAmount: string = '20';
    private readonly defaultCSSTransform: string = "translateX(0) translateY(0) rotateX(0) rotateY(0)";
    private readonly tiltAmountDivider: number = 80;

    constructor(
        hoverReferenceSelector: string,
        elementTiltedSelector: string,
        elementsParallaxedSelector: string,
        parallaxAmountSelector: string
    ) {

        const tiltHoverReferences: NodeListOf<HTMLElement> = document.querySelectorAll(hoverReferenceSelector);

        tiltHoverReferences.forEach(tiltHoverReference => {
            const elementTilted = tiltHoverReference.querySelector(elementTiltedSelector) as HTMLElement | null;
            const elementsParallaxed = tiltHoverReference.querySelectorAll(elementsParallaxedSelector) as NodeListOf<HTMLElement>;
            const parallaxAmounts: number[] = Array.from(elementsParallaxed).map((element) => {
                return parseFloat(element.getAttribute(parallaxAmountSelector) || this.defaultParallaxAmount);
            });

            if (elementTilted || elementsParallaxed.length > 0) {
                tiltHoverReference.addEventListener('mouseenter', () => this.handleMouseEnter(elementTilted, elementsParallaxed));
                tiltHoverReference.addEventListener('mousemove', (e: MouseEvent) => this.handleMouseMove(e, tiltHoverReference, elementTilted, elementsParallaxed, parallaxAmounts));
                tiltHoverReference.addEventListener('mouseleave', () => this.handleMouseLeave(elementTilted, elementsParallaxed));
            }
        });
    }

    private handleMouseEnter(elementTilted: HTMLElement | null, elementsParallaxed: NodeListOf<HTMLElement>) {
        this.applyTransform(elementTilted, this.mouseEnterDelay, this.defaultCSSTransform, this.perspective);

        elementsParallaxed.forEach(element => {
            this.applyTransform(element, this.mouseEnterDelay, this.defaultCSSTransform, this.perspective);
        });
    }

    private handleMouseMove(event: MouseEvent, tiltHoverReference: HTMLElement, elementTilted: HTMLElement | null, elementsParallaxed: NodeListOf<HTMLElement>, parallaxAmounts: number[]) {
        const parentPosition = tiltHoverReference.getBoundingClientRect();
        const cardHalfWidth = parentPosition.width / 2;
        const cardHalfHeight = parentPosition.height / 2;
        const mx = event.clientX - parentPosition.left;
        const my = event.clientY - parentPosition.top;

        const xTilt = (mx - cardHalfWidth) / this.tiltAmountDivider;
        const yTilt = -(my - cardHalfHeight) / this.tiltAmountDivider;
        const cardTransform = `rotateX(${yTilt}deg) rotateY(${xTilt}deg)`;

        this.applyTransform(elementTilted, this.mouseHoverDelay, cardTransform, this.perspective);

        elementsParallaxed.forEach((element, index) => {
            const parallaxFactor = parallaxAmounts[index] || parseFloat(this.defaultParallaxAmount);
            const xParallax = (mx - cardHalfWidth) * 0.001 * parallaxFactor;
            const yParallax = (my - cardHalfHeight) * 0.001 * parallaxFactor;
            const parallaxTransform = `translateX(${xParallax}px) translateY(${yParallax}px) rotateX(${xParallax}deg) rotateY(${yParallax}deg)`;
            this.applyTransform(element, this.mouseHoverDelay, parallaxTransform, this.perspective);
        });
    }

    private handleMouseLeave(elementTilted: HTMLElement | null, elementsParallaxed: NodeListOf<HTMLElement>) {
        this.applyTransform(elementTilted, this.mouseLeaveDelay, this.defaultCSSTransform, this.perspective);

        elementsParallaxed.forEach(element => {
            this.applyTransform(element, this.mouseLeaveDelay, this.defaultCSSTransform, this.perspective);
        });
    }

    private applyTransform(element: HTMLElement | null, transition: string, transform: string, perspective: string) {
        if (element) {
            element.style.transition = transition;
            element.style.transform = `${perspective} ${transform}`;
        }
    }
}
