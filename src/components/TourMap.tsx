// // components/TourMap.tsx
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Fix marker icon issues with leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
// });

// interface Location {delete L.Icon.Default.prototype._getIconUrl;
//   coordinates: [number, number];
//   description: string;
//   day: number;
//   id: string;
// }

// interface TourMapProps {
//   locations: Location[];
// }

// const TourMap: React.FC<TourMapProps> = ({ locations }) => {
//   const center = locations[0].coordinates;

//   return (
//     <MapContainer center={[center[1], center[0]]} zoom={8} className="w-full h-96">
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {locations.map(location => (
//         <Marker
//           key={location.id}
//           position={[location.coordinates[1], location.coordinates[0]]}
//         >
//           <Popup>
//             <strong>Day {location.day}:</strong> {location.description}
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default TourMap;
