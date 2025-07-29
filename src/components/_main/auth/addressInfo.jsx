'use client';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Box, Button, Grid, Typography, Container, Stack } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import L from 'leaflet';
// import { useRouter } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import * as api from '../../../services';
import axios from 'axios';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import Image from '../../../../public/images/location-pin.png';

const AddressInfo = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zipcode, setzipcode] = useState(null);
  const apiKey = 'AIzaSyDMItj3q7FwE0WJvnoR-n0iVHw0niClVzw';
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [location, setLocation] = useState({
    lat: 31.5204404,
    lng: 74.3587587
  }); // Default location (London)

  const handleSaveClick = () => {
    // if (!address && location.lat != 31.5204404) {
    //   toast.error('Please select location to proceed');
    //   return;
    // }
    setLoading(true);
    const locationData = {
      location: {
        coordinates: [location.lat, location.lng],
        address: address,
        city: city,
        state: state,
        zipCode: zipcode
      }
    };

    console.log(
      'MZ is testing click',
      address + '=' + city + '=' + state + '=' + zipcode + '=' + location.lat + '=' + location.lng
    );
    mutate(locationData);
  };

  const getAddressFromLatLng = async (lat, lng, apiKey) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === 'OK') {
      const fetchedAddress = data.results[0];
      const addressComponents = fetchedAddress.address_components;

      setAddress(fetchedAddress.formatted_address);

      addressComponents.forEach((component) => {
        if (component.types.includes('locality')) {
          setCity(component.long_name);
        } else if (component.types.includes('administrative_area_level_1')) {
          setState(component.short_name);
        } else if (component.types.includes('postal_code')) {
          setzipcode(component.long_name);
        }
      });

      return 'Address Fetched ' + JSON.stringify(fetchedAddress);
    } else {
      throw new Error('Failed to retrieve address');
    }
  };

  //  "location": {
  //       "coordinates": [
  //           -73.935242,
  //           40.730610
  //       ],
  //       "address": "123 Gourmet St",
  //       "city": "New York",
  //       "state": "NY",
  //       "zipCode": "10001"
  //   },

  const { mutate } = useMutation(api.updateProfile, {
    onSuccess: async (data) => {
      setLoading(false);
      toast.success('Location saved successfully!');

      console.log('Response : ', JSON.stringify(data));
      router.push('/auth/order-status');
    },
    onError: (err) => {
      // setloading(false);
      toast.error(err.response.data.message);
      console.log('Error occured', err);
      setLoading(false);
      router.push('/auth/order-status');
    }
  });

  // Get user's current location on component mount
  useEffect(() => {
    (async () => {
      try {
        const { latitude, longitude } = await getUserLocation();
        setLocation({ lat: latitude, lng: longitude });
        console.error('Fetching location:', latitude + '=' + longitude);
      } catch (error) {
        console.error('Error fetching location:', error);
        // setCity("Location not found");
      }
    })();
  }, []);

  const customIcon = L.icon({
    iconUrl: '/images/location-pin.png', // Use the imported pin image
    iconSize: [38, 38], // Size of the icon
    iconAnchor: [19, 38], // Point where the marker is anchored on the map (center bottom)
    popupAnchor: [0, -38] // Position of the popup relative to the icon
  });

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        setLocation({
          lat: limitDecimalPlaces(e.latlng.lat, 8),
          lng: limitDecimalPlaces(e.latlng.lng, 8)
        });

        getAddressFromLatLng(e.latlng.lat, e.latlng.lng, apiKey)
          .then((addressData) => console.log('MZ is testing address', addressData))
          .catch((error) => console.error(error));

        console.error('Selected location:', JSON.stringify(location) + '=' + e.latlng.lat);
      }
    });

    return position === null ? null : <Marker position={position} icon={customIcon}></Marker>;
  };

  // Function to limit decimal places
  const limitDecimalPlaces = (num, decimalPlaces) => {
    return Number(num.toFixed(decimalPlaces));
  };

  return (
    <Grid sx={{ minHeight: '', mt: '32px' }} spacing={12} justifyContent="center" ac="hello">
      <Grid
        // item
        xs={12}
        lg={12}
        // container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%' }}
      >
        <Stack>
          <Box mb={4} sx={{ width: '100%', height: 350 }}>
            <MapContainer
              center={[location.lat, location.lng]}
              zoom={15}
              style={{ height: '100%', width: '100%', borderRadius: 20, border: '1px solid #c4c4c4' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* Assuming LocationMarker is a custom marker component */}
              <LocationMarker />
            </MapContainer>
          </Box>

          <Box>
            <LoadingButton
              size="large"
              sx={{ width: '100%' }}
              onClick={handleSaveClick}
              variant="contained"
              loading={loading}
            >
              Save and Continue
            </LoadingButton>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AddressInfo;

// Get user's location (lat/lng) using Geolocation API
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => reject(error)
      );
    }
  });
};
