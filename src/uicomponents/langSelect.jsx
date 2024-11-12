import React from "react";
import Select from "react-select";

const options = [
  {
    value: "english",
    label: "English",
    flag: "https://flagcdn.com/16x12/gb.png",
  },
  {
    value: "spanish",
    label: "Spanish",
    flag: "https://flagcdn.com/16x12/es.png",
  },
  {
    value: "french",
    label: "French",
    flag: "https://flagcdn.com/16x12/fr.png",
  },
];

const customSingleValue = (props) => {
  const { data } = props;
  return (
    <div
      style={{ display: "flex", alignItems: "center", lineHeight: "normal" }}>
      <img
        src={data.flag}
        alt={data.label}
        style={{ width: 20, height: 15, marginRight: 10 }}
      />
      {data.label}
    </div>
  );
};

const LangSelect = () => {
  return (
    <Select
      options={options}
      defaultValue={options[0]}
      isSearchable={false}
      components={{ SingleValue: customSingleValue }}
      styles={{
        control: (base) => ({
          ...base,
          width: "150px",
          border: "none",
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
        }),
        singleValue: (base) => ({
          ...base,
          display: "flex",
          alignItems: "center",
        }),
        dropdownIndicator: (base) => ({
          ...base,
          display: "none",
        }),
        indicatorSeparator: () => ({
          display: "none",
        }),
      }}
    />
  );
};

export default LangSelect;
