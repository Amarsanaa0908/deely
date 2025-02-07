const Input = ({
  name = '',
  placeholder = '',
  value = '',
  onChange,
  onBlur,
  touched,
  errorText = '',
  register,
  id,
  registerSetting,
  hasError,
  alert,
}) => {
  return (
    <div className='w-full flex flex-col gap-1 border-[#EEF8FD]'>
      {/* <p>{placeholder}</p> */}
      <input
        placeholder={placeholder}
        {...(register ? register(id, registerSetting) : {})}
        id={id}
        className='peer w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-purple-500'
      />
      {hasError && <span className='text-red-500 text-sm'>{alert}</span>}
    </div>
    // <div className='w-full flex flex-col gap-1'>
    //   <input
    //     className={`border-[#4FBDE4]
    //       ${
    //         touched &&
    //         errorText &&
    //         'outline-2 outline-red-500 border-2 border-[#EEF8FD]'
    //       }
    //     `}
    //     name={name}
    //     placeholder={placeholder}
    //     value={value}
    //     onChange={onChange}
    //     onBlur={onBlur}
    //   />

    //   {touched && errorText && (
    //     <label className='text-red-500 border-[#EEF8FD]'>{errorText}</label>
    //   )}
    // </div>
  );
};

export default Input;
