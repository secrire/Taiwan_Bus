import { useState } from "react";
import Axios from "axios";
import jsSHA from "jssha";

const useAxios = (defaultResponse, useDefaultConfig = true) => {
  const getAuthorizationHeader = () => {
    let AppID = "a5230eea3cd3455182bbcf200a669baf";
    let AppKey = "PBxVqlKmQ5RhdV1H58xmfUJ8gMQ";
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA("SHA-1", "TEXT");
    ShaObj.setHMACKey(AppKey, "TEXT");
    ShaObj.update("x-date: " + GMTString);
    let HMAC = ShaObj.getHMAC("B64");
    let Authorization =
      'hmac username="' +
      AppID +
      '", algorithm="hmac-sha1", headers="x-date", signature="' +
      HMAC +
      '"';
    return { Authorization: Authorization, "X-Date": GMTString };
  };
  const defaultConfig = {
    baseURL: "https://ptx.transportdata.tw/MOTC",
    headers: getAuthorizationHeader(),
    // withCredentials: true,
  };

  // if (sessionStorage.accessToken) {
  //   defaultConfig.headers = { Authorization: sessionStorage.accessToken };
  // }

  const instance = Axios.create(useDefaultConfig ? defaultConfig : {});
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(defaultResponse);
  const [errorStatus, setErrorStatus] = useState();

  const exec = async (config = {}) => {
    let responseData = defaultResponse;

    setIsLoading(true);

    try {
      const { data } = await instance(config);
      responseData = data;
      setResponse(responseData);
    } catch (e) {
      setErrorStatus(e);
      console.log("useAxios error ----", e);
    } finally {
      setIsLoading(false);
    }
    return responseData;
  };

  return {
    isLoading,
    response,
    exec,
    errorStatus,
  };
};

export default useAxios;
