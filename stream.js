const video = document.getElementById('videoPlayer');
const hlsLink = 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';
document.getElementById('okButton').addEventListener('click', function () {
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(hlsLink);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.style.display = 'block';
            video.play();
            openFullscreen(video);
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = hlsLink;
        video.addEventListener('loadedmetadata', function () {
            video.style.display = 'block';
            video.play();
            openFullscreen(video);
        });
    } else {
        alert('مرورگر شما از HLS پشتیبانی نمی‌کند.');
    }
});
function openFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}
document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement) {
        video.pause();
        video.style.display = 'none';
    }
});
document.addEventListener('mozfullscreenchange', function () {
    if (!document.mozFullScreen) {
        video.pause();
        video.style.display = 'none';
    }
});
document.addEventListener('webkitfullscreenchange', function () {
    if (!document.webkitFullscreenElement) {
        video.pause();
        video.style.display = 'none';
    }
});
document.addEventListener('msfullscreenchange', function () {
    if (!document.msFullscreenElement) {
        video.pause();
        video.style.display = 'none';
    }
});