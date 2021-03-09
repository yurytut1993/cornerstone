import 'slick-carousel';

import {
    activatePlayPauseButton,
    arrowAriaLabling,
    dotsSetup,
    getActiveSlideIdxAndSlidesQuantity,
    handleImageAspectRatio,
    handleImageLoad,
    setTabindexes,
    tooltipSetup,
    updateTextWithLiveData,
} from './utils';

/**
 * returns activeSlideIdx and slidesQuantity
 * based on provided carousel settings
 * @param {Object} $slickSettings
 * @returns {Object}
 */
const extractSlidesDetails = ({
    slideCount, currentSlide, breakpointSettings, activeBreakpoint, $slider,
}) => getActiveSlideIdxAndSlidesQuantity(
    breakpointSettings,
    activeBreakpoint,
    currentSlide,
    slideCount,
    $slider.data('slick').slidesToScroll,
);

export const onCarouselClick = ({
    data: $activeSlider,
}, context) => {
    const $parentContainer = $activeSlider.hasClass('productView-thumbnails') ? $('.productView-images') : $activeSlider;
    const { activeSlideIdx, slidesQuantity } = extractSlidesDetails($activeSlider[0].slick);
    const $carouselContentElement = $('[data-carousel-content-change-message]', $parentContainer);
    const carouselContentAnnounceMessage = updateTextWithLiveData(context.carouselContentAnnounceMessage, (activeSlideIdx + 1), slidesQuantity);

    $carouselContentElement.text(carouselContentAnnounceMessage);
};

export const onCarouselChange = (e, carousel, context) => {
    const {
        $dots,
        $slider,
        $prevArrow,
        $nextArrow,
        options: { infinite },
    } = carousel;

    const { activeSlideIdx, slidesQuantity } = extractSlidesDetails(carousel);

    dotsSetup($dots, activeSlideIdx, slidesQuantity, context);
    arrowAriaLabling($prevArrow, $nextArrow, activeSlideIdx, slidesQuantity, context.carouselArrowAndDotAriaLabel);
    setTabindexes($slider.find('.slick-slide'), $prevArrow, $nextArrow, activeSlideIdx, slidesQuantity, infinite);
    tooltipSetup($prevArrow, $nextArrow, $dots);
    activatePlayPauseButton(carousel, slidesQuantity, context);
};

export default function (context) {
    $('[data-slick]').each((idx, carousel) => {
        // getting element using find to pass jest test
        const $carousel = $(document).find(carousel);
        $carousel.on('init afterChange', (e, carouselObj) => onCarouselChange(e, carouselObj, context));
        $carousel.on('click', '.slick-arrow, .slick-dots', $carousel, e => onCarouselClick(e, context));

        if ($carousel.hasClass('heroCarousel')) {
            $carousel.on('init afterChange', handleImageLoad);
            $carousel.on('swipe', handleImageAspectRatio);
            $carousel.on('click', '.slick-arrow, .slick-dots', $carousel, handleImageAspectRatio);
        }

        const isMultipleSlides = $carousel.children().length > 1;
        const customPaging = isMultipleSlides
            ? () => (
                '<button data-carousel-dot type="button"></button>'
            )
            : () => {};

        $carousel.slick({
            accessibility: false,
            arrows: isMultipleSlides,
            customPaging,
            dots: isMultipleSlides,
        });
    });
}
