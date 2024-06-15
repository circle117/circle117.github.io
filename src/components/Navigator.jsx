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
      {width >= 1000 ? (
        <nav id="desktop-nav">
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
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        <nav id="mobile-nav">
          <p className="text-2xl">Joy Yu</p>
          <div className="relative inline-block">
            <Hamburger toggled={isOpen} onToggle={toggleMenu} />
            {isOpen && (
              <div className="absolute right-0 bg-white text-xl border border-solid border-white border-y-slate-500 p-4 justify-between">
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
