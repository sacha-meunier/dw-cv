/**
 * This class makes a magnetic effect on a button and it's components
 */
export class MagneticButton {
    private elements: NodeListOf<HTMLElement>;
    private parentCoefficientX: number;
    private parentCoefficientY: number;
    private childCoefficientX: number;
    private childCoefficientY: number;
    private transitionInDuration: number;
    private transitionOutDuration: number;

    constructor(selector: string) {
        this.parentCoefficientX = 0.05;
        this.parentCoefficientY = 0.1;
        this.childCoefficientX = 0.025;
        this.childCoefficientY = 0.05;
        this.transitionInDuration = 100;
        this.transitionOutDuration = 300;

        this.elements = document.querySelectorAll(`${selector}`);

        this.elements.forEach(el => {
            el.addEventListener('mousemove', this.handleMouseMove);
            el.addEventListener('mouseleave', this.handleMouseLeave);
        });
    }

    private handleMouseMove = (event: MouseEvent) => {
        const element = event.currentTarget as HTMLElement;
        const pos = element.getBoundingClientRect();
        const mx = event.clientX - pos.left - pos.width / 2;
        const my = event.clientY - pos.top - pos.height / 2;

        element.style.transition = `transform ${this.transitionInDuration}ms ease`;
        element.style.transform = `translate(${mx * this.parentCoefficientX}px, ${my * this.parentCoefficientY}px)`;

        Array.from(element.children).forEach(child => {
            const childElement = child as HTMLElement;
            childElement.style.transform = `translate(${mx * this.childCoefficientX}px, ${my * this.childCoefficientY}px)`;
        });
    };

    private handleMouseLeave = (event: MouseEvent) => {
        const element = event.currentTarget as HTMLElement;

        element.style.transition = `transform ${this.transitionOutDuration}ms ease`;
        element.style.transform = 'translate(0, 0)';

        Array.from(element.children).forEach(child => {
            const childElement = child as HTMLElement;
            childElement.style.transform = 'translate(0, 0)';
        });
    };
}

