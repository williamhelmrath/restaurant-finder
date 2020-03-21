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
  selectedRestaurant,
  handleNext,
  handleBack,
  searchTerm,
  setSearchTerm
}) {
  const [restaurants, setRestaurants] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 37.5,
    longitude: -96,
    zoom: 14.33,
    bearing: 0,
    pitch: 10,
    width: "40vh",
    height: "40vh"
  });

  const forwardGeocode = location => {
    axios
      .get(mapboxUrl + location + ".json?access_token=" + MAPBOX_KEY)
      .then(res => {
        if (res.data.features.length > 0) {
          const long = res.data.features[0].center[0];
          const lat = res.data.features[0].center[1];
          setViewport({ ...viewport, latitude: lat, longitude: long });

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
            });
        }
      });
  };

  const handleChange = e => {
    setSelectedRestaurant(JSON.parse(e.target.value));
  };

  const goBack = () => {
    setSearchTerm("");
    handleBack();
  };

  useEffect(() => {
    forwardGeocode(searchTerm);
  }, [searchTerm]);

  const renderPopup = () => {
    return (
      <Popup
        tipSize={5}
        anchor="top"
        longitude={selectedRestaurant.geometry.location.lng}
        latitude={selectedRestaurant.geometry.location.lat}
        closeOnClick={false}
      >
        {selectedRestaurant.name}
      </Popup>
    );
  };

  if (restaurants.length > 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end"
        }}
      >
        <FormControl
          component="fieldset"
          style={{
            maxHeight: "50vh",
            overflow: "scroll",
            overflowX: "hidden"
          }}
        >
          <RadioGroup
            aria-label="restaurants"
            value={JSON.stringify(selectedRestaurant)}
            onChange={handleChange}
          >
            {restaurants.map(restaurant => {
              return (
                <FormControlLabel
                  key={restaurant.name}
                  value={JSON.stringify(restaurant)}
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
          style={{ margin: "1vh", flex: 1 }}
        >
          {restaurants.map(restaurant => {
            return (
              <Marker
                key={restaurant.name}
                longitude={restaurant.geometry.location.lng}
                latitude={restaurant.geometry.location.lat}
              >
                <Pin size={25} />
              </Marker>
            );
          })}
          {selectedRestaurant ? renderPopup() : null}
          <div className="nav" style={navStyle}>
            <NavigationControl
              onViewportChange={viewport => setViewport(viewport)}
            />
          </div>
        </MapGL>
        <div>
          <Button color="secondary" variant="outlined" onClick={goBack}>
            Back
          </Button>
          <Button
            disabled={selectedRestaurant == null}
            color="primary"
            variant="outlined"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>Sorry, there are no restaurants in that area</p>
        <Button color="secondary" variant="outlined" onClick={goBack}>
          Back
        </Button>
      </div>
    );
  }
}
