import { getColorFromImage, getColorFromImageData, HSLColor, Filters } from './cm-core';

let ChromaMimic = {
  getColorFromImage,
  getColorFromImageData,
};

export default ChromaMimic;

window.ChromaMimic = ChromaMimic;
