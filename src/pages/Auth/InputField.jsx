import React from 'react';

const InputField = ({ id, name, type, placeholder, value, onChange, label, required }) => {
  // Remplacer null par une chaîne vide
  const sanitizedValue = value === null ? '' : value;

  return (
    <div className="mb-4">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={sanitizedValue} // Utilisation de la valeur sans null
        onChange={onChange}
        required={required}
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
      />
    </div>
  );
};

export default InputField;
