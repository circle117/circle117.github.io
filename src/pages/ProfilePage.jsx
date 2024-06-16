import resume from "../assets/Joy-Yu-Resume.pdf";
import profilePic from "../assets/profile_pic.jpg";
import LinkedInIcon from "../components/LinkedinIcon";
import GithubIcon from "../components/GithubIcon";

export default function ProfilePage() {
  return (
    <div
      id="profile"
      className=" flex xl:gap-48 lg:gap-32 gap-16 h-[88vh] justify-center"
    >
      <div className="rounded-full overflow-hidden lg:w-[300px] md:w-[200px] place-self-center">
        <img src={profilePic} alt="Joy Yu profile picture"></img>
      </div>
      <div className="self-center justify-center text-center">
        <p className="text-xl mb-4 text-gray-600">Hello, I&apos;m</p>
        <p className="text-6xl font-semibold mb-4">Joy Yu</p>
        <p className="text-4xl mb-10 text-gray-600">Software Developer</p>
        <div className="flex justify-center mb-4 gap-2">
          <button
            className="bg-primary text-sm border border-black border-solid"
            onClick={() => {
              window.open(resume);
            }}
          >
            Download CV
          </button>
          <button
            className="bg-primary text-sm border border-black border-solid"
            onClick={() => {
              location.href = "./#contact";
            }}
          >
            Contact me
          </button>
        </div>
        <div className="flex justify-center gap-4">
          <div
            className="cursor-pointer"
            onClick={() => {
              location.href = "https://www.linkedin.com/in/leyu117/";
            }}
          >
            <LinkedInIcon />
          </div>
          <div
            className=" cursor-pointer"
            onClick={() => {
              location.href = "https://github.com/circle117";
            }}
          >
            <GithubIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
