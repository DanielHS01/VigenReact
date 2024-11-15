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

interface UsersMapProps {
  onLocationSelect: (location: Location) => void; // Función para enviar la ubicación seleccionada
}

const UsersMap = ({ onLocationSelect }: UsersMapProps) => {
  const [location, setLocation] = useState<Location>();
  const [markerPosition, setMarkerPosition] = useState<LatLngTuple | null>(
    null
  );

  // Obtener la ubicación actual del usuario
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const currentLocation = {
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        };
        setLocation(currentLocation);
        onLocationSelect(currentLocation); // Enviar la ubicación inicial al componente padre
      },
      function (error) {
        console.log(error);
      },
      { enableHighAccuracy: true }
    );
  }, [onLocationSelect]);

  return (
    <>
      {location && (
        <MapContainer
          center={location}
          zoom={15}
          style={{ height: "350px", width: "30%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler
            setMarkerPosition={setMarkerPosition}
            onLocationSelect={onLocationSelect}
          />
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

// Componente para manejar el clic en el mapa
const MapClickHandler = ({
  setMarkerPosition,
  onLocationSelect,
}: {
  setMarkerPosition: (position: LatLngTuple) => void;
  onLocationSelect: (location: Location) => void;
}) => {
  useMapEvents({
    click: (event) => {
      const { latlng } = event;
      const newLocation = { lat: latlng.lat, lng: latlng.lng };
      setMarkerPosition([latlng.lat, latlng.lng]);
      onLocationSelect(newLocation); // Notificar al componente padre sobre la nueva ubicación
    },
  });

  return null;
};

export default UsersMap;
