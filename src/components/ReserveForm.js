import React from "react";

export default function ReserveForm({ selectedRestaurant }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      You have selected {selectedRestaurant}.
    </div>
  );
}
