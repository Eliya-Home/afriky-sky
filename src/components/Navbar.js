import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/auth";

function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1
        className="text-xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        AFRIKY SKY ✈️
      </h1>

      <div className="flex gap-4 items-center">
        <button onClick={() => navigate("/")}>Home</button>

        <button onClick={() => navigate("/dashboard")}>
          My Trips
        </button>

        <button onClick={() => navigate("/admin")}>
          Admin
        </button>

        <button onClick={() => navigate("/airline-dashboard")}>
          Wallets 💼
        </button>

        <button onClick={() => navigate("/ai")}>
          AI 🤖
        </button>

        {!user ? (
          <button onClick={() => navigate("/auth")}>
            Login
          </button>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;