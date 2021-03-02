import getActiveSlideInfo from './getActiveSlideInfo';

const IMAGE_CLASSES = {
    error: 'is-image-error',
    analyzed: 'js-image-load-analyzed',
};

export default (e, carousel) => {
    const {
        isAnalyzedSlide,
        attrsObj,
        $slidesWithSameImgSrc,
    } = getActiveSlideInfo(carousel, IMAGE_CLASSES.analyzed);

    if (isAnalyzedSlide) return;

    $slidesWithSameImgSrc.each((idx, slide) => $(slide).addClass(IMAGE_CLASSES.analyzed));

    $('<img/>')
        .error(() => $slidesWithSameImgSrc.each((idx, slide) => $(slide).addClass(IMAGE_CLASSES.error)))
        .attr(attrsObj);
};
