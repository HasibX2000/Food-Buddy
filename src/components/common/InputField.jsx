import React from "react";

const InputField = ({ label, type, id, value, onChange, placeholder }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-dark-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="block w-full rounded-md border p-1.5 text-dark-900 shadow-sm placeholder:text-dark-400  sm:text-sm sm:leading-6 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default InputField;
