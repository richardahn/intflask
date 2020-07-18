import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

/** Convenience hook to get callback to post data to api.*/
export function usePostCallback(
  endpoint,
  {
    data = null,
    onSuccess = null,
    onError = null,
    onFinally = null,
    defaultLoadingValue = false,
    defaultValue = null,
    transformValue = null,
  } = {},
  callbackDependencies,
) {
  const [loadingValue, setLoadingValue] = useState(defaultLoadingValue);
  const [value, setValue] = useState(defaultValue);
  const callback = useCallback(() => {
    setLoadingValue(true);
    axios
      .post(endpoint, data)
      .then((response) => {
        let responseValue = response.data;
        if (transformValue) {
          responseValue = transformValue(responseValue);
        }
        setValue(responseValue);
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
        setLoadingValue(false);
        if (onFinally) {
          onFinally();
        }
      });
  }, callbackDependencies);
  return [callback, loadingValue, value];
}

/** Convenience hook to post data to api on load */
export function usePostEffect(
  endpoint,
  {
    data = null,
    onSuccess = null,
    onError = null,
    onFinally = null,
    defaultLoadingValue = true,
    defaultValue = null,
    transformValue = null,
  } = {},
  callbackDependencies,
) {
  const [callback, loadingValue, value] = usePostCallback(
    endpoint,
    {
      data,
      onSuccess,
      onError,
      onFinally,
      defaultLoadingValue,
      defaultValue,
      transformValue,
    },
    callbackDependencies,
  );
  useEffect(() => callback(), callbackDependencies);
  return [loadingValue, value];
}

/** Convenience hook to get callback to get data from api.*/
export function useGetCallback(
  endpoint,
  {
    params = null,
    onSuccess = null,
    onError = null,
    onFinally = null,
    defaultLoadingValue = false,
    defaultValue = null,
    transformValue = null,
  } = {},
  callbackDependencies,
) {
  const [loadingValue, setLoadingValue] = useState(defaultLoadingValue);
  const [value, setValue] = useState(defaultValue);
  const callback = useCallback(() => {
    setLoadingValue(true);
    axios
      .get(endpoint, { params })
      .then((response) => {
        let responseValue = response.data;
        if (transformValue) {
          responseValue = transformValue(responseValue);
        }
        setValue(responseValue);
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
        setLoadingValue(false);
        if (onFinally) {
          onFinally();
        }
      });
  }, callbackDependencies);
  return [callback, loadingValue, value];
}

/** Convenience hook to get data from api on load */
export function useGetEffect(
  endpoint,
  {
    params = null,
    onSuccess = null,
    onError = null,
    onFinally = null,
    defaultLoadingValue = true,
    defaultValue = null,
    transformValue = null,
  } = {},
  callbackDependencies,
) {
  const [callback, loadingValue, value] = useGetCallback(
    endpoint,
    {
      params,
      onSuccess,
      onError,
      onFinally,
      defaultLoadingValue,
      defaultValue,
      transformValue,
    },
    callbackDependencies,
  );
  useEffect(() => callback(), callbackDependencies);
  return [loadingValue, value];
}
