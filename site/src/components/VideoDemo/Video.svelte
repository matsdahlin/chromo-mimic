<script>
  import ChromoMimic from 'chromo-mimic';

  let video;
  let currentColor = { h: 0, s: 0, l: 0 };

  const demoVideoCanvas = document.createElement('canvas');
  const demoVideoContext = demoVideoCanvas.getContext('2d');

  async function updateFrameColor() {
    demoVideoContext.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
    const extractedColor = await ChromoMimic.getColorFromImageData(
      demoVideoContext.getImageData(0, 0, video.clientWidth, video.clientHeight),
      {
        defaultColor: { h: 0, s: 0, l: 0 },
        filters: {
          saturationMin: 40,
          saturationMax: 90,
          luminosityMin: 30,
          luminosityMax: 100,
        },
      }
    );
    currentColor = extractedColor;
  }

  function renderLoop() {
    (function loop() {
      if (!video.paused && !video.ended) {
        updateFrameColor();
        setTimeout(loop, 1000 / 24); // drawing at 30fps
      }
    })();
  }
</script>

<div class="ambilight-component">
  <video
    style="--shadow-color: hsla({currentColor.h}, {currentColor.s}%, {currentColor.l}%, 1);"
    bind:this={video}
    on:play={renderLoop}
    id="demovideo"
    loop
    muted
    autoplay
  >
    <source src="/video/bigbuckbunny.mp4" />
  </video>
</div>

<style>
  .ambilight-component {
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 600px;
  }

  #demovideo {
    box-shadow: 0px 0px 76px 10px var(--shadow-color);
  }
</style>
