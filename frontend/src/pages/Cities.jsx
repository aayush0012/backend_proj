import { useEffect, useState } from "react";
import api from "../services/api";

function Cities() {
    const [cities, setCities] = useState([]);
    const [cityName, setCityName] = useState("");

    const fetchCities = async () => {
        try {
            const response = await api.get("/cities/");
            setCities(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCities();
    }, []);

    const addCity = async () => {
        if (!cityName.trim()) return;

        try {
            await api.post("/cities/", {
                name: cityName,
            });

            setCityName("");
            fetchCities();
        } catch (error) {
            alert(error.response?.data?.detail);
        }
    };

    const deleteCity = async (id) => {
        try {
            await api.delete(`/cities/${id}`);
            fetchCities();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>Cities</h1>

            <input
                type="text"
                placeholder="Enter city name"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
            />

            <button
                onClick={addCity}
                style={{ marginLeft: "10px" }}
            >
                Add City
            </button>

            <hr />

            {cities.map((city) => (
                <div
                    key={city.id}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "350px",
                        marginBottom: "10px",
                    }}
                >
                    <span>
                        {city.id}. {city.name}
                    </span>

                    <button
                        onClick={() => deleteCity(city.id)}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Cities;