export default ({ $slider }, isAnalyzedDataAttr) => {
    const $activeSlide = $slider.find('.slick-current .heroCarousel-slide');
    const isAnalyzedSlide = $activeSlide.data(isAnalyzedDataAttr);

    if (isAnalyzedSlide) return { isAnalyzedSlide };

    const $activeSlideImg = $activeSlide.find('.heroCarousel-image');
    const activeSlideImgSrc = $activeSlideImg.attr('src');
    const $slidesWithSameImgSrc = $slider.find('.heroCarousel-slide').filter((idx, slide) => (
        $(slide).find('.heroCarousel-image').attr('src') === activeSlideImgSrc
    ));
    const attrsObj = {
        src: activeSlideImgSrc,
        'src-set': $activeSlideImg.attr('src-set'),
        sizes: $activeSlideImg.attr('sizes'),
    };

    return {
        attrsObj,
        $activeSlide,
        $slidesWithSameImgSrc,
    };
};
