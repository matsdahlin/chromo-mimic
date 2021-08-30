const video = document.getElementById('demovideo');
const demoVideoCanvas = document.createElement('canvas');
const canvasContext = demoVideoCanvas.getContext('2d');
const root = document.documentElement;

async function setGradient() {
  canvasContext.drawImage(video, 0, 0);
  const baseColor = await ChromoMimic.getColorFromImageData(
    canvasContext.getImageData(0, 0, video.clientWidth, video.clientHeight),
    {
      filters: {
        saturationMin: 5,
        saturationMax: 100,
        luminosityMin: 5,
        luminosityMax: 90,
      },
      defaultColor: { h: 0, s: 0, l: 30 },
    }
  );
  const gradient = `linear-gradient(hsl(${baseColor.h},${baseColor.s}%,${baseColor.l}%), hsl(${
    baseColor.h
  },${baseColor.s}%,${baseColor.l * 0.8}%))`;

  root.style.setProperty('--video-background', gradient);

  const shadowColor = `hsla(${baseColor.h},${baseColor.s}%,${baseColor.l * 0.6}%, 0.8)`;
  root.style.setProperty('--video-shadow-color', shadowColor);
}

let videoIsPlaying = false;
video.addEventListener('click', () => {
  if (videoIsPlaying) {
    video.stop();
    videoIsPlaying = false;
  } else {
    video.start();
    videoIsPlaying = true;
  }
});

video.addEventListener('loadeddata', function (e) {
  demoVideoCanvas.width = video.clientWidth;
  demoVideoCanvas.height = video.clientHeight;
  video.currentTime = 6;
  setGradient();
});

video.addEventListener(
  'play',
  function () {
    var $this = this;
    (function loop() {
      if (!$this.paused && !$this.ended) {
        setGradient();
        setTimeout(loop, 1000 / 24); // drawing at 30fps
      }
    })();
  },
  0
);
