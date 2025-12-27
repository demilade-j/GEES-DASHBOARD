import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="md:hidden sm:hidden lg:grid">
      <Outlet />
    </div>
  );
}

export default App;
