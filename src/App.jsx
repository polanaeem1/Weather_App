import { CircularProgress, Slide, TextField, duration } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("Cairo");
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=189271b827844bff7388350c44848615&units=metric`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [city, error]);

  function handelSearch(e) {
    if (e.key === "Enter") {
      setCity(e.target.value);
      setInputText("");
    }
  }
  return (
    <>
      <div className="bg_img">
        {!loading ? (
          <>
            <TextField
              variant="filled"
              label="Search location"
              className="input"
              error={error}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
              }}
              onKeyDown={(e) => handelSearch(e)}
            />
            <h1 className="city">{data.name}</h1>
            <div className="group">
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt=""
              />
              <h1>{data.weather[0].main}</h1>
            </div>
            <h1 className="temp">{data.main.temp.toFixed()} °C</h1>
            <Slide direction="right" timeout={800} in={!loading}>
            <div className="box_container">
              <div className="box">
                <p>Humidity</p>
                <h1>{data.main.humidity.toFixed()}%</h1>
              </div>
              <div className="box">
                <p>Wind</p>
                <h1>{data.wind.speed.toFixed()} km/h</h1>
              </div>
              <div className="box">
                <p>Feels like</p>
                <h1>{data.main.feels_like.toFixed()} °C</h1>
              </div>
            </div>
            </Slide>
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
    </>
  );
}

export default App;
