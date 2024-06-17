import { settingsTestimonials } from "../settings/settings-testimonials";

interface Selectors {
    fadeElements: string;
    slideElements: string;
    card: string;
    arrowLeft: string;
    arrowRight: string;
}

const SELECTORS: Selectors = settingsTestimonials.domSelector;
const cards: NodeListOf<HTMLElement> = document.querySelectorAll(SELECTORS.card);
const arrowLeft: HTMLElement | null = document.querySelector(SELECTORS.arrowLeft);
const arrowRight: HTMLElement | null = document.querySelector(SELECTORS.arrowRight);
let currentIndex = 0;

cards.forEach((card, index) => {
    const elements = card.querySelectorAll(`${SELECTORS.fadeElements}, ${SELECTORS.slideElements}`);
    elements.forEach(el => {
        (el as HTMLElement).style.opacity = index === currentIndex ? '1' : '0';
    });
});

function animate(elements: NodeListOf<Element>, animationState: Keyframe[], stagger: number = 0): Promise<Awaited<Animation>[]> {
    const animations = Array.from(elements).map((el, i) => {
        const config = { ...settingsTestimonials.animation, delay: i * stagger };
        return (el as HTMLElement).animate(animationState, config).finished;
    });
    return Promise.all(animations);
}

async function animateOut(testimonial: HTMLElement): Promise<Awaited<Awaited<Animation>[]>[]> {
    const fadeElements = testimonial.querySelectorAll(SELECTORS.fadeElements);
    const slideElements = testimonial.querySelectorAll(SELECTORS.slideElements);
    return Promise.all([
        animate(fadeElements, settingsTestimonials.animationStates.fadeOut, settingsTestimonials.stagerDelay),
        animate(slideElements, settingsTestimonials.animationStates.slideOut, settingsTestimonials.stagerDelay)
    ]);
}

async function animateIn(testimonial: HTMLElement): Promise<Awaited<Awaited<Animation>[]>[]> {
    const fadeElements = testimonial.querySelectorAll(SELECTORS.fadeElements);
    const slideElements = testimonial.querySelectorAll(SELECTORS.slideElements);
    return Promise.all([
        animate(fadeElements, settingsTestimonials.animationStates.fadeIn, settingsTestimonials.stagerDelay),
        animate(slideElements, settingsTestimonials.animationStates.slideIn, settingsTestimonials.stagerDelay)
    ]);
}

document.addEventListener('DOMContentLoaded', () => {
    arrowRight.addEventListener('click', () => {
        const oldIndex = currentIndex;
        currentIndex = (currentIndex + 1) % cards.length;
        animateOut(cards[oldIndex]).then(() => animateIn(cards[currentIndex]));
    });

    arrowLeft.addEventListener('click', () => {
        const oldIndex = currentIndex;
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        animateOut(cards[oldIndex]).then(() => animateIn(cards[currentIndex]));
    });
});

