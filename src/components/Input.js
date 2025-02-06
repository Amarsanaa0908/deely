const Input = ({
  name = '',
  placeholder = '',
  value = '',
  onChange,
  onBlur,
  touched,
  errorText = '',
}) => {
  return (
    <div className='w-full flex flex-col gap-1 border-[#EEF8FD]'>
      <input
        className={
          touched &&
          errorText &&
          'outline-2 outline-red-500 border-2 border-red-500 border-[#EEF8FD]'
        }
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

      {touched && errorText && (
        <label className='text-red-500 border-[#EEF8FD]'>{errorText}</label>
      )}
    </div>
  );
};

export default Input;
