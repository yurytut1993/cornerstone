const allFocusableElementsSelector = '[href], button, input, textarea, select, details, [contenteditable="true"], [tabindex]';

export default ($slides, $prevArrow, $nextArrow, activeSlideIdx, slidesQuantity, isInfinite) => {
    $slides.each((idx, slide) => {
        const $slide = $(slide);
        const tabIndex = $slide.hasClass('slick-active') ? 0 : -1;
        if ($slide.is(allFocusableElementsSelector)) $slide.attr('tabindex', tabIndex);

        $slide.find(allFocusableElementsSelector).each((index, child) => {
            $(child).attr('tabindex', tabIndex);
        });
    });

    if (!$prevArrow || !$nextArrow || isInfinite) return;

    $prevArrow.attr('aria-disabled', activeSlideIdx === 0);
    $nextArrow.attr('aria-disabled', activeSlideIdx === slidesQuantity - 1);
};
