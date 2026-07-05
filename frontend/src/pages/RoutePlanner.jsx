import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import "./RoutePlanner.css";

function RoutePlanner() {
    const [cities, setCities] = useState([]);
    const [loadingCities, setLoadingCities] = useState(true);

    const [sourceCity, setSourceCity] = useState("");
    const [destinationCity, setDestinationCity] = useState("");

    const [distance, setDistance] = useState(null);
    const [path, setPath] = useState([]);

    const [isSearching, setIsSearching] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await api.get("/cities/");
            setCities(response.data);

            if (response.data.length > 0) {
                setSourceCity(response.data[0].id);
                setDestinationCity(response.data[Math.min(1, response.data.length - 1)].id);
            }
        } catch (error) {
            console.log(error);
            setErrorMsg("Couldn't load cities — try refreshing.");
        } finally {
            setLoadingCities(false);
        }
    };

    const swapCities = () => {
        setSourceCity(destinationCity);
        setDestinationCity(sourceCity);
    };

    const findRoute = async () => {
        if (sourceCity === destinationCity) {
            setErrorMsg("Pick two different cities.");
            return;
        }

        setIsSearching(true);
        setErrorMsg("");

        try {
            const response = await api.post("/route/", {
                source_city_id: Number(sourceCity),
                destination_city_id: Number(destinationCity),
            });

            setDistance(response.data.distance);
            setPath(response.data.path);
        } catch (error) {
            setDistance(null);
            setPath([]);
            setErrorMsg(error.response?.data?.detail || "No route between those two.");
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <Layout>
            <div className="route-planner">
                <h1>Enter The Route </h1>
                <p className="subtitle">Lets find the shortest distance.</p>

                <div className="route-form">
                    <div className="field">
                        <label htmlFor="source">From</label>
                        <select
                            id="source"
                            value={sourceCity}
                            onChange={(e) => setSourceCity(e.target.value)}
                            disabled={loadingCities}
                        >
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="button"
                        className="swap-btn"
                        onClick={swapCities}
                        disabled={loadingCities}
                        aria-label="Swap"
                        title="Swap"
                    >
                        ⇄
                    </button>

                    <div className="field">
                        <label htmlFor="destination">To</label>
                        <select
                            id="destination"
                            value={destinationCity}
                            onChange={(e) => setDestinationCity(e.target.value)}
                            disabled={loadingCities}
                        >
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    type="button"
                    className="find-btn"
                    onClick={findRoute}
                    disabled={loadingCities || isSearching}
                >
                    {isSearching ? "Looking…" : "Find the route"}
                </button>

                {errorMsg && <p className="error-text">{errorMsg}</p>}

                {distance !== null && (
                    <div className="result">
                        <p className="result-headline">
                            That's about <span className="result-distance">{distance} km</span>.
                        </p>
                        <p className="result-path">
                            {path.map((city, i) => (
                                <span key={i}>
                                    {city}
                                    {i < path.length - 1 && <span className="path-arrow"> → </span>}
                                </span>
                            ))}
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default RoutePlanner;