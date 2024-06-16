import Navigator from "./components/Navigator";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import SkillPage from "./pages/SkillPage";

function App() {
  return (
    <div className="px-32 flex flex-col 2xl:px-64">
      <Navigator />
      <ProfilePage />
      <AboutPage />
      <SkillPage />
    </div>
  );
}

export default App;
