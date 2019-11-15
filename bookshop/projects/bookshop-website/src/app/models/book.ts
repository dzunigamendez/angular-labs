export interface Book {
  id?: number;
  title: string;
  author: string;
  price: number;
  reviews: number;
  rating: number;
  description?: string;
  image?: string;
  publishedDate?: Date;
}
