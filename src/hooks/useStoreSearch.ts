import { PRODUCT_SEARCH } from '@/constants/API';
import { Store } from '@/models/Store';
import {useState, useCallback} from 'react';

type SearchParams = {
  name?: string;
  type: number;
  group_shop_id?: string;
};

export const useStoreSearch = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchStores = useCallback(async (params: SearchParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(PRODUCT_SEARCH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();
      
      if (data.result && data.result.data) {
        setStores(data.result.data);
      } else {
        setStores([]);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Có lỗi xảy ra khi tìm kiếm');
      setStores([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {stores, loading, error, searchStores};
};