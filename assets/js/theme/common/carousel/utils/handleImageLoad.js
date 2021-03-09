import getActiveSlideInfo from './getActiveSlideInfo';

const IMAGE_ERROR_CLASS = 'is-image-error';
const IS_ANALYZED_DATA_ATTR = 'image-load-analyzed';

export default (e, carousel) => {
    const {
        isAnalyzedSlide,
        attrsObj,
        $slidesWithSameImgSrc,
    } = getActiveSlideInfo(carousel, IS_ANALYZED_DATA_ATTR);

    if (isAnalyzedSlide) return;

    $slidesWithSameImgSrc.each((idx, slide) => $(slide).data(IS_ANALYZED_DATA_ATTR, true));

    $('<img/>')
        .error(() => $slidesWithSameImgSrc.each((idx, slide) => $(slide).addClass(IMAGE_ERROR_CLASS)))
        .attr(attrsObj);
};
