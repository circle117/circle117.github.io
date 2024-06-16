import Navigator from "./components/Navigator";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import ExperiencePage from "./pages/ExperiencePage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <div className="px-32 flex flex-col 2xl:px-64">
      <Navigator />
      <ProfilePage />
      <AboutPage />
      <ExperiencePage />
      <ContactPage />

      <div className="flex h-[10vh] justify-center">
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
    </div>
  );
}

export default App;
