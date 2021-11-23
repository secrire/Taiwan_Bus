/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-finally */

import React from "react";
import Axios from 'axios';

import { notification } from 'antd';

/**
 * useAxios
 * @param {any} defaultResponse 預設從 api 回傳的格式
 * @param {boolean} useDefaultConfig 要不要使用預設的 baseurl 跟 auth token
 */
const useAxios = (defaultResponse, globalSettingStore = null, useDefaultConfig = true) => {
  const { t } = useTranslation();
  const defaultConfig = {
    // baseURL: env.API_URL, // 以後會從 env 進來
    withCredentials: true,
  };

  if (sessionStorage.accessToken) {
    defaultConfig.headers = { Authorization: sessionStorage.accessToken };
  }

  const axios = Axios.create(useDefaultConfig ? defaultConfig : {});
  const [isLoading, setIsLoading] = React.useState(false);
  const [response, setResponse] = React.useState(defaultResponse);
  const [errorStatus, setErrorStatus] = React.useState();


  const defaultMasssge = { key: '', data: {} };
  const toggleNotification = (masssge = defaultMasssge, error, callback = () => { }) => {
    const params = { ...defaultMasssge, ...masssge };
    if (masssge.key !== '') {
      notification.error({
        message: params.key,
        description: error.toString()
      });
      // eslint-disable-next-line no-undef
      // global.state.openNotification(params.key, params.data, error, callback);
    }
  };

  const onError = async (error, isShowError = true) => {
    console.log('====error====', error);
    if (Axios.isCancel(error)) {
      // console.warn('Request canceled by user...');
    } else {
      let statudCode = 500;
      let errorKey = t(`SERVICE_ERROR.SYSTEM_ERROR`);
      let errorData = {};
      if (error.response) {
        statudCode = error.response.status;
        errorKey = (error.response.data && error.response.data.result)
          ? error.response.data.result
          : errorKey;
        errorData = (error.response.data && error.response.data.errorDesc)
          ? error.response.data.errorDesc
          : errorData;
      } else if (error.request) {
        statudCode = error.request.status;
      }

      const errorObj = {
        status: statudCode,
        errorKey,
        errorData,
      };

      if (statudCode === 302) {
        console.log(error.response.data.result);
        return;
      }

      if (statudCode === 400) {
        let message = '';
        if (error.response && error.response.data.result) {
          message = t(`SERVICE_ERROR.${error.response.data.result}`);
        } else {
          message = t(`SERVICE_ERROR.SYSTEM_ERROR`);
        }

        if (isShowError) {
          toggleNotification({
            key: message,
          }, error);
        }

        // 各頁面自己處理
        throw new Error(message);
      }

      if (statudCode === 401) {
        console.log(error.response.data.result);
        const message = t(`SERVICE_ERROR.${error.response.data.result}`);
        if (isShowError) {
          toggleNotification({ key: message }, error, () => {
            // 強制登出
            // localStorage.setItem('keepUrl', document.location.pathname);
            pageSyncLogout();
          });
        }
        return;
      }

      if (statudCode === 403) {
        let message = '';
        if (error.response && error.response.data.result) {
          message = t(`SERVICE_ERROR.${error.response.data.result}`);
        } else {
          message = t(`SERVICE_ERROR.SYSTEM_ERROR`);
        }
        if (isShowError) {
          toggleNotification({ key: message }, error, () => {
          });
        }
        window.location.href = '/invalid';
        return;
      }

      if (statudCode === 422) {
        let message = '';
        if (error.response) {
          if (error.response.data instanceof Blob) {
            message = JSON.parse(await error.response.data.text()).result;
          } else {
            message = t(`SERVICE_ERROR.${error.response.data.result}`);
          }
        }
        // console.log('isShowError', isShowError);
        if (isShowError) {
          toggleNotification({
            key: message,
          }, error);
        }
        throw new Error(message);
      }

      if (statudCode === 423) {
        let message = '';
        if (error.response && error.response.data.result) {
          message = t(`SERVICE_ERROR.${error.response.data.result}`);
        } else {
          message = t(`SERVICE_ERROR.SYSTEM_ERROR`);
        }
        if (isShowError) {
          toggleNotification({ key: message }, error, () => { });
        }
        window.location.href = '/';
        return;
      }

      if (errorKey === t(`SERVICE_ERROR.SYSTEM_ERROR`)) {
        let message = '';
        if (error.response && error.response.data.result) {
          message = t(`SERVICE_ERROR.${error.response.data.result}`);
        }

        if (isShowError) {
          toggleNotification({
            key: message || t(`SERVICE_ERROR.SYSTEM_ERROR`),
            data: { status_code: statudCode },
          }, error);
        }
        // throw new Error(message);
        throw new Error(JSON.stringify(errorObj));
      }

      throw new Error(JSON.stringify(errorObj));
    }
  };

  const exec = async (config = {}, isIgnoreGlobalSettingStore = false) => {
    let responseData = defaultResponse;

    setIsLoading(true);

    try {
      if (globalSettingStore && !isIgnoreGlobalSettingStore) {
        globalSettingStore.setSettingData((p) => ({ ...p, isLoading: true }));
      }

      const { data } = await axios(config);
      responseData = data;
      setResponse(responseData);
    } catch (e) {
      setErrorStatus(e);
      console.log(e);
      onError(e);
    } finally {
      setIsLoading(false);

      if (globalSettingStore && !isIgnoreGlobalSettingStore) {
        globalSettingStore.setSettingData((p) => ({ ...p, isLoading: false }));
      }
    }
    return responseData;
  };

  return ({
    isLoading,
    response,
    exec,
    errorStatus,
  });
};

export default useAxios;
