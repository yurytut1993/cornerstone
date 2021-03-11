export default (currentSlide, slideCount, slidesToScroll) => (
    // FYI - one slide can contain several card items for product carousel
    {
        activeSlideIdx: Math.ceil(currentSlide / slidesToScroll),
        slidesQuantity: Math.ceil(slideCount / slidesToScroll),
    }
);
