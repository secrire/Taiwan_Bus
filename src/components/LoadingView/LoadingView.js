import React from "react";

import Loading from "images/Loading.gif";
import * as Style from "./style";

const LoadingView = () => (
  <Style.Container>
    <img src={Loading} alt="loading" />
    <div>Thinking...</div>
  </Style.Container>
);

export default LoadingView;
