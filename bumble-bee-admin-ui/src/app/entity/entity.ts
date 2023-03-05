export interface Entity {
  id?: number;
}

export interface Brand extends Entity {
  name: string;
  description?: string;
  products?: Product[];
}

export interface Category extends Entity {
  name: string;
  description?: string;
  products?: Product[];
}

export interface Product extends Entity {
  name: string;
  description?: string;
  price: number;
  brand: Brand;
  category: Category;
}


export interface User extends Entity {
  firstName: string;
  lastName: string;

}
