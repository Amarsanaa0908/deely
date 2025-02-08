import { useEffect, useState } from 'react';
import { CiCircleCheck } from 'react-icons/ci';
import { FaAngleDown } from 'react-icons/fa6';
import { LuShoppingCart } from 'react-icons/lu';

import css from '@/styles/thankU.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { apiList, callGet } from '../api/api';

const Successful = () => {
  const router = useRouter();
  const { id } = router.query;
  const [mblShowSummary, setMblShowSummary] = useState(false);
  const [data, setData] = useState();
  const [product, setProduct] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    if (id) {
      callGet(`${apiList.order}/${id}`).then((res) => {
        console.log(res);
        setData(res?.data?.order);
        setProduct(res?.data?.order?.line_items[0]?.product_id);
      });

      // if (product) {
      //   callGet(`${apiList.product}/${product}`).then((res) => {
      //     setImage(res?.data?.image);
      //   });
      // }
    }
  }, [id]);

  const renderMobileSummary = () => {
    return (
      <>
        <img
          className={css.mblLogo}
          src={
            'https://cdn.shopify.com/s/files/1/0548/9265/8940/files/deely_x320.png?v=1632205447'
          }
        />
        <div className={css.mblSummary}>
          <button
            className={css.mblSummary_headWrapper}
            onClick={() => setMblShowSummary((prev) => !prev)}
          >
            <div className={css.mblSummary_head}>
              <span>
                <LuShoppingCart size={22} />
                <p className={css.mblSummary_head_text}>
                  {mblShowSummary ? 'Hide' : 'Show'} order summary
                </p>
                <FaAngleDown style={{ marginTop: 6 }} />
              </span>
              <b className={css.mblSummary_head_payment}>₮188000</b>
            </div>
          </button>

          <div
            className={css.mblSummary_bodyWrapper}
            style={{
              height: mblShowSummary ? 392 : 0,
              borderWidth: mblShowSummary ? 1 : 0,
            }}
          >
            <div className={css.mblSummary_body}>
              {data?.line_items &&
                data?.line_items.map((el, i) => {
                  return (
                    <div className={css.summary_head} key={i}>
                      <figure className={css.imageFic}>
                        <img className={css.image} src={image} alt='no file' />

                        <p className={css.badgeCount}>{el.quantity}</p>
                      </figure>

                      <div className={css.summary_payment}>
                        <p>{el.name}</p>
                        <span>₮{el.price}</span>
                      </div>
                    </div>
                  );
                })}

              <hr />

              <div className={css.summary_payment}>
                <p>Нийт</p>
                <b>₮ 188000</b>
              </div>
              <div className={css.summary_payment}>
                <p>Хүргэлт</p>
                <b>
                  Хотын А бүсэд үнэгүй Б бүсэд нэмэлт төлбөр бодогдохыг анхаарна
                  уу!
                </b>
              </div>

              {/* <div className={css.summary_payment}>
                <p>Taxes</p>
                <b>₮10.00</b>
              </div> */}

              <hr />

              <div className={css.summary_payment}>
                <p>Нийт</p>
                <span className={css.summary_total_payment}>
                  MNT <span>₮ 188000</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={css.container}>
      {renderMobileSummary()}

      <div className={css.infoWrapper}>
        <div className={css.info}>
          <div className={css.logoWrapper}>
            <img
              className={css.logo}
              src={
                'https://cdn.shopify.com/s/files/1/0548/9265/8940/files/deely_x320.png?v=1632205447'
              }
            />
          </div>

          <div className={css.info_head}>
            <CiCircleCheck color='#5b6e5d' size={62} />

            <div className={css.info_head_text}>
              <p>Order {data?.name}</p>
              <b>Thank you!</b>
            </div>
          </div>

          <div className={css.bank}>
            <div className={css.bank_map}></div>

            <div className={css.bank_info}>
              <b className={css.infoTitle}>Таны захиалга баталгаажлаа</b>

              {/* <ul>
                <li>Та төлбөрөө доорх данс руу шилжүүлнэ үү!</li>
                <li>Гүйлгээний утган дээр # гэж эхэлсэн</li>
                <li>
                  ЗАХИАЛГИЙН ДУГААР эсвэл захиалга өгсөн гар утасны дугаараа
                  заавал оруулна уу!
                </li>
                <li>Банкны нэр: ХААН БАНК</li>
                <li>Данс эзэмшигч: БАТБАЯР МӨНХЖИН</li>
                <li>Дансны дугаар: 5023171178</li>
              </ul> */}
            </div>
          </div>

          <div className={css.details}>
            <b className={css.infoTitle}>Захиалгын дэлгэрэнгүй</b>

            <div className={css.details_content}>
              <ul className={css.details_content_row}>
                <li>
                  <b className={css.row_title}>Холбоо барих мэдээлэл</b>
                  <ul>{data?.contact_email}</ul>
                </li>

                <li>
                  <b className={css.row_title}>Хүргэлтийн хаяг</b>
                  <ul>
                    <li>{data?.customer?.default_address?.name}</li>
                    <li>{data?.customer?.default_address?.address1}</li>
                    <li>{data?.customer?.default_address?.city}</li>
                    <li>{data?.customer?.default_address?.zip}</li>
                    <li>{data?.customer?.default_address?.country}</li>
                    <li>{data?.customer?.default_address?.phone}</li>
                  </ul>
                </li>

                <li>
                  <b className={css.row_title}>Хүргэлт</b>
                  <ul>{data?.shipping_lines[0]?.title}</ul>
                </li>
              </ul>

              <ul className={css.details_content_row}>
                <li>
                  <b className={css.row_title}>Payment method</b>
                  <ul>
                    {data?.payment_gateway_names[0]} -{' '}
                    <b className={css.amount}>₮ 188000</b>
                  </ul>
                </li>

                <li>
                  <b className={css.row_title}>Billing address</b>
                  <ul>
                    <li>{data?.customer?.default_address?.name}</li>
                    <li>{data?.customer?.default_address?.address1}</li>
                    <li>{data?.customer?.default_address?.city}</li>
                    <li>{data?.customer?.default_address?.zip}</li>
                    <li>{data?.customer?.default_address?.country}</li>
                    <li>{data?.customer?.default_address?.phone}</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div className={css.bottom}>
            <p>
              Need help?{' '}
              <a className={css.bottom_contact} href='#'>
                Contact us
              </a>
            </p>

            <Link
              className={css.bottom_continue}
              href='https://www.thedeely.com'
            >
              Худалдан авалтаа үргэлжлүүлэх
            </Link>
          </div>

          <footer className={css.footer}>All rights reserved TheDeely</footer>
        </div>
      </div>

      <div className={css.summaryWrapper}>
        <div className={css.summary}>
          {data?.line_items &&
            data?.line_items.map((el, i) => {
              return (
                <div className={css.summary_head} key={i}>
                  <figure className={css.imageFic}>
                    <img className={css.image} src={image} alt='no file' />
                    <p className={css.badgeCount}>{el.quantity}</p>
                  </figure>
                  <div className={css.summary_payment}>
                    <p>{el.name}</p>
                    <span>₮{el.price}</span>
                  </div>
                </div>
              );
            })}

          <hr />

          <div className={css.summary_payment}>
            <p>Нийт</p>
            <b>₮188000</b>
          </div>
          <div className={css.summary_payment}>
            <p>Хүргэлт</p>
            <b>
              Хотын А бүсэд үнэгүй Б бүсэд нэмэлт төлбөр бодогдохыг анхаарна уу!
            </b>
          </div>

          {/* <div className={css.summary_payment}>
            <p>Taxes</p>
            <b>₮10.00</b>
          </div> */}

          <hr />

          <div className={css.summary_payment}>
            <p>Нийт</p>
            <span className={css.summary_total_payment}>
              MNT <span>₮ 188000</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Successful;
