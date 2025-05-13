import { Button } from "@/components/ui/button";
import { SessionProvider } from "next-auth/react";
import LoginButton from "@/components/auth/LoginButton";
import Typewriter from "typewriter-effect"; 
import Introduction from "@/components/Introduction";
import GetStartedArrow from "@/components/icons/GetStartedArrow";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import LogoAvatar from "@/components/LogoAvatar";
export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center mt-5">
      <div className="space-y-6 text-center">
      <h1 className="mb-4 font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-8xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-orange-500 text_heading">Welcome to 4Cinephile!</span></h1>
      <div>
        <Introduction/>
        <div className="pb-10"> <LoginButton>
        <Button variant={"outline_red"} size={"lg"}>
          <a href="/auth/login"><p className="content">Let's get Started!</p></a>
        </Button>
      </LoginButton></div>
     

      </div>
      </div>
     

    </main>
  )
}
