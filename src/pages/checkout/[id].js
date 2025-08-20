import Checkbox from '@/components/Checkbox';
import Input from '@/components/Input';
import PaymentModal from '@/components/Modals/PaymentModal';
import RadioButton from '@/components/RadioButton';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiList, callGet, callPost } from '../api/api';

const Checkout = () => {
  const router = useRouter();
  const { id } = router.query;
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState();
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [selected,setSelected] = useState("free");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) {
      callGet(`${apiList.draft}/${id}`).then((res) => {
        setItems(res?.data?.lineItems);
        setPrice(res?.data?.amount);
      });
    }
  }, [id]);

  const onSubmit = (data) => {
    setLoading(true);
    callPost(`${apiList.update}`, {
      id: id,
      email: data.email,
      phoneNumber: data.phoneNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      detail: data.detail,
      postal: data.postal,
      additionalNumber: data.additionalNumber,
      price: price,
      deliveryType: selected,
    }).then((res) => {
      setLoading(false);
      if (res.status) {
        setOpenModal(true);
        setPaymentData(res?.data);
      }
    });
  };

  return (
    <>
      <PaymentModal
        open={openModal}
        setOpen={setOpenModal}
        data={paymentData && paymentData}
      />
      <div>
        <div className='bg-white border-b border-gray-300 h-[100px]'>
          <div className='items-center flex mx-auto justify-center h-full'>
            <Link href={'https://www.thedeely.com'}>
              <img
                width={200}
                height={200}
                alt={`Deely Logo`}
                src={`https://cdn.shopify.com/s/files/1/0548/9265/8940/files/deely_x320.png?v=1632205447`}
              />
            </Link>
          </div>
          <div></div>
        </div>
        <div className='orderGrid'>
          <div className='orderGrid_form'>
            <form
              className='flex flex-col gap-8'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='gap-4 flex-col flex'>
                <span className='flex flex-col-reverse lg:flex-row justify-between items-center gap-1'>
                  <h4 className='text-black'>Холбоо барих мэдээлэл</h4>
                </span>

                <Input
                  value={watch('email')}
                  id={'email'}
                  register={register}
                  registerSetting={{ required: true }}
                  hasError={errors.email}
                  alert={`Имэйл хаяг оруулна уу`}
                  placeholder='И-мэйл'
                />

                <div className='flex'>
                  <Checkbox />
                  <span className='text-black'>
                    Цаашид и-мэйл ээр мэдээлэл авмаар байна
                  </span>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <span className='flex flex-col-reverse lg:flex-row justify-between items-center gap-1'>
                  <h4 className='text-black'>Хүргэлтийн мэдээлэл</h4>
                </span>

                {/* <Input
                  name='name'
                  placeholder='Таны нэр'
                  value={watch('firstName')}
                  // touched={touched.name}
                  // errorText={errors.name}
                  // onChange={handleChange}
                  // onBlur={setFieldTouched}
                /> */}

                <span className='flex gap-2'>
                  <Input
                    value={watch('lastName')}
                    placeholder='Овог'
                    id={'lastName'}
                    register={register}
                    registerSetting={{ required: true }}
                    hasError={errors.lastName}
                    alert={'Овог оруулна уу'}
                    //   value={values?.phone}
                    //   errorText={errors?.phone}
                    //   touched={touched?.phone}
                    //   onChange={handleChange}
                    //   onBlur={setFieldTouched}
                  />

                  <Input
                    value={watch('firstName')}
                    placeholder='Нэр'
                    id={'firstName'}
                    register={register}
                    registerSetting={{ required: true }}
                    hasError={errors.firstName}
                    alert={'Нэр оруулна уу'}
                    //   value={values?.email}
                    //   errorText={errors?.email}
                    //   touched={touched?.email}
                    //   onChange={handleChange}
                    //   onBlur={setFieldTouched}
                  />
                </span>

                <Input
                  value={watch('address')}
                  placeholder='Хаяг'
                  id={'address'}
                  register={register}
                  registerSetting={{ required: true }}
                  hasError={errors.address}
                  alert={'Хаяг оруулна уу'}
                  // value={values.address}
                  // touched={touched.address}
                  // errorText={errors.address}
                  // onChange={handleChange}
                  // onBlur={setFieldTouched}
                />

                <Input
                  name='detail'
                  placeholder='Орцны кодтой бол оруулна уу!'
                  id={'detail'}
                  register={register}
                />

                <span className='flex gap-2'>
                  <Input placeholder='Хот' />
                  <Input
                    register={register}
                    id={'additionalNumber'}
                    value={watch('additionalNumber')}
                    placeholder='Нэмэлт утасны дугаар (optional)'
                    hasError={errors.additionalNumber}
                  />
                </span>

                <Input
                  value={watch('phoneNumber')}
                  placeholder='Утасны дугаар'
                  id={'phoneNumber'}
                  register={register}
                  registerSetting={{ required: true }}
                  hasError={errors.phoneNumber}
                  alert={'Утасны дугаар оруулна уу'}
                  // value={values.address}
                  // touched={touched.address}
                  // errorText={errors.address}
                  // onChange={handleChange}
                  // onBlur={setFieldTouched}
                />
              </div>

              <div className="space-y-2">
      {/* Free delivery option */}
      <label
        className={`flex items-start p-4 border rounded-lg cursor-pointer ${
          selected === "free"
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-white"
        }`}
      >
        <input
          type="radio"
          name="delivery"
          value="free"
          checked={selected === "free"}
          onChange={() => setSelected("free")}
          className="mt-1 mr-3 accent-blue-600"
        />
        <div className="flex justify-between w-full">
          <span className="text-sm font-medium text-gray-900">
            24–48 цагийн хооронд хүргэгдэнэ
          </span>
          <span className="text-sm font-semibold text-blue-600 mt-1">
            ҮНЭГҮЙ
          </span>
        </div>
      </label>

      {/* Paid delivery option */}
      <label
        className={`flex items-start p-4 border rounded-lg cursor-pointer ${
          selected === "paid"
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-white"
        }`}
      >
        <input
          type="radio"
          name="delivery"
          value="paid"
          checked={selected === "paid"}
          onChange={() => setSelected("paid")}
          className="mt-1 mr-3 accent-blue-600"
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">UB cab хүргэлт</span>
          <span className="text-sm text-gray-500">Зөвхөн ажлын цагаар</span>
        </div>
        <div className="ml-auto text-sm font-semibold text-gray-800">
          ₮ 20,000.00
        </div>
      </label>
    </div>

              {/* <div className='flex flex-col gap-2 text-black'>
                <h5>Хүргэлтийн хэлбэр</h5>
                <div className='border-[#4FBDE4] border rounded-md'>
                  <div className='bg-[#EEF8FD] h-11  border flex justify-between items-center bg-primary px-2'>
                  24-48 цагийн хооронд хүргэгдэнэ
                  <b>Үнэгүй</b>
                  </div>
                  <div className='bg-[#EEF8FD] h-16 border flex justify-between items-center bg-primary px-2'>
                    24-48 цагийн хооронд хүргэгдэнэ
                    <b>₮20,000.00</b>
                  </div>
                </div>
              </div> */}
              <div className='flex flex-col gap-2 text-black'>
                <h4>Төлбөрийн хэлбэр</h4>

                <RadioButton
                  icon='https://goodprice.mn/assets/payments-logos/qpay.png'
                  id='QPAY'
                  name='paymentType'
                  label='Qpay'
                  value='qpay'
                  defaultChecked={true}
                  // onChange={handleChange}
                />
              </div>

              <button
                className='text-white bg-[#4FBDE4] hover:opacity-50'
                type='submit'
                disabled={loading}
              >
                Төлбөр төлөх
              </button>
            </form>
          </div>

          <div className='orderGrid_info_wrapper'>
            <div className='orderGrid_info'>
              {items &&
                items.map((el, i) => {
                  return (
                    <div key={i} className='flex justify-between items-center'>
                      <div className='flex items-center gap-2'>
                        <figure className='relative w-16 h-16'>
                          <img
                            width={200}
                            height={200}
                            className='w-full h-full object-cover border rounded-md'
                            src={el.image}
                            alt={el.name}
                          />

                          <p className='absolute -top-2 -right-2 w-5 h-5 flex justify-center items-center rounded-full bg-gray-400 text-white'>
                            {el.quantity}
                          </p>
                        </figure>

                        <span className='text-black'>
                          {el.name}
                          <p className='text-black text-xs'>{el.variant}</p>
                        </span>
                      </div>

                      <label className='text-black'>
                        ₮ {el.price * el.quantity}
                      </label>
                    </div>
                  );
                })}

              <div className='flex flex-col gap-2 text-black'>
                <p className='flex justify-between'>
                  <label>Нийт</label>
                  <b>{price}</b>
                </p>

                <p className='flex justify-between'>
                  <label>Хүргэлт</label> Үнэгүй
                </p>

                <p className='flex justify-between'>
                  <b>Нийт</b>
                  <span>
                    <label>MNT </label>
                    {price}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
