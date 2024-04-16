
// Composant de Text Area
export const AreaField = ({ id: id, name, rows = 3, placeholder}) => {
  return (
    <>
      <textarea id={id} name={name} rows={rows} placeholder={placeholder} className={'w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'}></textarea>
    </>
  );
};