export const searchSelectStylesModeStyles = (darkMode) => ({
    control: (provided) => ({
      ...provided,
      backgroundColor: darkMode ? 'transperant' : '#fff',
      borderColor: darkMode ? '#555' : provided.borderColor,
      boxShadow: darkMode ? 'none' : provided.boxShadow,
      color: darkMode ? '#fff' : '#000',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: darkMode ? '#aaa' : provided.color,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: darkMode ? '#fff' : provided.color,
    }),
    option: (provided, state) => ({
      ...provided,
      zIndex: 9999,
      backgroundColor: state.isSelected
        ? (darkMode ? '#2b2b40' : '#3699ff')
        : state.isFocused
        ? (darkMode ? '#2b2b40' : '#f8f9fa')
        : darkMode ? '#1b1b29' : '#ffffff',
      color: state.isSelected
        ? (darkMode ? '#e4e6ef' : '#ffffff')
        : darkMode ? '#e4e6ef' : '#3f4254',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: darkMode ? 'transperant' : '#fff',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: darkMode ? 'transperant' : provided.backgroundColor,
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: darkMode ? '#fff' : provided.color,
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: darkMode ? '#fff' : provided.color,
      ':hover': {
        backgroundColor: darkMode ? '#555' : provided.backgroundColor,
        color: darkMode ? '#fff' : provided.color,
      },
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: "200px",
      overflowY: "auto",
      "::-webkit-scrollbar": {
        width: "8px",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#ccc",
        borderRadius: "4px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#aaa",
      },
    }),
  });