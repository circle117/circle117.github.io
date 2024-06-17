import aboutPic from "../assets/about_pic.jpg";

export default function AboutPage() {
  return (
    <div
      id="about"
      className="flex relative justify-center lg:py-[6vh] py-[4vh] h-[100vh]"
    >
      <div className="grid h-[90vh]">
        <div className="grid content-center xl:h-auto">
          <p className="text-l mb-2 text-secondary text-center">
            Get To Know More
          </p>
          <p className="text-4xl text-primary font-semibold text-center">
            About Me
          </p>
        </div>
        <div className="lg:flex lg:justify-center lg:items-center grid content-center xl:gap-32 lg:gap-16 lg:py-8 h-[70vh]">
          <div className="flex justify-self-center rounded-2xl overflow-hidden shadow-lg xl:h-full lg:h-[45vh] h-[24vh]">
            <img
              className="w-full object-right object-cover"
              src={aboutPic}
              alt="Profile picture"
            />
          </div>
          <div className="content-center lg:w-2/3 lg:h-full h-[46vh]">
            <div className="border-y-2 border-y-primary my-4">
              <div className="flex gap-2 text-center justify-center mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-7 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                  />
                </svg>
                <p className="text-2xl font-semibold text-primary">Education</p>
              </div>
              <div className="flex justify-center gap-2 h-2/5 px-8 py-4 overflow-hidden">
                <p className="text-l">
                  Bachelor of Engineering in Computer Science and Technology @
                  Shanghai University
                </p>
                <p className="text-l">
                  Master of Enginnering in Electrical and Computer Engineering @
                  University of British Columbia
                </p>
              </div>
            </div>
            <div className="my-4 px-8 xl:my-8 h-2/5 overflow-auto">
              <p className="text-l hyphens-auto">
                I am a first-year graduate student in Computer Engineering at
                UBC. My primary interests lie in web development, particularly
                backend and full-stack development. Over the past few years,
                I&apos;ve developed a strong foundation in computer science and
                have gained proficiency in programming languages such as Java
                and Python, as well as web development technologies like Spring
                Boot and React. Additionally, I have hands-on experiences in
                artificial intelligence, with a focus on data mining.
                <br />
                <br />
                I&apos;m always eager to learn and grow. I find great
                satisfaction in exploring new technologies and integrating them
                with my existing knowledge to create innovative solutions.
              </p>
            </div>
            <div className="flex items-center px-8 xl:h-auto h-[5vh]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <p className="underline">Vancouver, BC, Canada</p>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          location.href = "./#experience";
        }}
        className="lg:flex hidden lg:cursor-pointer absolute right-0.5 bottom-[1rem]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-8 text-primary"
        >
          <path
            fillRule="evenodd"
            d="M11.47 13.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 0 0-1.06-1.06L12 11.69 5.03 4.72a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M11.47 19.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 1 0-1.06-1.06L12 17.69l-6.97-6.97a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
