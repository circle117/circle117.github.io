import Navigator from "./Navigator";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="lg:px-32 flex flex-col 2xl:px-64">
      <Navigator />
      <Outlet />
    </div>
  );
}
