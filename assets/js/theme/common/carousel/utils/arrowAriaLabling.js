import updateTextWithLiveData from './updateTextWithLiveData';

export default ($prevArrow, $nextArrow, activeSlideIdx, slidesQuantity, { carouselArrowAriaLabel }) => {
    if (slidesQuantity < 2) return;

    if (!$prevArrow || !$nextArrow) return;

    const activeSlideNumber = activeSlideIdx + 1;

    const prevSlideNumber = activeSlideIdx === 0 ? slidesQuantity : activeSlideNumber - 1;
    const arrowLeftText = updateTextWithLiveData(carouselArrowAriaLabel, prevSlideNumber, slidesQuantity);

    $prevArrow.attr('aria-label', arrowLeftText);

    const nextSlideNumber = activeSlideIdx === slidesQuantity - 1 ? 1 : activeSlideNumber + 1;
    const arrowRightText = updateTextWithLiveData(carouselArrowAriaLabel, nextSlideNumber, slidesQuantity);

    $nextArrow.attr('aria-label', arrowRightText);
};
