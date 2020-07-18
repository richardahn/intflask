import axios from 'axios';
import { useState, useEffect } from 'react';

/** Convenience hook to fetch data from api. Returns loading boolean and data(null if unable to fetch) */
export function useApiGet(
  endpoint,
  {
    params = {},
    onSuccess = null,
    onError = null,
    defaultData = null,
    transformData = null,
  } = {},
) {
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    axios
      .get(endpoint, { params })
      .then((response) => {
        let data = response.data;
        if (transformData) {
          data = transformData(data);
        }
        setData(data);
        if (onSuccess) {
          onSuccess();
        }
      })
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
