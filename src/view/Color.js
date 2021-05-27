let FIELD_NAME_TO_COLOR = {
  'bharatha': 'hsl(21, 100%, 80%)',
  'burgher': 'purple',
  'chetty': 'blue',
  'indian_tamil': 'hsl(21, 100%, 60%)',
  'malay': 'hsl(165, 100%, 34%)',
  'moor': 'hsl(165, 100%, 17%)',
  'other': 'ghostwhite',
  'sinhalese': 'hsl(355, 63%, 34%)',
  'sri_lankan_tamil': 'hsl(21, 100%, 50%)',
  'buddhist': 'hsl(43, 100%, 50%)',

  'others': 'gray',

  'female': 'pink',
  'male': 'cyan',
};

FIELD_NAME_TO_COLOR['islam'] = FIELD_NAME_TO_COLOR['moor'];
FIELD_NAME_TO_COLOR['hindu'] = FIELD_NAME_TO_COLOR['sri_lankan_tamil'];
FIELD_NAME_TO_COLOR['islam'] = FIELD_NAME_TO_COLOR['moor'];
FIELD_NAME_TO_COLOR['roman_catholic'] = FIELD_NAME_TO_COLOR['burgher'];
FIELD_NAME_TO_COLOR['other_christian'] = FIELD_NAME_TO_COLOR['chetty'];


export function hsla(h, s, l, a) {
  return `hsl(${h},${s}%,${l}%, ${a})`;
}

export function getRandomColor() {
  const l = parseInt(Math.random() * 100);
  return hsla(210, 100, l, 0.8);
}


export function getFieldNameColor(fieldName) {
  const color = FIELD_NAME_TO_COLOR[fieldName];
  if (color) {
    return color;
  }
  FIELD_NAME_TO_COLOR[fieldName] = getRandomColor();
  return FIELD_NAME_TO_COLOR[fieldName];
}
