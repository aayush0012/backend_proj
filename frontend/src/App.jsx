import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Cities from "./pages/Cities";
import Roads from "./pages/Roads";
import RoutePlanner from "./pages/RoutePlanner";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/cities"
                element={
                    <ProtectedRoute>
                        <Cities />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/roads"
                element={
                    <ProtectedRoute>
                        <Roads />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/route"
                element={
                    <ProtectedRoute>
                        <RoutePlanner />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}

export default App;