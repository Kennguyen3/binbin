export interface Product {
  "id": number;
  "user_id": number;
  "category_id": number;
  "name": string;
  "description": string;
  "price": number;
  "reduced_price": string;
  "price_format": string;
  "image": string;
  "order": number;
  "quantity_sold": number;
  "has_sizes": number;
  "is_popular": number;
  "created_at": string;
  "updated_at": string;
  "image_files": string;
}