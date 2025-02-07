import Checkbox from '@/components/Checkbox';
import Input from '@/components/Input';
import RadioButton from '@/components/RadioButton';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiList, callGet } from '../api/api';

const Checkout = () => {
  const router = useRouter();
  const { id } = router.query;
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState();

  useEffect(() => {
    if (id) {
      callGet(`${apiList.draft}/${id}`).then((res) => {
        console.log(res?.data);
        setItems(res?.data?.lineItems);
        setPrice(res?.data?.amount);
        console.log(items);
      });
    }
  }, [id]);

  const handleSubmit = () => {
    console.log('first');
  };
  return (
    <div>
      <div className='bg-white border-b border-gray-300 h-[100px]'>
        <div className='items-center flex mx-auto justify-center h-full'>
          <Image
            width={200}
            height={200}
            src={`https://cdn.shopify.com/s/files/1/0548/9265/8940/files/deely_x320.png?v=1632205447`}
          />
        </div>
        <div></div>
      </div>
      <div className='orderGrid'>
        <div className='orderGrid_form'>
          {/* <Formik
            initialValues={{
              name: '',
              email: '',
              delivery: true,
              // country: '',
              // lastname: '',
              // firstname: '',
              address: '',
              // city: '',
              // additional_phone: '',
              phone: '',
              // deliveryType: '',
              // pickup_location: '',
            }}
            validationSchema={schema}
            onSubmit={(vals) => onSubmit(vals)}
          >
            {({
              values,
              touched,
              errors,
              setFieldTouched,
              handleChange,
              handleSubmit,
            }) => ( */}
          <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
            <div className='gap-4 flex-col flex'>
              <span className='flex flex-col-reverse lg:flex-row justify-between items-center gap-1'>
                <h4>Холбоо барих мэдээлэл</h4>
              </span>

              <Input placeholder='И-мэйл' />

              <div className='flex'>
                <Checkbox />
                <span>Цаашид и-мэйл ээр мэдээлэл авмаар байна</span>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='flex flex-col-reverse lg:flex-row justify-between items-center gap-1'>
                <h4>Хүргэлтийн мэдээлэл</h4>
              </span>

              <Input
                name='name'
                placeholder='Таны нэр'
                // value={values.name}
                // touched={touched.name}
                // errorText={errors.name}
                // onChange={handleChange}
                // onBlur={setFieldTouched}
              />

              <span className='flex gap-2'>
                <Input
                  name='phone'
                  placeholder='Овог'
                  //   value={values?.phone}
                  //   errorText={errors?.phone}
                  //   touched={touched?.phone}
                  //   onChange={handleChange}
                  //   onBlur={setFieldTouched}
                />

                <Input
                  name='email'
                  placeholder='Нэр'
                  //   value={values?.email}
                  //   errorText={errors?.email}
                  //   touched={touched?.email}
                  //   onChange={handleChange}
                  //   onBlur={setFieldTouched}
                />
              </span>

              <Input
                name='address'
                placeholder='Хаяг'
                // value={values.address}
                // touched={touched.address}
                // errorText={errors.address}
                // onChange={handleChange}
                // onBlur={setFieldTouched}
              />

              <Input placeholder='Орцны кодтой бол оруулна уу!' />

              <span className='flex gap-2'>
                <Input placeholder='Хот' />
                <Input placeholder='Postal code (optional)' />
              </span>

              <Input
                name='note'
                placeholder='Утасны дугаар'
                // value={values.address}
                // touched={touched.address}
                // errorText={errors.address}
                // onChange={handleChange}
                // onBlur={setFieldTouched}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <h5>Хүргэлтийн хэлбэр</h5>

              <div className='bg-[#EEF8FD] h-11 border-[#4FBDE4] border flex justify-between items-center bg-primary rounded-md px-2'>
                24-48 цагийн хооронд хүргэгдэнэ
                <b>Үнэгүй</b>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
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
            >
              Төлбөр төлөх
            </button>
          </form>
          {/* )} */}
          {/* </Formik> */}
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
                          className='w-full h-full object-cover border rounded-md'
                          src={el.image}
                          alt='no file'
                        />

                        <p className='absolute -top-2 -right-2 w-5 h-5 flex justify-center items-center rounded-full bg-gray-400 text-white'>
                          {el.quantity}
                        </p>
                      </figure>

                      <span>
                        {el.name}
                        <p className='text-gray-500 text-xs'>{el.variant}</p>
                      </span>
                    </div>

                    <label>₮ {el.price * el.quantity}</label>
                  </div>
                );
              })}

            <div className='flex flex-col gap-2'>
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
  );
};

export default Checkout;
