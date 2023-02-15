import Head from "next/head";

import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import WorkExperience from "../components/WorkExperience";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import ContactMe from "../components/ContactMe";
//import ContactMe from "@/components/ContactMe";
//yha .. ki jagh @ autocomplee se aaya tha, pr usme kbhi chlta kbhi moule not found error asati pta nhi kyu pr isme .. lgake exact path deke isme to error n aayi.. isme strl hover se path dikhata bhi h and file pr phunchata h but @ wale m nhi d8ikha rha tha and wo automatic aaya tha jb ctrl+space se function niche use kiya wahi sath m imprt ka suggestion aat h whi se.. phle nhi aata tha ab aa rha esa kya eslint m ya khi change kiya h kya ?? i think no..pta krna @ ka raj khud aane wale,kis plugins se auto import hoti h ?? eslint ya aur koi ?? jo extension install kiya js shortcut ka ya react ka dekhna..ctrl+space se suggestion aata h

import { fetchPageInfo } from "../utils/fetchPageInfo";
import { fetchSkills } from "../utils/fetchSkills";
import { fetchProjects } from "../utils/fetchProject";
import { fetchSocials } from "../utils/fetchSocials";
import { fetchExperiences } from "../utils/fetchExperiences";

//hydration wali error abhi bhi h,use bhi hatana h sanity ka code lgne ke bad aane lgi h isse phgle n thi...use bhi dekhna kya reason h and resolve krna
export default function Home({
  pageInfo,
  skills,
  projects,
  socials,
  experiences,
}) {
  return (
    <div
      className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0  scrollbar-track-gray-400/40 scrollbar-thumb-[#F7AB0A]/80 scrollbar-thin"
      // making scroll bar nice and smooth usable using tailwind customize scroll bar library by installing it and adding into config plugins of tailwind,,,
      //scroll still not too good he made seperate video on smooth scrolling,your you also can search about smooth scrolling know and implemetnt here smooth scrolling
    >
      <Head>
        {/** ?. is optional chaining to avoid null errors */}
        <title>{pageInfo.name} - Portfolios</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header socials={socials} />
      {/* making part of page using section tag it is SEO friendly saying that this is section of your page,id to reach directly on this part of page   w/o  scrolling by just clicking on href=#hero  */}
      <section id="hero" className="snap-start">
        <Hero pageInfo={pageInfo} />
      </section>
      <section id="about" className="snap-center">
        <About pageInfo={pageInfo} />
      </section>
      <section id="experience" className="snap-center">
        <WorkExperience experiences={experiences} />
      </section>
      <section id="skills" className="snap-start">
        <Skills skills={skills} />
      </section>
      <section id="projects" className="snap-start">
        <Projects projects={projects} />
      </section>
      <section id="contact" className="snap-start">
        <ContactMe pageInfo={pageInfo} />
      </section>
      {/** // <Link href="#hero">
      //   <footer className="sticky w-full bottom-5 cursor-pointer">
      //     {" "}
      //     <div className="flex items-center justify-center">
      //       <img
      //         className="h-10 w-10 rounded-full filter grayscale hover:grayscale-0 cursor-pointer"
      //         src="https://media.licdn.com/dms/image/C4D03AQFHLRnbOuQJ0A/profile-displayphoto-shrink_800_800/0/1659113423592?e=1679529600&v=beta&t=jmYzMgP0DQNIzKZm-C2xO9gDiprxAMgy1AMfVf-J-IM"
      //         alt=""
      //       />
      //     </div>
      //   </footer>
      // </Link>*/}
    </div>
  );
}

export const getServerSideProps = async () => {
  const pageInfo = await fetchPageInfo(); //function defined in another file used to call from here wow
  //is pageInfo fetch m 2 hr lg gye,null aa rha tha,, .env file ke var. ki direct value bhi rkhi and sanity client isi page p bhi bnaya like harry but nhi hati,,akhir m pageInfo ki jagh skills ftech kiya wo aa gya fir sanity m jake dekha  pageInfo ka data unPublished tha wo wha to unpublished pr query chlke vision m dta aa rha tha but unpublished dta yha kese aata,so publish kiya tb aaya,chhoti si eror itna time le gyi
  //.env ka nam .env.local kiya pta n isse kya fark pda  pr  us file m sare text white ho gye the ...build bnate time ise le rha tha next khud and ise
  //github p n dlan so .gitignore m h .env.* ,nft m to kewal .env se kam ho yy atha dekh lena kya antar h..dono m pr github p n dalna wha to .env.example dal skyte h jisme apni env file ke variable likhte h value nhi value koi apni env esi bnake bhar dega..jo pull lega apne hisab se hm apne credential n denge
  //localhost ke sanity studio p change kiya to yha turant reflect hua,ie ye data abhi localhost wale se aa rha h ...kha decided h pta nhi but aa rha h
  //so cloud ke studio se data kese layenge and isse local se kese update rkhna h sync pta lgana bad m ??
  const skills = await fetchSkills();
  const projects = await fetchProjects();
  const socials = await fetchSocials();
  const experiences = await fetchExperiences();

  return {
    props: {
      pageInfo,
      skills,
      projects,
      socials,
      experiences,
    },
    //nextjs will attempt to regenerate the page when a req. comes in at most once in every 10 sec. in prod env. in dev. environment regenerate at every req.ie 10 sec bad req. aayegi to uske liye updated milega tbhi agr nhi aayi t khud nhi kreg areq. krne p update krke dega prev se 10 sec bad aayi to agr phle aayi to whi milega..cached krke rkh leta h so cached data milega 1- sec se phle
    //and sanity ke update ke bad just time lgta h use bhi pura nya dast update krne and tb ye call lkrega revalidate time ke bad tb updated data milerga saniy 1 -2 sec m nya kr leta h,,bs ye pta nhi kya live server pr se itni tej krega ya kitna tim lega yha nya data reflect krne m and nye ke liye hm req. krneg 10 sec bad tbhi mil skta auto maticallak e page p n dkihega wevsite m..use reload krenge ya khi dubara kholenge tb milega..
    //or when we edit next code it reloads but vercel p ajke fir bar bar code change n hoga so reload ya new search se link ke kam bnega new tab m
    // revalidate: 10,
  };
};
