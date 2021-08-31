<script>
  import ChromoMimic from 'chromo-mimic';
  import ColorPreviewBlock from './ColorPreviewBlock.svelte';
  import ColorPreviewSlider from './ColorPreviewSlider.svelte';

  const images = [
    '/images/iconic-single.jpg',
    '/images/diluvium.jpg',
    '/images/wings-of-fire.jpg',
    '/images/firewind.jpeg',
  ];

  let defaultColor = { h: 0, s: 0, l: 50 };

  let filters = {
    saturationMin: 0,
    saturationMax: 100,
    luminosityMin: 0,
    luminosityMax: 100,
  };

  const demoImage = '/images/omnivium.jpg';
  let currentColors = ['', '', '', ''];

  const getColors = (filterValues, defaultColor) => {
    images.forEach((image, index) => {
      ChromoMimic.getColorFromImage(image, {
        defaultColor: defaultColor,
        filters: filterValues,
      }).then((extractedColor) => {
        currentColors[
          index
        ] = `hsl(${extractedColor.h}, ${extractedColor.s}%, ${extractedColor.l}%)`;
      });
    });
  };

  $: getColors(filters, defaultColor);
</script>

<section class="preview-container">
  {#each images as image, index}
    <ColorPreviewBlock demoImage={image} currentColor={currentColors[index]} />
  {/each}
</section>

<ColorPreviewSlider bind:sliderValue={filters.saturationMin} label="Saturation min" />
<ColorPreviewSlider bind:sliderValue={filters.saturationMax} label="Saturation max" />
<ColorPreviewSlider bind:sliderValue={filters.luminosityMin} label="Luminosity min" />
<ColorPreviewSlider bind:sliderValue={filters.luminosityMax} label="Luminosity max" />

<style>
  .preview-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
</style>
