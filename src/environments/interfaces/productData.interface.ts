export interface Review {
  review_id: string;
  product_id: string;
  user_id: string;
  comment: string;
  rate: number;
}

export interface ProductData {
  product_id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  availability: number;
  rating: number;
  img: string;
  review: Review;
}
