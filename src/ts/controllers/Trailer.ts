export class Trailer {
    private trailer: HTMLElement | null;
    private scaleFactor: number;
    private animationDuration: number;
    private animationRefreshRate: number;
    private animationFrameId: number | null = null;
    private centerX: number;
    private centerY: number;

    constructor(selector: string, scaleFactor: number, animationDuration: number, animationRefreshRate: number) {
        this.trailer = document.querySelector(selector);
        this.scaleFactor = scaleFactor;
        this.animationDuration = animationDuration;
        this.animationRefreshRate = animationRefreshRate;

        if (this.trailer) {
            this.updateCenter();
            window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
            window.addEventListener('resize', () => this.updateCenter());
        } else {
            console.warn(`Element with selector ${selector} not found.`);
        }
    }

    private updateCenter() {
        this.centerX = window.innerWidth / 2;
        this.centerY = window.innerHeight / 2;
    }

    private handleMouseMove(event: MouseEvent) {
        const target = event.target as HTMLElement | null;
        const isInteractableElement = target?.closest("[data-action='trailer']") as HTMLElement | null;
        const interacting = isInteractableElement !== null;

        if (this.trailer) {
            if (interacting) {
                this.updateTrailerColor(isInteractableElement);
            } else {
                this.resetTrailerColor();
            }

            this.trailer.dataset.type = interacting ? isInteractableElement?.dataset.type || "" : "";

            if (!this.animationFrameId) {
                this.animationFrameId = requestAnimationFrame(() => {
                    this.animationFrameId = null;
                    this.animateTrailer(event, interacting);
                });
            }
        }
    }

    private animateTrailer(event: MouseEvent, interacting: boolean) {
        if (!this.trailer) return;

        const x = event.clientX - this.trailer.offsetWidth / 2 - this.centerX;
        const y = event.clientY - this.trailer.offsetHeight / 2 - this.centerY;

        const keyframes = {
            transform: `translate(${x}px, ${y}px) scale(${interacting ? this.scaleFactor : 1})`,
        };

        this.trailer.animate(keyframes, {
            duration: this.animationDuration,
            fill: "forwards",
        });
    }

    private updateTrailerColor(element: HTMLElement) {
        if (!this.trailer) return;

        const actionType = element.dataset.type;
        if (actionType === "white") {
            this.trailer.classList.add('white');
            this.trailer.classList.remove('colorful');
        } else {
            this.trailer.classList.add('colorful');
            this.trailer.classList.remove('white');
        }
    }

    // Réinitialiser la couleur du trailer à la couleur par défaut
    private resetTrailerColor() {
        if (!this.trailer) return;

        this.trailer.classList.remove('colorful', 'white');
    }
}
