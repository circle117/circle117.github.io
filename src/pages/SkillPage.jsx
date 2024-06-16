import Skill from "../components/Skill";

export default function SkillPage() {
  return (
    <div
      id="skills"
      className="flex relative py-[6vh] h-[100vh] justify-center"
    >
      <div>
        <div className="grid content-center">
          <p className="text-l mb-2 text-secondary text-center">Explore my</p>
          <p className="text-4xl text-primary font-semibold text-center">
            Skills
          </p>
        </div>
        <div className="flex gap-16 py-16 h-[75vh]">
          <div className="border-2 rounded-2xl p-8 border-primary text-center overflow-auto">
            <p className="text-xl font-semibold text-primary mb-4">
              Frontend Development
            </p>
            <div className="flex flex-wrap flex-row gap-6 justify-around">
              <Skill name="HTML" level="Intermediate" />
              <Skill name="JavaScript" level="Basic" />
              <Skill name="Tailwind CSS" level="intermediate" />
              <Skill name="React" level="Basic" />
            </div>
          </div>
          <div className="border-2 rounded-2xl p-8 border-primary text-center overflow-auto">
            <p className="text-xl font-semibold text-primary mb-4">
              Backend Development
            </p>
            <div className="flex flex-wrap flex-row gap-6 justify-around">
              <Skill name="Java" level="Experienced" />
              <Skill name="Python" level="Experienced" />
              <Skill name="Go" level="Intermediate" />
              <Skill name="C++" level="Basic" />
              <Skill name="Spring Boot" level="Intermediate" />
              <Skill name="Express.js" level="Basic" />
              <Skill name="MySQL" level="Experienced" />
              <Skill name="Redis" level="Basic" />
              <Skill name="MongoDB" level="Basic" />
            </div>
          </div>
          <div className="border-2 rounded-2xl p-8 border-primary text-center overflow-auto">
            <p className="text-xl font-semibold text-primary mb-4">
              Other Tools
            </p>
            <div className="flex flex-wrap flex-row gap-6 justify-around">
              <Skill name="Git" level="Basic" />
              <Skill name="Docker" level="Basic" />
              <Skill name="Nginx" level="Basic" />
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          location.href = "./#projects";
        }}
        className="cursor-pointer absolute lg:right-2 right-0.5 bottom-[4rem]"
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
