import Image from 'next/image';
import css from './style.module.css';

const RadioButton = ({
  id = '',
  name = '',
  label = '',
  icon = null,
  rightZone = '',
  value,
  defaultChecked = false,
  onChange,
}) => {
  return (
    <label
      className='cursor-pointer flex justify-between items-center border-solid border px-2 py-3 rounded-lg border-[#4FBDE4] bg-[#EEF8FD]'
      htmlFor={id}
    >
      <span className={css.radio_button}>
        <input
          className='border-[#4FBDE4] rounded-xl'
          id={id}
          name={name}
          type='radio'
          value={value}
          defaultChecked={defaultChecked}
          onChange={onChange}
        />
        {label}
      </span>

      {icon && (
        <span className={css.icon}>
          <Image width={200} height={200} className='w-8' src={icon} />
        </span>
      )}
      {rightZone && rightZone}
    </label>
  );
};

export default RadioButton;
