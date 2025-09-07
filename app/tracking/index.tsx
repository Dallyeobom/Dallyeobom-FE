import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

interface LocationType {
  latitude: number;
  longitude: number;
}

function Index() {
  // TODO: 현재 maker위치 해놓기. 지금은 하드코딩!

  const [location, setLocation] = useState<LocationType[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = location.coords;

      setLocation([{ latitude: latitude, longitude: longitude }]);
    }
    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      {location.length > 0 ? (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location[0].latitude,
            longitude: location[0].longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          onRegionChange={(region) => {
            setLocation((prev) => {
              setInterval(() => {
                const newData = [
                  ...prev,
                  { latitude: region.latitude, longitude: region.longitude },
                ];
                return newData;
              }, 5000);
              return prev;
            });
          }}
          onRegionChangeComplete={(region) => {
            setLocation((prev) => {
              return [
                ...prev,
                { latitude: region.latitude, longitude: region.longitude },
              ];
            });
          }}
        >
          <Marker
            coordinate={location[0]}
            title="Start Point"
            description="Initial location marker"
          />

          <Polyline
            coordinates={location}
            strokeColor="#00BFFF"
            strokeWidth={4}
          />
        </MapView>
      ) : (
        //   LOADING
        <Text>구글 맵지도 로딩중</Text>
      )}
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '50%',
  },
});
