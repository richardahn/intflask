import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

/** Convenience hook to post data to api.*/
export function useApiPostCallback(
  endpoint,
  {
    payload = null,
    onSuccess = null,
    onError = null,
    onFinally = null,
    defaultData = null,
    transformData = null,
  } = {},
  callbackDependencies,
) {
  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState(defaultData);
  const sendRequest = useCallback(() => {
    setLoadingData(true);
    axios
      .post(endpoint, payload)
      .then((response) => {
        let data = response.data;
        if (transformData) {
          data = transformData(data);
        }
        setData(data);
        if (onSuccess) {
          onSuccess(response);
        }
      })
      .catch((error) => {
        console.error(error);
        if (onError) {
          onError(error);
        }
      })
      .finally(() => {
        setLoadingData(false);
        if (onFinally) {
          onFinally();
        }
      });
  }, callbackDependencies);
  return [sendRequest, loadingData, data];
}

/** Convenience hook to post data to api.*/
export function useApiPost(
  endpoint,
  {
    payload = null,
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
      .post(endpoint, payload)
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
