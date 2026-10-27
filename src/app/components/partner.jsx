import { Marquee } from "@/components/ui/marquee";
import { getTranslations } from 'next-intl/server';
import Image from "next/image";
import Header from './header';
import { getData } from "@/api/fetch-data";

async function Partner() {
  const t = await getTranslations("partnerHeader");
  let data;
  const res = await getData({ url: "/partners" });
  if (res.code == 200) {
    data = res?.data?.data
  } else {
    data = []
  }
  return (
    data?.length == 0 ? null :
      <div className=' bg-light-black py-12 lg:py-20 '>
        <div className=' container space-y-10 '>

          <Header title={t("title")} disc={t("disc")} />

          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden  ">
            <Marquee pauseOnHover repeat={10}>
              {data?.map((item, idx) => (
                <div key={idx} className="w-52  flex items-center justify-center   ">
                  <Image
                    src={item?.image}
                    alt={`client-logo-${idx}`}
                    className="object-contain "
                    width={120}
                    height={120}
                  />
                </div>
              ))}
            </Marquee>

          </div>
        </div>
      </div>)

}

export default Partner
