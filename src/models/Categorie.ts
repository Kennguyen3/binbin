
import {Product} from './Product';
export interface Categorie {
  "id": number;
  "user_id": number;
  "name": string;
  "description": string;
  "order": number;
  "created_at": string;
  "updated_at": string;
  "products": Product[] | null;
}