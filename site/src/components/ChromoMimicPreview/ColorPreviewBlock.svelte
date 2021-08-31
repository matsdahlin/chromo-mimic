<script>
  export let demoImage = '';
  export let currentColor = '';
</script>

<div class="container">
  <img src={demoImage} alt="Demo" />
  <div style="--preview-box: {currentColor};" class="extracted-color" />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  img {
    height: 200px;
  }

  .extracted-color {
    width: 100px;
    height: 100px;
    background: var(--preview-box);
  }
</style>
