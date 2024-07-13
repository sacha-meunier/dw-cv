/**
 * Parallax is a class which applies parallax on all elements that contains the selector
 *
 * @param selector is the selector used to apply parallax on all elements.
 * @var elements is an array filled with all elements that needs parallax.
 */
export class Parallax {
    private elements: NodeListOf<HTMLElement>;
    private animationFrameId: number | null = null;

    constructor(selector: string) {
        this.elements = document.querySelectorAll(`${selector}`);
        this.init();
    }

    private init() {
        if (!this.elements.length) return;

        this.elements.forEach(element => {
            const amount = parseFloat(element.getAttribute('data-parallax-amount') || '30');
            const parentSelector = element.getAttribute('data-parallax-parent');
            const parent = parentSelector ? document.querySelector<HTMLElement>(`${parentSelector}`) : window;

            if (!parent) return;

            const mouseMoveHandler = (event: MouseEvent) => this.scheduleUpdate(event, element, amount, parent);
            const mouseLeaveHandler = () => this.resetPosition(element);

            parent.addEventListener('mousemove', mouseMoveHandler);
            parent.addEventListener('mouseleave', mouseLeaveHandler);
        });
    }

    private scheduleUpdate(event: MouseEvent, element: HTMLElement, amount: number, parent: HTMLElement | Window) {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.animationFrameId = requestAnimationFrame(() => this.handleMouseMove(event, element, amount, parent));
    }

    private handleMouseMove(event: MouseEvent, element: HTMLElement, amount: number, parent: HTMLElement | Window) {
        const rect = parent instanceof HTMLElement ? parent.getBoundingClientRect() : {
            width: window.innerWidth,
            height: window.innerHeight,
            left: 0,
            top: 0,
        };

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const percentX = mouseX / rect.width - 0.5;
        const percentY = mouseY / rect.height - 0.5;

        const moveX = -percentX * amount; // Negative value means the element goes away from the mouse.
        const moveY = -percentY * amount;

        element.style.transition = 'transform 0.2s ease-out';
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    private resetPosition(element: HTMLElement) {
        element.style.transition = 'transform 0.2s ease-out';
        element.style.transform = 'translate(0, 0)';
    }
}