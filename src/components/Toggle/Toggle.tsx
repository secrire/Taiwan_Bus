import React from "react";

import * as Style from "./style";

type ToggleProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
};

const Toggle = ({ onChange, checked }: ToggleProps) => {
  return (
    <>
      <Style.Label>
        <Style.Input type="checkbox" onChange={onChange} checked={checked} />
        <Style.Span className="slider" />
      </Style.Label>
    </>
  );
};

export default Toggle;
