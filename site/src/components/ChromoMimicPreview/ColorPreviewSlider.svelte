<script>
  export let sliderValue;
  export let label = '';
</script>

<label for="saturation-min">{label}:</label>
<input type="range" bind:value={sliderValue} min="0" max="100" />

<style>
  /* input[type='range'] {
    -webkit-appearance: none;
    width: 100%;
    background: transparent;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
    margin-top: -14px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }

  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #3071a9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }

  input[type='range']:focus::-webkit-slider-runnable-track {
    background: #367ebd;
  } */
</style>
