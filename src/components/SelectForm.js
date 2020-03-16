import React, { useEffect, useState } from "react";

import MapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from "./Pin";

import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

const MAPBOX_KEY = process.env.REACT_APP_MAPBOX_TOKEN;
const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_TOKEN;
const axios = require("axios");

const mapboxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const googlePlacesUrl =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=";
const corsUrl = "https://cors-anywhere.herokuapp.com/";

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

export default function SelectForm({
  setSelectedRestaurant,
  handleNext,
  searchTerm
}) {
  const [restaurants, setRestaurants] = useState([]);
  const [value, setValue] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 37.5,
    longitude: -96,
    zoom: 3.8,
    bearing: 0,
    pitch: 1,
    width: "40vh",
    height: "40vh"
  });

  const forwardGeocode = location => {
    axios
      .get(mapboxUrl + location + ".json?access_token=" + MAPBOX_KEY)
      .then(res => {
        const long = res.data.features[0].center[0];
        const lat = res.data.features[0].center[1];
        // setViewport({ latitude: lat, longitude: long });

        axios
          .get(
            corsUrl +
              googlePlacesUrl +
              lat +
              ", " +
              long +
              "&radius=500&type=restaurant&key=" +
              GOOGLE_KEY
          )
          .then(res => {
            setRestaurants(res.data.results);
            console.log(res.data.results);
          });
      });
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    setSelectedRestaurant(value);
    handleNext();
  };

  useEffect(() => {
    forwardGeocode(searchTerm);
  }, [searchTerm]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-end"
      }}
    >
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="restaurants"
          value={value}
          onChange={handleChange}
        >
          {restaurants.map(restaurant => {
            return (
              <FormControlLabel
                key={restaurant.name}
                value={restaurant.name}
                control={<Radio />}
                label={restaurant.name}
              />
            );
          })}
        </RadioGroup>
      </FormControl>

      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={MAPBOX_KEY}
        onViewportChange={viewport => setViewport(viewport)}
      >
        {restaurants.map(restaurant => {
          return (
            <Marker
              longitude={restaurant.geometry.location.lng}
              latitude={restaurant.geometry.location.lat}
            >
              <Pin size={25} />
            </Marker>
          );
        })}
        <div className="nav" style={navStyle}>
          <NavigationControl
            onViewportChange={viewport => setViewport(viewport)}
          />
        </div>
      </MapGL>

      <Button color="primary" variant="outlined" onClick={handleClick}>
        Next
      </Button>
    </div>
  );
}
