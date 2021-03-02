import getActiveSlideInfo from './getActiveSlideInfo';

const IMAGE_CLASSES = {
    vertical: 'is-vertical-image-type',
    square: 'is-square-image-type',
    analyzed: 'js-image-ratio-analyzed',
};

const defineClass = (imageAspectRatio) => {
    switch (true) {
    case imageAspectRatio > 0.8 && imageAspectRatio <= 1.2:
        return IMAGE_CLASSES.square;
    case imageAspectRatio > 1.2:
        return IMAGE_CLASSES.vertical;
    default:
        return '';
    }
};

export default ({ delegateTarget }, carousel) => {
    const {
        isAnalyzedSlide,
        attrsObj,
        $activeSlide,
        $slidesWithSameImgSrc,
    } = getActiveSlideInfo(carousel || delegateTarget.slick, IMAGE_CLASSES.analyzed);

    if (isAnalyzedSlide) return;

    $slidesWithSameImgSrc.each((idx, slide) => $(slide).addClass(IMAGE_CLASSES.analyzed));

    if ($activeSlide.find('.heroCarousel-content').length) return;

    $('<img/>')
        .load(function analyzeImageSizes() {
            const imageAspectRatio = this.height / this.width;

            $slidesWithSameImgSrc.each((idx, slide) => $(slide).addClass(defineClass(imageAspectRatio)));
        })
        .attr(attrsObj);
};
