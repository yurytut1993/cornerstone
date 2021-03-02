const TOOLTIP_CLASS = 'carousel-tooltip';
const TOOLTIP_NODE = `<span class="${TOOLTIP_CLASS}"></span>`;

const setupTooltipAriaLabel = ($node) => {
    const $existedTooltip = $node.find(`.${TOOLTIP_CLASS}`);

    if ($existedTooltip.length) {
        $existedTooltip.attr('aria-label', $node.attr('aria-label'));
    } else {
        const $tooltip = $(TOOLTIP_NODE).attr('aria-label', $node.attr('aria-label'));
        $node.append($tooltip);
    }
};

const setupArrowTooltips = (...arrowNodes) => {
    arrowNodes.forEach($arrow => setupTooltipAriaLabel($arrow));
};

const setupDotTooltips = ($dots) => {
    $dots.children().each((idx, dot) => setupTooltipAriaLabel($('.js-carousel-dot', dot)));
};

export default ($prevArrow, $nextArrow, $dots) => {
    if ($prevArrow && $nextArrow) {
        setupArrowTooltips($prevArrow, $nextArrow);
    }

    if ($dots) {
        setupDotTooltips($dots);
    }
};
