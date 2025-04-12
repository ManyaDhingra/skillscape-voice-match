
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from 'sonner';

// Mock data for providers (similar to existing mock data)
const MOCK_PROVIDERS = [
  {
    id: '1',
    name: 'Alex Johnson',
    skill: 'Plumbing',
    location: { lat: 37.7749, lng: -122.4194 },
    available: true,
  },
  {
    id: '2',
    name: 'Samantha Lee',
    skill: 'Tutoring',
    location: { lat: 37.7749, lng: -122.4244 },
    available: true,
  },
  // Add more providers from existing mock data
];

interface MapComponentProps {
  providers?: Array<{
    id: string;
    name: string;
    skill: string;
    location: { lat: number; lng: number };
    available: boolean;
  }>;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  providers = MOCK_PROVIDERS 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');

  useEffect(() => {
    // Prompt user for Mapbox token
    const token = prompt('Please enter your Mapbox Public Token:');
    if (!token) {
      toast.error('Mapbox token is required to display the map');
      return;
    }
    setMapboxToken(token);
  }, []);

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current) return;

    mapboxgl.accessToken = mapboxToken;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-122.4194, 37.7749], // San Francisco coordinates
      zoom: 10
    });

    // Add navigation control
    map.current.addControl(new mapboxgl.NavigationControl());

    // Add markers for providers
    providers.forEach(provider => {
      // Create marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.style.width = '30px';
      markerElement.style.height = '30px';
      markerElement.style.borderRadius = '50%';
      markerElement.style.backgroundColor = provider.available ? 'green' : 'gray';
      markerElement.style.display = 'flex';
      markerElement.style.alignItems = 'center';
      markerElement.style.justifyContent = 'center';
      markerElement.innerHTML = `<span style="color:white;">${provider.skill[0]}</span>`;

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <h3>${provider.name}</h3>
        <p>Skill: ${provider.skill}</p>
        <p>Status: ${provider.available ? 'Available' : 'Unavailable'}</p>
      `);

      // Add marker to map
      new mapboxgl.Marker(markerElement)
        .setLngLat([provider.location.lng, provider.location.lat])
        .setPopup(popup)
        .addTo(map.current);
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, providers]);

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-[500px] rounded-xl shadow-md"
    />
  );
};

export default MapComponent;
