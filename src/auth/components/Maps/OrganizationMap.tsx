import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./OrganizationMap.css";
import { useEffect, useState } from "react";
import { LatLngTuple } from "leaflet";

interface Location {
  lat: number;
  lng: number;
}

const OrganizationMap = () => {
  const [location, setLocation] = useState<Location>();
  const [markerPositions, setMarkerPositions] = useState<LatLngTuple[]>([]);

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

  const handleMarkerClick = (index: number) => {
    setMarkerPositions((prevPositions) =>
      prevPositions.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      {location && (
        <MapContainer center={[location.lat, location.lng]} zoom={30}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler setMarkerPositions={setMarkerPositions} />
          {markerPositions.map((position, index) => (
            <Marker
              key={index}
              position={position}
              eventHandlers={{
                click: () => handleMarkerClick(index),
              }}
            />
          ))}
        </MapContainer>
      )}
    </>
  );
};

const MapClickHandler = ({
  setMarkerPositions,
}: {
  setMarkerPositions: (
    positions: (prevPositions: LatLngTuple[]) => LatLngTuple[]
  ) => void;
}) => {
  useMapEvents({
    click: (event) => {
      const { latlng } = event;
      setMarkerPositions((prevPositions) => [
        ...prevPositions,
        [latlng.lat, latlng.lng],
      ]);
    },
  });
  return null;
};

export default OrganizationMap;
