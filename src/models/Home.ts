import { Store } from './Store';
export interface Home {
  closest_stores: Store[];
  new_stores: Store[];
  stores_with_most_vouchers: Store[];
  all_nearby_stores: Store[];
}
