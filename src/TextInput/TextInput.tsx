import React from "react";

import "./styles.css";

type Props = {
  name: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type: "text" | "number";
};

export const TextInput = ({ name, value, onChange, type }: Props) => {
  return (
    <div>
      <div className="name">{name}</div>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
      />
    </div>
  );
};
