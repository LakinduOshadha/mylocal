import {FIELD_NAME_TO_COLOR} from 'constants/ColorConstants.js';
import MathX from 'base/MathX.js';

export function hsla(h, s, l, a) {
  return `hsl(${h},${s}%,${l}%, ${a})`;
}

export function getRandomColor() {
  const h = MathX.randomInt(0, 360);
  const s = MathX.randomInt(20, 80);
  const l = MathX.randomInt(20, 80);
  return hsla(h, s, l, 1);
}

export function getFieldNameColor(fieldName) {
  const color = FIELD_NAME_TO_COLOR[fieldName];
  if (color) {
    return color;
  }
  FIELD_NAME_TO_COLOR[fieldName] = getRandomColor();
  return FIELD_NAME_TO_COLOR[fieldName];
}
