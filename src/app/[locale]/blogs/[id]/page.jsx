import { getData } from "@/api/fetch-data";
import SideBar from "@/app/components/sideBar";
import * as motion from "motion/react-client"; //server
import Image from "next/image";

async function SingleBlog({ params }) {
  const id = await params?.id;
  let all, single;
  const res = await getData({ url: "/blogs" });
  if (res.code == 200) {
    all = res?.data?.data;
  } else {
    all = null;
  }

  const result = await getData({ url: `/blogs/${id}` });
  if (result.code == 200) {
    single = result?.data?.data;
  } else {
    single = null;
  }

  const otherBlogs = all?.filter((item) => item.id !== Number(id));
  return single === null ? (
    <div className="container text-2xl py-20 text-main">Blog not found</div>
  ) : (
    <div className=" container pb-20 pt-24 lg:pt-32  ">
      <div className="container grid grid-cols-12 xl:gap-x-10 gap-y-12 ">
        {/* content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="col-span-12 xl:col-span-8 space-y-6"
        >
          <h1 className="lg:text-3xl text-2xl font-bold leading-tight text-main">
            {single?.title}
          </h1>
          <Image
            src={single?.image}
            alt={single?.title}
            width={500}
            height={500}
            className="object-cover w-full h-[45vh] rounded-xl "
          />
          <div className="  text-gray-400 space-y-6">
            <p>{single.description}</p>
          </div>
        </motion.div>
        {/* author & related */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="col-span-12 xl:col-span-4 space-y-6"
        >
          <div className="flex items-center gap-4  border-b-main border-b-2 pb-4">
            <Image
              src="/assets/footer.png"
              alt="author"
              width={100}
              height={100}
              className="object-contain p-2 bg-light-black rounded-md size-24"
            />
            <div>
              <p className="font-semibold  text-main text-lg">By:</p>
              <p className="font-bold text-lg text-white">{single?.author_name}</p>
              <p className="text-sm text-gray-400">
                Created at :{" "}
                {new Date(single?.created_at).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className=" text-2xl font-semibold text-main">Related Blogs</h2>
            <SideBar page="blogs" other={otherBlogs} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SingleBlog;
