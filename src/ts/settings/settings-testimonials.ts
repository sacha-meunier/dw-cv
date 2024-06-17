export const settingsTestimonials = {
    domSelector: {
        fadeElements: '.testimonials-name, .testimonials-role, .testimonials-logo',
        slideElements: '.testimonials-pfp, .testimonials-pfp-desktop, .testimonials-quote-img, .testimonials-p',
        card: '.testimonials-article',
        arrowLeft: '.arrow-slider',
        arrowRight: '.arrow-2',
    },
    animation: {
        duration: 500,
        fill: 'forwards' as FillMode,
    },
    animationStates: {
        fadeIn: [
            { opacity: 0 },
            { opacity: 1 }
        ],
        fadeOut: [
            { opacity: 1 },
            { opacity: 0 }
        ],
        slideIn: [
            { transform: 'translateX(20px)', opacity: 0 },
            { transform: 'translateX(0)', opacity: 1 }
        ],
        slideOut: [
            { transform: 'translateX(0)', opacity: 1 },
            { transform: 'translateX(-20px)', opacity: 0 }
        ]
    },
    stagerDelay: 75,
};
