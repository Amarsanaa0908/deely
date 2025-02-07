import Image from 'next/image';
import { QRCodeCanvas } from 'qrcode.react';
import Modal from 'react-minimal-modal';

const PaymentModal = ({ open, setOpen, data, id }) => {
  const handleClick = () => {
    callGet(`${apiList.payment}/check/${data?.orderId}`).then((res) => {
      if (res?.status) {
        router.push(`/successful/${res?.data}`);
      }
    });
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className='flex flex-col items-center gap-8'>
        <b className='mx-auto flex text-xl'>Төлбөр төлөх</b>
        <QRCodeCanvas value={data && data?.qrCode} />

        <ul className='sm:hidden flex justify-center flex-wrap gap-4'>
          {data &&
            data?.urls.map((el, i) => {
              return (
                <li key={i}>
                  <a href={el.link}>
                    <Image alt={el.logo} width={50} height={50} src={el.logo} />
                  </a>
                </li>
              );
            })}
        </ul>

        <button
          className='w-full rounded-lg text-white justify-center items-center flex font-extrabold text-lg h-10 mt-4 bg-[#4FBDE4] disabled:bg-zinc-300'
          onClick={() => handleClick()}
        >
          Төлбөр шалгах
        </button>
      </div>
    </Modal>
  );
};

export default PaymentModal;
