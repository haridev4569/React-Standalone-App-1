import { useState, useRef, useEffect, useCallback } from 'react';
import Autocomplete from 'react-google-autocomplete';

const API_KEY = import.meta.env.GOOGLE_MAPS_API_KEY;

const mapContainerStyle = {
    width: '100%',
    height: '300px',
    marginTop: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
};

const defaultCenter = { lat: -34.397, lng: 150.644 };
const defaultZoom = 8;
const selectedPlaceZoom = 15;


const AddressField = () => {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [isGoogleApiLoaded, setIsGoogleApiLoaded] = useState(false);

    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markerInstanceRef = useRef(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (window.google && window.google.maps && typeof window.google.maps.importLibrary === 'function') {
                setIsGoogleApiLoaded(true);
                clearInterval(intervalId);
            }
        }, 100);
        return () => clearInterval(intervalId);
    }, []);

    const initOrUpdateMap = useCallback(async (center, placeDetails) => {
        if (!mapContainerRef.current || !isGoogleApiLoaded) {
            console.log("Map container is not ready or Google API is not loaded.");
            return;
        }

        try {
            const { Map } = await window.google.maps.importLibrary("maps");
            const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");

            const mapOptions = {
                center: center,
                zoom: placeDetails ? selectedPlaceZoom : defaultZoom,
                mapId: "DEMO_MAP_ID",
            };

            if (!mapInstanceRef.current) {
                mapInstanceRef.current = new Map(mapContainerRef.current, mapOptions); // here we get the map to the dom
            } else {
                mapInstanceRef.current.setCenter(center);
                mapInstanceRef.current.setZoom(mapOptions.zoom);
            }

            if (placeDetails) {
                if (markerInstanceRef.current) {
                    markerInstanceRef.current.position = center;
                    markerInstanceRef.current.map = mapInstanceRef.current;
                } else {
                    markerInstanceRef.current = new AdvancedMarkerElement({
                        map: mapInstanceRef.current,
                        position: center,
                        title: placeDetails.name || placeDetails.formatted_address,
                    });
                }
            } else {
                if (markerInstanceRef.current) {
                    markerInstanceRef.current.map = null;
                }
            }

        } catch (error) {
            console.error("Error initializing or updating Google Map:", error);
        }
    }, [isGoogleApiLoaded]);

    useEffect(() => {
        if (isGoogleApiLoaded && !mapInstanceRef.current) {
            initOrUpdateMap(defaultCenter, null);
        }
    }, [isGoogleApiLoaded, initOrUpdateMap]);

    useEffect(() => {
        if (isGoogleApiLoaded) {
            if (selectedPlace && selectedPlace.geometry && selectedPlace.geometry.location) {
                const newCenter = {
                    lat: selectedPlace.geometry.location.lat(),
                    lng: selectedPlace.geometry.location.lng(),
                };
                initOrUpdateMap(newCenter, selectedPlace);
            } else if (mapInstanceRef.current && !selectedPlace) {
                initOrUpdateMap(defaultCenter, null);
            }
        }
    }, [selectedPlace, isGoogleApiLoaded, initOrUpdateMap]);

    const handlePlaceSelected = (place) => {
        if (place && place.geometry && place.geometry.location) {
            setSelectedPlace(place);
            console.log("Selected Place:", place);
        } else {
            setSelectedPlace(null);
            console.log("Place selected is invalid or has no geometry:", place);
            if (isGoogleApiLoaded) initOrUpdateMap(defaultCenter, null);
        }
    };

    return (
        <div>
            <h1 className='text-md font-semibold'>Address:</h1>
            <Autocomplete
                apiKey={API_KEY}
                onPlaceSelected={handlePlaceSelected}
                options={{
                    types: ['geocode', 'establishment'],
                    fields: ["address_components", "formatted_address", "geometry", "name", "place_id"],
                }}
                style={{ width: '90%', border: '1px solid black', borderRadius: '5px', padding: '5px', marginBottom: '10px', marginTop: '10px' }}
                defaultValue=""
            />
            {selectedPlace && selectedPlace.formatted_address && (
                <div style={{ marginBlock: "10px", padding: "10px", border: "1px solid #eee", borderRadius: "5px" }}>
                    <p><strong>Name:</strong> {selectedPlace.name || 'N/A'}</p>
                    <p><strong>Address:</strong> {selectedPlace.formatted_address}</p>
                    {selectedPlace.geometry && selectedPlace.geometry.location && (
                        <p><strong>Coordinates:</strong> {selectedPlace.geometry.location.lat().toFixed(6)}, {selectedPlace.geometry.location.lng().toFixed(6)}</p>
                    )}
                </div>
            )}

            <div ref={mapContainerRef} id="map" style={mapContainerStyle}>
                {!isGoogleApiLoaded && <p style={{ textAlign: 'center', paddingTop: '20px' }}>Loading map...</p>}
            </div>
        </div>
    );
};

export default AddressField;