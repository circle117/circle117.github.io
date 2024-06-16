export default function Footer() {
  return (
    <div className="lg:flex hidden h-[10vh] justify-center content-center">
      <ul className="flex gap-8 text-xl">
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#experience">Experience</a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#interests">Interests</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </div>
  );
}
