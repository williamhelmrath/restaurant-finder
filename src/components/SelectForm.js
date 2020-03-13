import React, { useEffect } from "react";

const MAPBOX_KEY = process.env.REACT_APP_MAPBOX_TOKEN;
const axios = require("axios");

export default function SelectForm({ searchTerm }) {
  const forwardGeocode = location => {
    axios
      .get(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          location +
          ".json?access_token=" +
          MAPBOX_KEY
      )
      .then(res => {
        console.log(res.data.features[0]);
        let long = res.data.features[0].center[0];
        let lat = res.data.features[0].center[1];
      });
  };

  useEffect(() => {
    forwardGeocode(searchTerm);
  });

  return <div>{searchTerm}</div>;
}
