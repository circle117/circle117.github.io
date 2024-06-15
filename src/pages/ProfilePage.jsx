import resume from "../assets/Joy-Yu-Resume.pdf";
import profilePic from "../assets/profile_pic.jpg";
import LinkedInIcon from "../components/LinkedinIcon";
import GithubIcon from "../components/GithubIcon";

export default function ProfilePage() {
  return (
    <div id="profile" className=" flex p-[2vh] h-[88vh] gap-32 justify-center">
      <div className="flex rounded-full overflow-hidden h-[400px] w-[400px] self-center">
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
