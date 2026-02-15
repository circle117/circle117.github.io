import Skill from "../components/Skill";
import { HashLink } from "react-router-hash-link";

export default function SkillsPage() {
  return (
    <div
      id="skills"
      className="min-h-screen flex relative items-center justify-center py-20 px-4"
    >
      <div className="w-full max-w-6xl">
        {/* title */}
        <div className="text-center mb-8">
          <p className="text-l mb-2 text-secondary">Explore my</p>
          <p className="text-4xl text-primary font-semibold">Skills</p>
        </div>
        {/* skills */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Backend */}
          <SkillCard title="Backend & Systems">
            <Skill name="Python (Flask)" level="Experienced" />
            <Skill name="Golang" level="Intermediate" />
            <Skill name="Java (Spring Boot)" level="Experienced" />
            <Skill name="C++" level="Intermediate" />
            <Skill name="MySQL" level="Experienced" />
            <Skill name="Git" level="Experienced" />
            <Skill name="Redis" level="Basic" />
          </SkillCard>
          {/* Frontend */}
          <SkillCard title="Frontend Development">
            <Skill name="HTML" level="Intermediate" />
            <Skill name="JavaScript" level="Basic" />
            <Skill name="Tailwind CSS" level="Intermediate" />
            <Skill name="React" level="Basic" />
          </SkillCard>
          {/* Tools */}
          <SkillCard title="Other Tools">
            <Skill name="Docker" level="Intermediate" />
            <Skill name="Kubernetes" level="Deployment & Service Usage" />
            <Skill name="Jenkins" level="Basic" />
            <Skill name="Grafana" level="Intermediate" />
            <Skill name="Linux" level="Intermediate" />
            <Skill name="pytest" level="Experienced" />
            <Skill name="Selenium" level="Experienced" />
          </SkillCard>
        </div>
        <div className="flex justify-around mt-6">
          <HashLink
            to={"/experience/#"}
            className="cursor-pointer text-2xl underline text-primary"
          >
            Experience
          </HashLink>
          <HashLink
            to={"/interests/#"}
            className="cursor-pointer text-2xl underline text-primary"
          >
            Interests
          </HashLink>
        </div>
      </div>
      <div
        onClick={() => {
          location.href = "./#contact";
        }}
        className="lg:flex hidden cursor-pointer absolute right-4 bottom-4 transition transform hover:-translate-y-1"
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

function SkillCard({ title, children }) {
  return (
    <div className="border-2 border-primary rounded-2xl p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-semibold text-primary mb-6">{title}</h3>
      <div className="flex flex-wrap justify-center gap-6">{children}</div>
    </div>
  );
}
