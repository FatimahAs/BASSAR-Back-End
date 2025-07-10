export function getDistanceInMeters(
  loc1: { latitude: number; longitude: number },
  loc2: { lat: string | number; lng: string | number }
): number {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const lat1 = loc1.latitude;
  const lon1 = loc1.longitude;
  const lat2 = typeof loc2.lat === 'string' ? parseFloat(loc2.lat) : loc2.lat;
  const lon2 = typeof loc2.lng === 'string' ? parseFloat(loc2.lng) : loc2.lng;

  const R = 6371000; 
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance; 
}