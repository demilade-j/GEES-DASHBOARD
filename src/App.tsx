import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="hidden lg:grid">
      <Outlet />
    </div>
  );
}

export default App;
