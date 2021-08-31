<script>
  import { blur } from 'svelte/transition';
  import ChromoMimic from 'chromo-mimic';

  const images = [
    '/images/omnivium.jpg',
    '/images/iconic-single.jpg',
    '/images/white-album.jpeg',
    '/images/diluvium.jpg',
    '/images/wings-of-fire.jpg',
    '/images/reinkaos.jpg',
    '/images/firewind.jpeg',
  ];

  let currentImageIndex = 0;
  let albumGradient = '';
  let albumGradientBack = '';
  let albumShadowColor = '';
  let isChangingGradient = false;

  function nextImage() {
    if (currentImageIndex < images.length - 1) {
      currentImageIndex++;
    } else {
      currentImageIndex = 0;
    }
  }

  function prevImage() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
    } else {
      currentImageIndex = images.length - 1;
    }
  }

  function swapGradients() {
    console.log('swap');
    albumGradient = albumGradientBack;
    isChangingGradient = false;
  }

  function setGradient(imageUrl) {
    ChromoMimic.getColorFromImage(imageUrl).then((extractedColor) => {
      albumGradientBack = `linear-gradient(hsl(${extractedColor.h}, ${extractedColor.s}%, ${
        extractedColor.l
      }%), hsl(${extractedColor.h}, ${extractedColor.s}%, ${extractedColor.l * 0.5}%))`;

      albumShadowColor = `hsla(${extractedColor.h},${extractedColor.s}%,${
        extractedColor.l * 0.4
      }%, 0.8)`;
      isChangingGradient = true;
    });
  }

  $: setGradient(images[currentImageIndex]);
</script>

<div
  style="--album-gradient: {albumGradient}; --album-gradient-back: {albumGradientBack}; --album-shadow-color: {albumShadowColor}"
  class="cover-component {isChangingGradient && 'show'}"
  on:transitionend={swapGradients}
>
  <div class="cover-and-controls">
    <button on:click={nextImage}
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
          clip-rule="evenodd"
        />
      </svg></button
    >
    <div class="cover-container">
      {#key currentImageIndex}
        <img class="cover-image" src={images[currentImageIndex]} alt="" />
      {/key}
    </div>
    <button on:click={prevImage}
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
          clip-rule="evenodd"
        />
      </svg></button
    >
  </div>
</div>

<style>
  button {
    cursor: pointer;
    border: none;
    background: none;
    color: rgba(255, 255, 255, 0.4);
    width: 100px;
    height: 100px;
    transition: transform 200ms;
  }

  button:hover {
    color: rgba(255, 255, 255, 0.8);
    transform: scale(1.05);
  }

  .cover-and-controls {
    display: flex;
    align-items: center;
    gap: 2rem;
    z-index: 1;
  }

  .cover-component {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-image: var(--album-gradient);
    flex-direction: column;
    gap: 1rem;
    user-select: none;
    height: 800px;
  }

  .cover-component::before {
    opacity: 0;
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: var(--album-gradient-back);
  }

  .show.cover-component::before {
    opacity: 1;
    transition: opacity 350ms linear;
  }

  .cover-container {
    justify-content: center;
    padding: 2rem 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .cover-image {
    width: 300px;
    height: 300px;
    box-shadow: 0px 0px 10px 0px var(--album-shadow-color),
      0px 0px 85px 0px var(--album-shadow-color);
  }
</style>
