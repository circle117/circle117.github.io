import Hamburger from "hamburger-react";
import { useState } from "react";
import useWindowDimensions from "./WindowDimensions";

export default function Navigator() {
  const { width } = useWindowDimensions();
  const [isOpen, setOpen] = useState(false);

  function toggleMenu() {
    if (isOpen) setOpen(false);
    else setOpen(true);
  }
  return (
    <div className="h-[10vh]">
      {width >= 1200 ? (
        <nav
          id="desktop-nav"
          className="items-center my-8 flex justify-between px-8"
        >
          <p className="text-4xl">Joy Yu</p>
          <div>
            <ul className="flex gap-8 text-2xl">
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
        </nav>
      ) : (
        <nav
          id="mobile-nav"
          className="items-center my-8 flex lg:justify-between justify-around"
        >
          <p className="text-2xl">Joy Yu</p>
          <div className="relative inline-block">
            <Hamburger toggled={isOpen} onToggle={toggleMenu} />
            {isOpen && (
              <div className="absolute right-0 bg-white shadow-sm text-xl border-y-2 border-y-slate-500 p-4 justify-between">
                <ul>
                  <li>
                    <a className="" href="#about" onClick={toggleMenu}>
                      About
                    </a>
                  </li>
                  <li>
                    <a className="" href="#experience" onClick={toggleMenu}>
                      Experience
                    </a>
                  </li>
                  <li>
                    <a className="" href="#projects" onClick={toggleMenu}>
                      Projects
                    </a>
                  </li>
                  <li>
                    <a className="" href="#interests" onClick={toggleMenu}>
                      Interests
                    </a>
                  </li>
                  <li>
                    <a className="" href="#contact" onClick={toggleMenu}>
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}
