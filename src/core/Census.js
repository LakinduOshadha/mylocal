import Format from 'nonstate/atoms/Format.js';

export function getCensusLabel(tableName) {
  return Format.titleCase(
      tableName
        .replace('_of_population', '')
        .replace('_of_household', '')
        .replace('_by_household', '')
        .replace('_in_housing_unit', '')
  );
}
