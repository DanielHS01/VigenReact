import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./UsersMap.css";
import { useEffect, useState } from "react";
import { LatLngTuple } from "leaflet";
import { useMapEvents } from "react-leaflet/hooks";

// Configuración para los íconos de Leaflet
import L from "leaflet";

// Crear un ícono personalizado para el marcador
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Location {
  lat: number;
  lng: number;
}

interface UsersMapProps {
  onLocationSelect: (location: Location) => void; // Función para enviar la ubicación seleccionada
}

const UsersMap = ({ onLocationSelect }: UsersMapProps) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [markerPosition, setMarkerPosition] = useState<LatLngTuple | null>(null);
  const [isGeolocationSet, setIsGeolocationSet] = useState(false); // Controlar si la geolocalización ya se estableció

  // Obtener la ubicación actual del usuario automáticamente al cargar el componente
  useEffect(() => {
    if (isGeolocationSet) return; // Evitar que se ejecute de nuevo si ya se estableció la geolocalización

    if ("geolocation" in navigator) {
      console.log("Solicitando geolocalización...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log("Ubicación obtenida con éxito:", currentLocation);
          setLocation(currentLocation);
          setMarkerPosition([currentLocation.lat, currentLocation.lng]);
          onLocationSelect(currentLocation);
          setIsGeolocationSet(true); // Marcar que la geolocalización ya se estableció
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error.message, "Código de error:", error.code);
          // Ubicación por defecto: Universidad de Cundinamarca, Facatativá
          const defaultLocation = { lat: 4.8118, lng: -74.3545 };
          console.log("Usando ubicación por defecto (Universidad de Cundinamarca, Facatativá):", defaultLocation);
          setLocation(defaultLocation);
          setMarkerPosition([defaultLocation.lat, defaultLocation.lng]);
          onLocationSelect(defaultLocation);
          setIsGeolocationSet(true); // Marcar que la geolocalización ya se estableció
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      console.error("Geolocalización no soportada por el navegador");
      // Ubicación por defecto: Universidad de Cundinamarca, Facatativá
      const defaultLocation = { lat: 4.8118, lng: -74.3545 };
      console.log("Usando ubicación por defecto (Universidad de Cundinamarca, Facatativá):", defaultLocation);
      setLocation(defaultLocation);
      setMarkerPosition([defaultLocation.lat, defaultLocation.lng]);
      onLocationSelect(defaultLocation);
      setIsGeolocationSet(true); // Marcar que la geolocalización ya se estableció
    }
  }, [onLocationSelect, isGeolocationSet]);

  return (
    <>
      {location && markerPosition && (
        <div className="w-full h-full">
          <MapContainer
            center={markerPosition} // Centrar el mapa en la posición del marcador
            zoom={15}
            style={{ width: "100%", height: "100%" }} // Hacer que el mapa ocupe el 100% del contenedor padre
          >
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler
              setMarkerPosition={setMarkerPosition}
              onLocationSelect={onLocationSelect}
            />
            <Marker position={markerPosition} icon={customIcon} />
          </MapContainer>
        </div>
      )}
    </>
  );
};

// Componente para manejar el clic en el mapa y mover el marcador
const MapClickHandler = ({
  setMarkerPosition,
  onLocationSelect,
}: {
  setMarkerPosition: (position: LatLngTuple) => void;
  onLocationSelect: (location: Location) => void;
}) => {
  const map = useMapEvents({
    click: (event) => {
      console.log("Clic detectado en el mapa:", event.latlng); // Depuración para confirmar que el clic se registra
      const { latlng } = event;
      const newLocation = { lat: latlng.lat, lng: latlng.lng };
      setMarkerPosition([latlng.lat, latlng.lng]); // Actualizar la posición del marcador
      onLocationSelect(newLocation); // Notificar al componente padre
      map.flyTo([latlng.lat, latlng.lng], map.getZoom()); // Centrar el mapa en la nueva posición
    },
  });

  return null;
};

export default UsersMap;