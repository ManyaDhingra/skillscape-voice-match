
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

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
  const [mapboxToken, setMapboxToken] = useState<string>(() => {
    return localStorage.getItem('mapbox_token') || '';
  });
  const [tokenInput, setTokenInput] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [locationSearch, setLocationSearch] = useState('');
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);

  // Initialize token from localStorage or show input modal
  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
    } else {
      setIsTokenModalOpen(true);
    }
  }, []);

  // Handle token submission
  const handleTokenSubmit = () => {
    if (tokenInput) {
      localStorage.setItem('mapbox_token', tokenInput);
      setMapboxToken(tokenInput);
      setIsTokenModalOpen(false);
      toast.success('Mapbox token saved successfully');
    } else {
      toast.error('Please enter a valid Mapbox token');
    }
  };

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newLocation);
          
          if (map.current) {
            map.current.flyTo({
              center: [newLocation.lng, newLocation.lat],
              zoom: 12,
              essential: true
            });
            
            // Update or create user marker
            if (userMarkerRef.current) {
              userMarkerRef.current.setLngLat([newLocation.lng, newLocation.lat]);
            } else {
              const markerElement = document.createElement('div');
              markerElement.className = 'user-location-marker';
              markerElement.style.width = '20px';
              markerElement.style.height = '20px';
              markerElement.style.borderRadius = '50%';
              markerElement.style.backgroundColor = '#1EAEDB';
              markerElement.style.border = '3px solid white';
              markerElement.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
              
              userMarkerRef.current = new mapboxgl.Marker(markerElement)
                .setLngLat([newLocation.lng, newLocation.lat])
                .setPopup(new mapboxgl.Popup().setHTML('<h3>Your Location</h3>'))
                .addTo(map.current);
            }
          }
          
          toast.success('Location updated successfully');
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Unable to get your location. Please check your browser permissions.');
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
    }
  };

  // Search for location
  const searchLocation = async () => {
    if (!locationSearch || !mapboxToken) return;
    
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationSearch)}.json?access_token=${mapboxToken}`
      );
      
      if (!response.ok) throw new Error('Location search failed');
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        const newLocation = { lat, lng };
        setUserLocation(newLocation);
        
        if (map.current) {
          map.current.flyTo({
            center: [lng, lat],
            zoom: 12,
            essential: true
          });
          
          // Update or create user marker
          if (userMarkerRef.current) {
            userMarkerRef.current.setLngLat([lng, lat]);
          } else {
            const markerElement = document.createElement('div');
            markerElement.className = 'user-location-marker';
            markerElement.style.width = '20px';
            markerElement.style.height = '20px';
            markerElement.style.borderRadius = '50%';
            markerElement.style.backgroundColor = '#1EAEDB';
            markerElement.style.border = '3px solid white';
            markerElement.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
            
            userMarkerRef.current = new mapboxgl.Marker(markerElement)
              .setLngLat([lng, lat])
              .setPopup(new mapboxgl.Popup().setHTML(`<h3>${locationSearch}</h3>`))
              .addTo(map.current);
          }
        }
        
        toast.success(`Found location: ${data.features[0].place_name}`);
      } else {
        toast.error('No results found for this location');
      }
    } catch (error) {
      console.error('Error searching location:', error);
      toast.error('Failed to search for location');
    }
  };

  // Initialize and update map when token changes
  useEffect(() => {
    if (!mapboxToken || !mapContainer.current) return;

    // Clear existing markers
    markers.forEach(marker => marker.remove());
    setMarkers([]);
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }

    // Initialize map
    mapboxgl.accessToken = mapboxToken;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-122.4194, 37.7749], // Default: San Francisco
        zoom: 10
      });

      // Add navigation control
      map.current.addControl(new mapboxgl.NavigationControl());
      
      // Get user location initially
      getCurrentLocation();

      // Add markers for providers
      const newMarkers: mapboxgl.Marker[] = [];
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
        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([provider.location.lng, provider.location.lat])
          .setPopup(popup)
          .addTo(map.current!);
          
        newMarkers.push(marker);
      });
      
      setMarkers(newMarkers);
    } catch (error) {
      console.error('Error initializing map:', error);
      toast.error('Failed to initialize map. Please check your Mapbox token.');
      localStorage.removeItem('mapbox_token');
      setIsTokenModalOpen(true);
    }

    // Cleanup
    return () => {
      markers.forEach(marker => marker.remove());
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
      }
      map.current?.remove();
    };
  }, [mapboxToken, providers]);

  return (
    <div className="w-full">
      {isTokenModalOpen && (
        <div className="bg-white p-4 mb-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">Enter Your Mapbox Token</h3>
          <p className="text-sm text-gray-600 mb-3">
            To use the map feature, please provide your Mapbox public token.
            You can get it from <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">mapbox.com</a> dashboard.
          </p>
          <div className="flex gap-2">
            <Input 
              value={tokenInput} 
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="Enter Mapbox public token"
              className="flex-1"
            />
            <Button onClick={handleTokenSubmit}>
              Save Token
            </Button>
          </div>
        </div>
      )}
      
      {mapboxToken && (
        <div className="mb-4 flex flex-col md:flex-row gap-2">
          <div className="flex-1 flex gap-2">
            <Input
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              placeholder="Search for a location..." 
              onKeyDown={(e) => e.key === 'Enter' && searchLocation()}
            />
            <Button onClick={searchLocation}>
              Search
            </Button>
          </div>
          <Button 
            onClick={getCurrentLocation}
            className="flex items-center gap-2"
          >
            <MapPin size={16} />
            <span>Use My Location</span>
          </Button>
        </div>
      )}
      
      <div 
        ref={mapContainer} 
        className="w-full h-[500px] rounded-xl shadow-md"
      />
    </div>
  );
};

export default MapComponent;
