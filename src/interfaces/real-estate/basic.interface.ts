export interface PropertyType {
  id: number;
  name: string;
  slug: string;
}

export interface PropertySubtype {
  id: number;
  name: string;
  slug: string;
  propertyTypeId: number;
}

export interface Zone {
  id: number;
  name: string;
  slug: string;
  cityId: number;
}

export interface PropertyInitialData {
  types: {
    id: number;
    name: string;
    slug: string;
  }[];
  subtypes: {
    id: number;
    name: string;
    slug: string;
    propertyTypeId: number;
  }[];
  zones: {
    id: number;
    name: string;
    slug: string;
    cityId: number;
  }[];
}
