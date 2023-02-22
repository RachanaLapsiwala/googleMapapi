import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../Marker/Marker';


const SimpleMap = (props) => {
    const getMapOptions = (maps) => {
        return {
          disableDefaultUI: true,
          mapTypeControl: true,
          streetViewControl: true,
          styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
        };
      };
    const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 });
    const [zoom, setZoom] = useState(11);
    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={getMapOptions}
        >
          <Marker
            lat={11.0168}
            lng={76.9558}
            name="My Marker"
            color="blue"
          />
        </GoogleMapReact>
      </div>
    );
}
export default SimpleMap;
