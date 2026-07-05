import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const sections = [
    { title: "Cities", blurb: "Keep the city list up to date.", path: "/cities" },
    { title: "Roads", blurb: "Wire up the connections between cities.", path: "/roads" },
    { title: "Route Planner", blurb: "Find the fastest way from A to B.", path: "/route" },
];

function Dashboard() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Hey, where to?</h1>
                <button type="button" className="logout-btn" onClick={logout}>
                    Log out
                </button>
            </div>

            <div className="card-container">
                {sections.map((section) => (
                    <div
                        key={section.path}
                        className="card"
                        role="button"
                        tabIndex={0}
                        onClick={() => navigate(section.path)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") navigate(section.path);
                        }}
                    >
                        <h2>{section.title}</h2>
                        <p>{section.blurb}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;