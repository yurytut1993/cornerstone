const SLIDE_NUMBER = '[SLIDE_NUMBER]';

export default ($dots, activeSlideIdx, slidesQuantity, { carouselDotAriaLabel, carouselActiveDotAriaLabel }) => {
    if (!$dots) return;

    if (slidesQuantity < 2) {
        $dots.css('display', 'none');
        return;
    }

    $dots.css('display', 'block');

    $dots.children().each((idx, dot) => {
        const dotSlideStatusText = idx === activeSlideIdx ? `, ${carouselActiveDotAriaLabel}` : '';
        const dotAriaLabel = `${carouselDotAriaLabel.replace(SLIDE_NUMBER, idx + 1)}${dotSlideStatusText}`;

        $(dot).find('.js-carousel-dot').attr('aria-label', dotAriaLabel);
    });
};
