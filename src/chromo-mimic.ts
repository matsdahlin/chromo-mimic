import { getColorFromImage, getColorFromImageData } from './core';

let ChromoMimic = {
  getColorFromImage,
  getColorFromImageData,
};

export default ChromoMimic;

(window as any).ChromoMimic = ChromoMimic;
