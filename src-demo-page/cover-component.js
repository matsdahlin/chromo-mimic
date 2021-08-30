const coverComponent = {
  transitioning: false,
  images: [
    './images/omnivium.jpg',
    './images/iconic-single.jpg',
    './images/white-album.jpeg',
    './images/diluvium.jpg',
    './images/wings-of-fire.jpg',
    './images/reinkaos.jpg',
    './images/firewind.jpeg',
  ],
  currentImageIndex: 0,
  swapBackgrounds() {
    const root = document.documentElement;
    const nextBackgroundGradient = root.style.getPropertyValue('--album-gradient-back');
    root.style.setProperty('--album-gradient', nextBackgroundGradient);
    this.transitioning = false;
  },
  async nextImage() {
    this.currentImageIndex++;

    if (this.currentImageIndex >= this.images.length) {
      this.currentImageIndex = 0;
    }
    this.transitioning = true;
    await this.getGradient(this.currentImageIndex);
  },
  async previousImage() {
    this.currentImageIndex--;

    if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.images.length - 1;
    }
    this.transitioning = true;
    await this.getGradient(this.currentImageIndex);
  },
  async init() {
    const highestColor = await ChromoMimic.getColorFromImage(this.images[0]);

    this.setVarGradient('--album-gradient', highestColor);
  },
  async getGradient(index) {
    const highestColor = await ChromoMimic.getColorFromImage(this.images[index]);
    console.log(highestColor);

    this.setVarGradient('--album-gradient-back', highestColor);
  },
  setVarGradient(gradientProperty, baseColor) {
    const gradient = `linear-gradient(hsl(${baseColor.h},${baseColor.s}%,${baseColor.l}%), hsl(${
      baseColor.h
    },${baseColor.s}%,${baseColor.l * 0.5}%))`;

    const root = document.documentElement;
    root.style.setProperty(gradientProperty, gradient);

    const shadowColor = `hsla(${baseColor.h},${baseColor.s}%,${baseColor.l * 0.4}%, 0.8)`;
    root.style.setProperty('--album-shadow-color', shadowColor);
  },
};
