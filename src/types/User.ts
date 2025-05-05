export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  address: Address; 
  married: boolean;
  phone: string;
  website: string;
  company: Company;
}

export interface UserInput {
  name: string;
  username: string;
  email: string;
  married: boolean;
  phone: string;
  website: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
}

export interface UserFilters {
  search: string;
  married: boolean | null;
} 