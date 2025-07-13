import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { useEffect, useState } from "react";

type Location = {
  lat: number;
  lng: number;
};

type LocationInputProps = {
  id?: string;
  label?: string;
  value?: Location;
  address?: string;
  disabled?: boolean;
  onChange: (val: Location) => void;
};

export function LocationInput({
  id,
  label,
  value,
  onChange,
  address,
  disabled = true,
}: LocationInputProps) {
  const [position, setPosition] = useState<Location>(
    value || { lat: 12.9716, lng: 77.5946 }
  );

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode on mount and when theme changes
  useEffect(() => {
    const check = () =>
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    check();

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!address) return;
    const fetchCoordinates = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        );
        const data = await res.json();
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          const newPos = { lat: parseFloat(lat), lng: parseFloat(lon) };
          setPosition(newPos);
          onChange(newPos);
        }
      } catch (err) {
        console.error("Failed to geocode address:", err);
      }
    };
    fetchCoordinates();
  }, [address]);

  const MapUpdater = ({ center }: { center: Location }) => {
    const map = useMap();
    useEffect(() => {
      map.setView([center.lat, center.lng], map.getZoom());
    }, [center.lat, center.lng, map]);
    return null;
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e: L.LeafletMouseEvent) {
        if (disabled) return;
        const newPos = { lat: e.latlng.lat, lng: e.latlng.lng };
        setPosition(newPos);
        onChange(newPos);
      },
    });

    return <Marker position={[position.lat, position.lng]} />;
  };

  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "0.5rem",
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      <TileLayer
        url={
          isDarkMode
            ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
        attribution={
          isDarkMode
            ? '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>'
            : '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        }
      />

      <MapUpdater center={position} />
      <LocationMarker />
    </MapContainer>
  );
}
