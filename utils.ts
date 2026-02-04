export const isYouTube = (url: string) => url.includes('youtube.com') || url.includes('youtu.be');
export const isYouTubeShort = (url: string) => url.includes('/shorts/') || url.includes('?feature=share'); // common for shorts

export const getYouTubeId = (url: string) => {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|shorts\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
};

export const getYouTubeEmbedUrl = (url: string) => {
    const id = getYouTubeId(url);
    if (!id) return '';
    const params = [
        'autoplay=1',
        'mute=1',
        'loop=1',
        `playlist=${id}`,
        'controls=0',
        'modestbranding=1',
        'rel=0',
        'playsinline=1',
        'enablejsapi=1',
        'iv_load_policy=3',
        'fs=0',
        'disablekb=1',
        'widget_referrer=' + encodeURIComponent(window.location.origin)
    ].join('&');
    return `https://www.youtube.com/embed/${id}?${params}`;
};

/**
 * Returns CSS styles to make a YouTube iframe "cover" its container.
 * @param url The YouTube URL
 * @param isPortraitFrame Whether the containing frame is portrait (e.g., 4:5)
 * @param yOffset Optional Y-axis offset percentage (e.g., '5%' to move down)
 */
export const getYouTubeIframeStyle = (url: string, isPortraitFrame: boolean, yOffset: string = '0%'): React.CSSProperties => {
    const vertical = isYouTubeShort(url);

    // Default base styles
    const base: React.CSSProperties = {
        position: 'absolute',
        top: `calc(50% + ${yOffset})`,
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
    };

    if (isPortraitFrame) {
        if (vertical) {
            // 9:16 video in 4:5 frame: frame is wider than video content.
            // To fill width, we must scale the iframe height so its internal 9:16 content covers.
            // 4/5 = 0.8, 9/16 = 0.5625. Factor = 0.8 / 0.5625 = 1.422
            return { ...base, width: '100%', height: '143%' };
        } else {
            // 16:9 video in 4:5 frame: frame is much taller than video content.
            // To fill height, we scale the width.
            // 16/9 = 1.777, 4/5 = 0.8. Factor = 1.777 / 0.8 = 2.222
            return { ...base, width: '223%', height: '100%' };
        }
    } else {
        // Landscape frame (16:9)
        if (vertical) {
            // 9:16 video in 16:9 frame: frame is much wider than video content.
            // To fill width, we scale height.
            // 16/9 = 1.777, 9/16 = 0.5625. Factor = 1.777 / 0.5625 = 3.16
            return { ...base, width: '100%', height: '317%' };
        } else {
            // 16:9 video in 16:9 frame: perfect match or very close.
            return { ...base, width: '102%', height: '102%' };
        }
    }
};
