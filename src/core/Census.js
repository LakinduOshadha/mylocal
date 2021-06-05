import Format from 'stateless/atoms/Format.js';

export const CENSUS_TABLE_GROUPS = {
  'Demographic Information': [
    'gender_of_population',
    'age_group_of_population',
    'marital_status_of_population',
  ],
  'Household Information': [
    'communication_items_owned_by_household',
    'lighting_of_household',
    'cooking_fuel_of_household',

    'source_of_drinking_water_of_household',
    'solid_waste_disposal_by_household',
    'toilet_facilities_of_household',

    'roof_type_in_housing_unit',
    'floor_type_in_housing_unit',
    'wall_type_in_housing_units',
    'structure_of_housing_units',

    'living_quarters',
    'type_of_housing_unit',
    'occupation_status_of_housing_units',
    'year_of_construction_of_housing_unit',

    'rooms_in_housing_unit',
    'persons_living_in_housing_unit',
    'relationship_to_household_head_of_population',
    'households_living_in_housing_unit',
    'housing_ownership_status_of_household',
  ],
  'Ethno-Religious Information': [
    'ethnicity_of_population',
    'religious_affiliation_of_population',
  ],
};

export const CENSUS_TABLE_SPAN_INFO = {
  age_group_of_population: [
    ['less_than_10', 10],
    ['10_19', 10],
    ['20_29', 10],
    ['30_39', 10],
    ['40_49', 10],
    ['50_59', 10],
    ['60_69', 10],
    ['70_79', 10],
    ['80_89', 10],
    ['90_and_above', 10],
  ],
  year_of_construction_of_housing_unit: [
    ['before_80', 25],
    ['1980_1989', 10],
    ['1990_1994', 5],
    ['1995_1999', 5],
    ['2000_2004', 5],
    ['2005', 1],
    ['2006', 1],
    ['2007', 1],
    ['2008', 1],
    ['2009', 1],
    ['2010', 1],
    ['2011', 1],
  ],
  rooms_in_housing_unit: [
    ['1_room', 1],
    ['2_rooms', 1],
    ['3_rooms', 1],
    ['4_rooms', 1],
    ['5_rooms', 1],
    ['6_rooms', 1],
    ['7_rooms', 1],
    ['8_rooms', 1],
    ['9_rooms', 1],
  ],

  persons_living_in_housing_unit: [
    ['1_person', 1],
    ['2_persons', 1],
    ['3_persons', 1],
    ['4_persons', 1],
    ['5_persons', 1],
    ['6_persons', 1],
    ['7_persons', 1],
    ['8_persons', 1],
    ['9_persons', 1],
  ],
  households_living_in_housing_unit: [
    ['1_household', 1],
    ['2_households', 1],
    ['3_households', 1],
    ['4_households', 1],
    ['5_or_more', 1],
  ]
}

export function getCensusLabel(tableName) {
  return Format.titleCase(
      tableName
        .replace('_of_population', '')
        .replace('_of_household', '')
        .replace('_by_household', '')
        .replace('_in_housing_unit', '')
  );
}
