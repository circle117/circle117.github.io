import Hamburger from "hamburger-react";
import { useState } from "react";
import useWindowDimensions from "./WindowDimensions";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

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
          <Link to={"/"}>
            <p className="text-4xl">Joy Yu</p>
          </Link>
          <div>
            <ul className="flex gap-8 text-2xl">
              <li>
                <HashLink to="/#about">About</HashLink>
              </li>
              <li>
                <HashLink to="/#experience">Experience</HashLink>
              </li>
              <li>
                <Link to={"/projects"}>Projects</Link>
              </li>
              <li>
                <a href="#interests">Interests</a>
              </li>
              <li>
                <HashLink to="/#contact">Contact</HashLink>
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
              <div className="absolute z-50 right-0 bg-white shadow-sm text-xl border-y-2 border-y-slate-500 p-4 justify-between">
                <ul>
                  <li>
                    <HashLink to="/#about" onClick={toggleMenu}>
                      About
                    </HashLink>
                  </li>
                  <li>
                    <HashLink to="/#experience" onClick={toggleMenu}>
                      Experience
                    </HashLink>
                  </li>
                  <li>
                    <Link to={"/projects"} onClick={toggleMenu}>
                      Projects
                    </Link>
                  </li>
                  <li>
                    <a href="#interests" onClick={toggleMenu}>
                      Interests
                    </a>
                  </li>
                  <li>
                    <HashLink to="/#contact" onClick={toggleMenu}>
                      Contact
                    </HashLink>
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
