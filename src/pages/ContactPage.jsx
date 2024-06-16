import LinkedInIcon from "../components/LinkedinIcon";

export default function ContactPage() {
  return (
    <div
      id="contact"
      className="flex relative py-[6vh] lg:h-[90vh] justify-center items-center"
    >
      <div>
        <div className="grid content-center mb-8">
          <p className="text-l mb-2 text-secondary text-center">Get in Touch</p>
          <p className="text-4xl text-primary font-semibold text-center">
            Contact Me
          </p>
        </div>
        <div className="flex border-2 xl:p-4 p-2 px-8 gap-4 rounded-full border-primary justify-center text-center">
          <div className="flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-7 text-secondary"
            >
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>

            <p className="xl:text-xl text-sm">
              <a href="mailto:joyyu117@gmail.com">joyyu117@gmail.com</a>
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <LinkedInIcon size="size-7" />
            <p className="xl:text-xl text-sm">
              <a href="https://www.linkedin.com/in/leyu117/">LinkedIn</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
