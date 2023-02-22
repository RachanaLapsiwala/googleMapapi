import React, { useEffect, useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import mapStyles from "./mapStyles";
import parkData from "../../data/parkData.json";
import { HashRouter, NavLink } from "react-router-dom";
const {
  MarkerWithLabel
} = require("react-google-maps/lib/components/addons/MarkerWithLabel");
function Map() {
  const [selectedPark, setSelectedPark] = useState(null);
  const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 });
  const [zoom, setZoom] = useState(11);
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  return (
    
    <GoogleMap
      defaultZoom={19}
      defaultCenter={{ lat: 43.6561, lng: -79.3802 }}
      options={{ styles: mapStyles }}>
      {parkData.features.map((park) => (
        <>
        <Marker
        draggable={true}
          key={park.properties.PARK_ID}
          position={{
            lat: park.geometry.coordinates[1],
            lng: park.geometry.coordinates[0],
          }}
          onClick={() => {
            setSelectedPark(park);
          }}
          icon={{
            url: "https://img.icons8.com/color/48/000000/map-pin.png",
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        />
        <MarkerWithLabel
            labelStyle={{
              textAlign: "center",
              width: "100px",
              backgroundColor: "alice-orange",
              fontSize: "14px",
              padding: "10px"
            }}
            labelClass="map-label"
            labelAnchor={{ x: 10 / 2 + 10, y: 80 }}
            key={park.PARK_ID}
            position={{ lat:  park.geometry.coordinates[1], lng:  park.geometry.coordinates[0] }}
          >
            <span>{park.location}</span>
          </MarkerWithLabel>
        </>
      ))}

      {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0],
          }}>
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function Main() {
  return (
    <>
      <div>
        <h1>Google Maps Integration using ReactJS</h1>
        <ul className='header'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/event'>Event</NavLink>
          </li>
          <li>
            <NavLink to='/docs'>Docs</NavLink>
          </li>
          <li>
            <NavLink to='/contact'>Contact</NavLink>
          </li>
        </ul>
      </div>
      <div style={{ width: "97vw", height: "100vh" }}>
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAZ0s7DNU0nlPOkPduii11_9YPZsH42Vak&v=3.exp&libraries=geometry,drawing,places}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </>
  );
}
