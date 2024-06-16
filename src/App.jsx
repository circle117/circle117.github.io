import Navigator from "./components/Navigator";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import ExperiencePage from "./pages/ExperiencePage";
import ContactPage from "./pages/ContactPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="lg:px-32 flex flex-col 2xl:px-64">
      <Navigator />
      <ProfilePage />
      <AboutPage />
      <ExperiencePage />
      <ContactPage />

      <Footer />
    </div>
  );
}

export default App;
