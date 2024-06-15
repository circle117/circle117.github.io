import Navigator from "./components/Navigator";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div className="px-32 flex flex-col min-h-screen">
      <Navigator />
      <ProfilePage />
      <AboutPage />
    </div>
  );
}

export default App;
