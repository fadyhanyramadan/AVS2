import { getData } from "@/api/fetch-data";
import ContactSection from "@/app/components/contactSection";
import Header from "@/app/components/header";
import ProjectCard from "@/app/components/projectCard";
import * as motion from "motion/react-client"; //server
import { getTranslations } from "next-intl/server";
import ProjectForm from "@/app/components/projectForm";
import ProjectInfo from "@/app/components/projectInfo";

async function ProjectsPage() {
      const d =await getTranslations("projectsHeader");
      const f =await getTranslations("blogs");
      
  let data;
  const res = await getData({ url: "/projects" });
  if (res.code == 200) {
    data = res?.data?.data;
  } else {
    data = [];
  }
  return (
    data?.length==0 ? null : 
    <div className=' container pb-20 pt-24 lg:pt-32  space-y-20'>
      <Header title={d("title")} disc={d("disc")} align="text-center" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30, y: -30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.2 }}
          >
            <ProjectCard
              title={item?.title || f("title1")}
              disc={item?.description ||f("disc1")}
              img={item?.image[0] }
              id={item?.id ||index+1}
            />
          </motion.div>
        ))}
      </div>
      <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0}}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="grid grid-cols-1 md:grid-cols-[50%_50%] gap-8"
      >
        <div>< ProjectInfo/></div>
        <div><ProjectForm/></div>
      
      </motion.div>
    </div>
  )
}

export default ProjectsPage
