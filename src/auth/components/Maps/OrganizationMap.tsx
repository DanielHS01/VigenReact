import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./OrganizationMap.css";
import { useEffect, useState } from "react";
import { LatLngTuple} from "leaflet";
import { useMapEvents } from "react-leaflet/hooks";

// Configuración para los íconos de Leaflet
import L from "leaflet";

// Crear un ícono personalizado para los marcadores
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

interface OrganizationMapProps {
  onLocationSelect: (location: Location) => void; // Función para enviar la ubicación al componente padre
}

const OrganizationMap = ({ onLocationSelect }: OrganizationMapProps) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [markerPositions, setMarkerPositions] = useState<LatLngTuple[]>([]);
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
          setIsGeolocationSet(true); // Marcar que la geolocalización ya se estableció
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error.message, "Código de error:", error.code);
          // Ubicación por defecto: Universidad de Cundinamarca, Facatativá
          const defaultLocation = { lat: 4.8118, lng: -74.3545 };
          console.log("Usando ubicación por defecto (Universidad de Cundinamarca, Facatativá):", defaultLocation);
          setLocation(defaultLocation);
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
      setIsGeolocationSet(true); // Marcar que la geolocalización ya se estableció
    }
  }, [isGeolocationSet]);

  const handleMarkerClick = (positionToRemove: LatLngTuple) => {
    setMarkerPositions((prevPositions) =>
      prevPositions.filter(
        (position) =>
          position[0] !== positionToRemove[0] || position[1] !== positionToRemove[1]
      )
    );
  };

  return (
    <>
      {location && (
        <MapContainer
          center={[location.lat, location.lng]}
          zoom={15}
          
        >
          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler
            setMarkerPositions={setMarkerPositions}
            onLocationSelect={onLocationSelect}
          />
          {markerPositions.map((position) => {
            const positionKey = `${position[0]}-${position[1]}`;
            return (
              <Marker
                key={positionKey}
                position={position}
                icon={customIcon}
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

// Componente para manejar el clic en el mapa y añadir marcadores
const MapClickHandler = ({
  setMarkerPositions,
  onLocationSelect,
}: {
  setMarkerPositions: (
    positions: (prevPositions: LatLngTuple[]) => LatLngTuple[]
  ) => void;
  onLocationSelect: (location: Location) => void;
}) => {
  const map = useMapEvents({
    click: (event) => {
      console.log("Clic detectado en el mapa:", event.latlng);
      const { latlng } = event;
      const newLocation = { lat: latlng.lat, lng: latlng.lng };
      setMarkerPositions((prevPositions) => [
        ...prevPositions,
        [latlng.lat, latlng.lng],
      ]);
      onLocationSelect(newLocation); // Enviar la ubicación al componente padre
      map.flyTo([latlng.lat, latlng.lng], map.getZoom());
    },
  });
  return null;
};

export default OrganizationMap;