import React from "react";

type RadioOption = {
  value: string;
  label: string;
};

type RadioGroupProps = {
  name: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="bg-gray-100 px-3 py-4 rounded-2 d-flex align-items-center gap-5">
      {options.map((option) => (
        <div key={option.value} className="d-flex align-items-center gap-2">
          <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
          <input
            className="form-check-input widget-9-radio xRadioBg"
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
          </div>
          <label className="fs-7">{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
