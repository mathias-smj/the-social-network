const InputField = ({ id, type, label, required }) => {
  return (
    <>
      <label htmlFor={id} className={'font-bold'}>
        {label}
      </label>
      <input className={'border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500'} type={type} id={id} name={id} required={required} />
    </>
  );
};

export default InputField