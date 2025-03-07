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
  const [location, setLocation] = useState<Location | null>(null);
  const [markerPositions, setMarkerPositions] = useState<LatLngTuple[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    if (!hasPermission) return;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          });
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, [hasPermission]);

  const requestLocationPermission = () => {
    if (
      window.confirm(
        "¿Permitir acceso a tu ubicación para mejorar la experiencia del mapa?"
      )
    ) {
      setHasPermission(true);
    }
  };

  const handleMarkerClick = (positionToRemove: LatLngTuple) => {
    setMarkerPositions((prevPositions) =>
      prevPositions.filter(
        (position) =>
          position[0] !== positionToRemove[0] ||
          position[1] !== positionToRemove[1]
      )
    );
  };

  return (
    <>
      <button
        onClick={requestLocationPermission}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Permitir ubicación
      </button>
      {location && (
        <MapContainer center={[location.lat, location.lng]} zoom={30}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler setMarkerPositions={setMarkerPositions} />
          {markerPositions.map((position) => {
            const positionKey = `${position[0]}-${position[1]}`;
            return (
              <Marker
                key={positionKey}
                position={position}
                eventHandlers={{
                  click: () => handleMarkerClick(position),
                }}
              />
            );
          })}
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
