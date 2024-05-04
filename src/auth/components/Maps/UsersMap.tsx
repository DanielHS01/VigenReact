import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./UsersMap.css";
import { useEffect, useState } from "react";
import { LatLngTuple } from "leaflet";
import { useMapEvents } from "react-leaflet/hooks";

interface Location {
  lat: number;
  lng: number;
}

const UsersMap = () => {
  const [location, setLocation] = useState<Location>();
  const [markerPosition, setMarkerPosition] = useState<LatLngTuple | null>(
    null
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setLocation({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
      },
      function (error) {
        console.log(error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <>
      {location && (
        <MapContainer center={location} zoom={30}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler setMarkerPosition={setMarkerPosition} />
          {markerPosition ? (
            <Marker position={markerPosition} />
          ) : (
            <Marker position={location} />
          )}
        </MapContainer>
      )}
    </>
  );
};

const MapClickHandler = ({
  setMarkerPosition,
}: {
  setMarkerPosition: (position: LatLngTuple) => void;
}) => {
  useMapEvents({
    click: (event) => {
      const { latlng } = event;
      setMarkerPosition([latlng.lat, latlng.lng]);
    },
  });

  return null;
};

export default UsersMap;
