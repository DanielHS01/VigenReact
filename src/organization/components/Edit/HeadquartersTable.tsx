import { HeadquartersData } from "@/auth/services/authServices";
import Table from "@/shared/ui/Table";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTranslation } from "react-i18next";

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

  if (!headquarters.length) {
    return <p className="text-center">{t("EditInfo.nameOrg")}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <thead>
          <tr>
            <th className="border px-4 py-2">{t("EditInfo.location")}</th>
            <th className="border px-4 py-2">{t("EditInfo.tel")}</th>
            <th className="border px-4 py-2">{t("EditInfo.phone")}</th>
          </tr>
        </thead>
        <tbody>
          {headquarters.map((hq) => {
            const [lat, lng] = hq.ubication.split(",").map(Number);
            return (
              <tr key={hq.id} className="text-center">
                <td className="border px-4 py-2">
                  {!isNaN(lat) && !isNaN(lng) && (
                    <MapContainer
                      center={[lat, lng]}
                      zoom={15}
                      style={{ height: "150px", width: "300px" }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={[lat, lng]} icon={customIcon} />
                    </MapContainer>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {hq.phone ? hq.phone : "No registra"}
                </td>
                <td className="border px-4 py-2">
                  {hq.tel ? hq.tel : "No registra"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default HeadquartersTable;
