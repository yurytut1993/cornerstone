import { throttle } from 'lodash';

const PLAY_ACTION = 'slickPlay';
const PAUSE_ACTION = 'slickPause';
const ACTIVATED_CLASS = 'js-play-pause-activated';

export default (carousel, slidesQuantity, context) => {
    const { $slider, $dots, speed } = carousel;
    const $playPauseButton = $slider.find('.js-hero-play-pause-button');

    if ($playPauseButton.length === 0) return;

    $playPauseButton.css('display', slidesQuantity < 2 ? 'none' : 'block');

    if ($playPauseButton.hasClass(ACTIVATED_CLASS)) return;

    const {
        carouselPlayPauseButtonPlay,
        carouselPlayPauseButtonPause,
        carouselPlayPauseButtonAriaPlay,
        carouselPlayPauseButtonAriaPause,
    } = context;

    const updateLabels = ($button, action) => {
        $button
            .text(action === PLAY_ACTION
                ? carouselPlayPauseButtonPause : carouselPlayPauseButtonPlay)
            .attr('aria-label', action === PLAY_ACTION
                ? carouselPlayPauseButtonAriaPause : carouselPlayPauseButtonAriaPlay);
    };

    const onPlayPauseClick = () => {
        const action = carousel.paused ? PLAY_ACTION : PAUSE_ACTION;

        $slider.slick(action);
        updateLabels($playPauseButton, action);
    };

    // for correct carousel controls focus order
    if ($dots) {
        $playPauseButton.insertBefore($dots);
    } else $slider.append($playPauseButton);

    $playPauseButton.on('click', throttle(onPlayPauseClick, speed, { trailing: false }));
    $playPauseButton.addClass(ACTIVATED_CLASS);

    if (carousel.breakpoints.length) {
        $slider.on('breakpoint', () => updateLabels($playPauseButton, PLAY_ACTION));
    }
};
