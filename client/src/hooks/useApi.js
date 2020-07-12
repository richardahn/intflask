import axios from 'axios';
import { useState, useEffect } from 'react';

/** Convenience hook to fetch data from api. Returns loading boolean and data(null if unable to fetch) */
export function useApiGet(endpoint, params, onError) {
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(endpoint, { params })
      .then((response) => setData(response.data))
      .catch((error) => {
        console.error(error);
        if (onError) {
          onError();
        }
      })
      .finally(() => setLoadingData(false));
  }, []);
  return [loadingData, data];
}
