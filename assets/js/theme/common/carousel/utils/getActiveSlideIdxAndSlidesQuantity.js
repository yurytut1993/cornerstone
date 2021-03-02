export default (
    breakpointSettings,
    activeBreakpoint,
    currentSlide,
    slideCount,
    defaultSlidesToScrollQuantity = 1,
) => {
    const slidesToScrollQuantity = activeBreakpoint
        /* eslint-disable dot-notation */
        ? breakpointSettings[activeBreakpoint]['slidesToScroll']
        : defaultSlidesToScrollQuantity;

    // FYI - one slide can contain several card items for product carousel
    return {
        activeSlideIdx: Math.ceil(currentSlide / slidesToScrollQuantity),
        slidesQuantity: Math.ceil(slideCount / slidesToScrollQuantity),
    };
};
