import React, { ReactNode, useState } from "react";
import { useIntl } from "react-intl";

interface InputFieldProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  icon?: ReactNode;
  required?: string;
  register?: any;
  file?: any;
  setFile?: any;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange = () => {},
  disabled,
  icon,
  required,
  register,
  file,
  setFile,
}) => {
  const intl = useIntl();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }

    if (onChange) {
      onChange(e);
    }
  };

  const handleFileClick = () => {
    const fileInput = document.getElementById("file-input");
    if (fileInput) {
      fileInput.click();
    }
  };


  return (
    <div>
      {label && (
        <label
          className={`form-label text-gray-700 mb-3 px-1 fs-6 ${
            required && required === "true" ? "required" : ""
          }`}
        >
          {intl.formatMessage({ id: label })}
        </label>
      )}

      {type === "text" && (
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              {icon ? (
                icon
              ) : (
                <i className="special fa-solid fa-align-right"></i>
              )}
            </span>
          </div>
          <input
            className="form-control fs-7 fs-md-5"
            name={label}
            value={value}
            type={type}
            placeholder={intl.formatMessage({ id: placeholder })}
            disabled={disabled}
            onChange={onChange}
            {...register}
          />
        </div>
      )}

      {type === "file" && (
        <div className="file-upload">
          <label className="cursor-pointer w-100 btn" onClick={handleFileClick}>
            {file ? (
              file?.name || (file as string).split("/").pop()
            ) : (
              <span>
                <i className="fa-solid fa-paperclip mx-2"></i>
                {placeholder && intl.formatMessage({ id: placeholder })}
              </span>
            )}
          </label>
          <input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
};

export default InputField;
