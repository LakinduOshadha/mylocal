export async function getProvinceInfo(entityData) {
  return Object.assign({}, {
    'ISO 3166 code': entityData.id,
    'FIPS code': entityData.fips,
  });
}

export async function getDistrictInfo(entityData) {
  return Object.assign({}, {
    'ISO 3166 code': entityData.id,
    'FIPS code': entityData.fips,
    'HASC code': entityData.hasc,
  });
}

export async function getDSDInfo(entityData) {
  return Object.assign({}, {
    'ISO 3166 code': entityData.id,
    'HASC code': entityData.hasc,
  });
}

export async function getGNDInfo(entityData) {
  return Object.assign({}, {
    'ISO 3166 code': entityData.id,
    'GND Num': entityData.gnd_num,
  });
}
