const Checkbox = ({ name = '', label = '' }) => {
  return (
    <span className='select-none flex items-center'>
      <input id={name} type='checkbox' />

      <label className='cursor-pointer mt-[1.8px]' htmlFor={name}>
        {label}
      </label>
    </span>
  );
};

export default Checkbox;
