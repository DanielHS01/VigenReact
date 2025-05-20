import { HeadquartersData } from "@/auth/services/authServices";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

interface Props {
  headquarters: HeadquartersData[];
}

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const HeadquartersTable = ({ headquarters }: Props) => {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  // Fix for SSR hydration issues with Leaflet
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!headquarters.length) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-4">
        {t("EditInfo.nameOrg")}
      </p>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      {/* Inline styles to fix Leaflet map overlap */}
      <table className="w-full border-collapse text-sm sm:text-base bg-cyan-950 text-white dark:bg-customCyan">
        <thead className="">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">
              {t("EditInfo.location")}
            </th>
            <th className="px-4 py-3 text-left font-semibold">
              {t("EditInfo.phone")}
            </th>
            <th className="px-4 py-3 text-left font-semibol">
              {t("EditInfo.tel")}
            </th>
          </tr>
        </thead>
        <tbody>
          {headquarters.map((hq) => {
            const [lat, lng] = hq.ubication.split(",").map(Number);
            return (
              <tr
                key={hq.id}
                className="border-b"
              >
                <td className="px-4 py-3 align-top">
                  {isMounted && !isNaN(lat) && !isNaN(lng) ? (
                    <div className="relative w-full h-48 sm:h-64 rounded-lg overflow-hidden shadow-sm isolate">
                      <MapContainer
                        center={[lat, lng]}
                        zoom={15}
                        style={{ height: "100%", width: "100%" }}
                        className="min-w-[200px]"
                        scrollWheelZoom={false}
                        dragging={false} // Disable dragging to prevent interference with scroll
                        touchZoom={false} // Disable touch zoom to avoid scroll issues on mobile
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[lat, lng]} icon={customIcon} />
                      </MapContainer>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-48 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400">
                      {t("EditInfo.loading")}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 align-top  dark:text-gray-300">
                  {hq.phone || t("EditInfo.noData")}
                </td>
                <td className="px-4 py-3 align-top  dark:text-gray-300">
                  {hq.tel || t("EditInfo.noData")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HeadquartersTable;