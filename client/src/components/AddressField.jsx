import { useState, useRef, useEffect, useCallback } from 'react';

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
    const [inputValue, setInputValue] = useState('');

    const inputRef = useRef(null);           // Reference to the input element
    const mapContainerRef = useRef(null);   // Reference to the map container, DOM element
    const mapInstanceRef = useRef(null);    // Reference to the map instance from Maps Class
    const markerInstanceRef = useRef(null); // Reference to the marker instance from Marker Class

    // Check if Google Maps API is loaded
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (window.google && window.google.maps && typeof window.google.maps.importLibrary === 'function') {
                setIsGoogleApiLoaded(true);
                clearInterval(intervalId);
            }
        }, 100);
        return () => clearInterval(intervalId);
    }, []);

    // Initialize or update the map
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
                mapInstanceRef.current = new Map(mapContainerRef.current, mapOptions);
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
                        gmpDraggable: true,
                        title: placeDetails.name || placeDetails.formatted_address,
                    });
                    markerInstanceRef.current.addListener('dragend', (event) => {
                        const position = event.latLng;
                        const lat = position.lat();
                        const lng = position.lng();
                        reverseGeocodeAndUpdate(lat, lng);
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

    // Initialize the map when the Google API is loaded
    useEffect(() => {
        if (isGoogleApiLoaded && !mapInstanceRef.current) {
            initOrUpdateMap(defaultCenter, null);
        }
    }, [isGoogleApiLoaded, initOrUpdateMap]);

    // Initialize the autocomplete when the Google API is loaded
    useEffect(() => {
        if (isGoogleApiLoaded && inputRef.current && window.google.maps.places) {
            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
                types: ['geocode', 'establishment'],
                fields: ['geometry', 'name', 'formatted_address', 'place_id', 'address_components'],
            });

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (place.geometry && place.geometry.location) {
                    setSelectedPlace(place);
                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();
                    initOrUpdateMap({ lat, lng }, place);
                    setInputValue(place.formatted_address || '');
                }
            });

            return () => {
                window.google.maps.event.clearInstanceListeners(autocomplete);
            };
        }
    }, [isGoogleApiLoaded, initOrUpdateMap]);

    // Update the map when selectedPlace changes
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

    // Handle input change
    const handleBlurOrEnter = () => {
        const coords = isLatLng(inputValue);
        if (coords) {
            reverseGeocodeAndUpdate(coords.lat, coords.lng);
        }
    };

    // function to check and parse lat/lng
    const isLatLng = (str) => {
        const parts = str.split(',').map(part => parseFloat(part.trim()));
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            return { lat: parts[0], lng: parts[1] };
        }
        return null;
    };

    // reverse Geocoding and update map
    const reverseGeocodeAndUpdate = async (lat, lng) => {
        if (!window.google || !window.google.maps) return;

        try {
            const { Geocoder } = await window.google.maps.importLibrary("geocoding");
            const geocoder = new Geocoder();

            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (status === 'OK' && results && results.length > 0) {
                    setSelectedPlace(results[0]);
                    initOrUpdateMap({ lat, lng }, results[0]);
                    console.log("Reverse Geocoded Place:", results[0]);
                }
                else {
                    setSelectedPlace(null);
                    if (isGoogleApiLoaded) initOrUpdateMap(defaultCenter, null);
                }
            })
        } catch (error) {
            console.error("Error reverse geocoding:", error);
            setSelectedPlace(null);
            if (isGoogleApiLoaded) initOrUpdateMap(defaultCenter, null);
        }
    }

    return (
        <div>
            <h1 className='text-md font-semibold'>Address:</h1>
            {/* Input field */}
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={handleBlurOrEnter}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleBlurOrEnter();
                }}
                placeholder="Search for a place or enter lat,lng"
                style={{ width: '90%', border: '1px solid black', borderRadius: '5px', padding: '5px', marginBottom: '10px', marginTop: '10px' }}
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

            {/* Map container */}
            <div ref={mapContainerRef} id="map" style={mapContainerStyle}>
                {!isGoogleApiLoaded && <p style={{ textAlign: 'center', paddingTop: '20px' }}>Loading map...</p>}
            </div>
        </div>
    );
};

export default AddressField;