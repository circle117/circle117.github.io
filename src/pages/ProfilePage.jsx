import profilePic from "../assets/profile_pic.jpg";
import LinkedInIcon from "../components/LinkedinIcon";
import GithubIcon from "../components/GithubIcon";

export default function ProfilePage() {
  return (
    <div
      id="profile"
      className="h-screen flex items-center justify-center relative px-4 py-20"
    >
      <div className="lg:flex lg:items-center grid gap-10 lg:gap-32 xl:gap-48">
        {/* avatar */}
        <div className="rounded-full overflow-hidden lg:w-[300px] w-[25vw] max-w-[260px] place-self-center">
          <img src={profilePic} alt="Joy Yu profile picture"></img>
        </div>

        <div className="text-center">
          <p className="text-xl mb-3 text-gray-600">Hello, I&apos;m</p>
          <p className="text-5xl sm:text-6xl font-semibold mb-4">Joy Yu</p>
          <p className="text-2xl sm:text-3xl mb-8 text-gray-600">
            Software Developer
          </p>
          <div className="flex justify-center mb-4 gap-3">
            {/* <button
            className="bg-primary text-sm border border-black border-solid"
            onClick={() => {
              window.open(resume);
            }}
          >
            Download CV
          </button> */}
            <button
              className="bg-primary text-white text-sm px-5 py-2 rounded-lg border border-black border-solid hover:opacity-90 transition"
              onClick={() => {
                location.href = "./#contact";
              }}
            >
              Contact me
            </button>
          </div>
          <div className="flex justify-center gap-5">
            <div
              className="cursor-pointer hover:scale-110 transition"
              onClick={() => {
                location.href = "https://www.linkedin.com/in/leyu117/";
              }}
            >
              <LinkedInIcon size="size-8" />
            </div>
            <div
              className=" cursor-pointer hover:scale-110 transition"
              onClick={() => {
                location.href = "https://github.com/circle117";
              }}
            >
              <GithubIcon size="size-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
