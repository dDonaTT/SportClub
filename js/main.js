document.addEventListener('DOMContentLoaded', () => {
    const app = new PIXI.Application({
        width: 800,
        height: 600,
        backgroundColor: 0x000000
    });
    document.getElementById('video-container').appendChild(app.view);

    const videoTextures = {};
    let currentVideo = null;
    let currentSprite = null;

    function createVideoTexture(videoSrc) {
        const video = document.createElement('video');
        video.src = `videos/${videoSrc}`;
        video.crossOrigin = "anonymous";
        video.loop = false;
        video.load();

        video.addEventListener('loadeddata', () => {
            console.log(`Video ${videoSrc} loaded`);
            const texture = PIXI.Texture.from(video);
            videoTextures[videoSrc] = texture;

            currentSprite = new PIXI.Sprite(texture);
            currentSprite.width = app.screen.width;
            currentSprite.height = app.screen.height;

            app.stage.addChild(currentSprite);
            video.play();
            currentVideo = video;
            document.getElementById('video-controls').style.display = 'block';
        });

        video.addEventListener('error', (err) => {
            console.error(`Error loading video ${videoSrc}`, err);
        });

        return video;
    }

    window.playVideo = function(videoSrc) {
        app.stage.removeChildren();
        document.getElementById('video-controls').style.display = 'none';

        if (currentVideo) {
            currentVideo.pause();
            currentVideo.currentTime = 0;
        }

        if (!videoTextures[videoSrc]) {
            createVideoTexture(videoSrc);
        } else {
            const texture = videoTextures[videoSrc];
            const video = texture.baseTexture.resource.source;
            video.play();
            currentVideo = video;
            currentSprite = new PIXI.Sprite(texture);
            currentSprite.width = app.screen.width;
            currentSprite.height = app.screen.height;
            app.stage.addChild(currentSprite);
            document.getElementById('video-controls').style.display = 'block';
        }
    };

    window.pauseVideo = function() {
        if (currentVideo) {
            currentVideo.pause();
        }
    };

    window.resumeVideo = function() {
        if (currentVideo) {
            currentVideo.play();
        }
    };

    window.stopVideo = function() {
        if (currentVideo) {
            currentVideo.pause();
            currentVideo.currentTime = 0;
            app.stage.removeChild(currentSprite);
            currentVideo = null;
            currentSprite = null;
            document.getElementById('video-controls').style.display = 'none';
        }
    };
});
