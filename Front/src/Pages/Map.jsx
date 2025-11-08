import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, AlertTriangle, Users, Navigation } from "lucide-react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapPage() {
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]); // Default: Delhi

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = [position.coords.latitude, position.coords.longitude];
          setUserLocation(location);
          setMapCenter(location);
        },
        (error) => console.error("Location error:", error)
      );
    }
  }, []);

  const { data: dangerZones = [] } = useQuery({
    queryKey: ['dangerZones'],
    queryFn: () => base44.entities.DangerZone.list(),
  });

  const { data: activeAlerts = [] } = useQuery({
    queryKey: ['mapAlerts'],
    queryFn: () => base44.entities.SOSAlert.filter({ status: 'active' }),
    refetchInterval: 5000
  });

  const { data: helpers = [] } = useQuery({
    queryKey: ['mapHelpers'],
    queryFn: () => base44.entities.Helper.filter({ availability_status: 'available' }),
  });

  const getRiskColor = (level) => {
    const colors = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444',
      critical: '#991b1b'
    };
    return colors[level] || '#6b7280';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Safety Map</h1>
            <p className="text-slate-600 mt-2">View danger zones, active alerts, and nearby helpers</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Navigation className="w-4 h-4 mr-2" />
            Center on Me
          </Button>
        </div>

        {/* Legend */}
        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full" />
                <span className="text-sm text-slate-700">Your Location</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm text-slate-700">Active Alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full" />
                <span className="text-sm text-slate-700">Helpers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded-full opacity-30" />
                <span className="text-sm text-slate-700">Danger Zones</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map */}
        <Card className="border-none shadow-2xl overflow-hidden">
          <div className="h-[600px] relative">
            <MapContainer 
              center={mapCenter} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* User Location */}
              {userLocation && (
                <Marker position={userLocation}>
                  <Popup>
                    <div className="text-center">
                      <div className="font-semibold">You are here</div>
                      <div className="text-xs text-slate-500">Current location</div>
                    </div>
                  </Popup>
                </Marker>
              )}

              {/* Danger Zones */}
              {dangerZones.map((zone) => (
                zone.location?.latitude && zone.location?.longitude && (
                  <Circle
                    key={zone.id}
                    center={[zone.location.latitude, zone.location.longitude]}
                    radius={zone.location.radius || 500}
                    pathOptions={{
                      color: getRiskColor(zone.risk_level),
                      fillColor: getRiskColor(zone.risk_level),
                      fillOpacity: 0.2
                    }}
                  >
                    <Popup>
                      <div className="min-w-[200px]">
                        <div className="font-semibold text-slate-900 mb-2">{zone.zone_name}</div>
                        <Badge className={`bg-${zone.risk_level === 'high' ? 'red' : zone.risk_level === 'medium' ? 'orange' : 'green'}-100 mb-2`}>
                          {zone.risk_level} risk
                        </Badge>
                        <div className="text-xs text-slate-600">
                          {zone.incident_count} incidents reported
                        </div>
                      </div>
                    </Popup>
                  </Circle>
                )
              ))}

              {/* Active Alerts */}
              {activeAlerts.map((alert) => (
                alert.location?.latitude && alert.location?.longitude && (
                  <Marker
                    key={alert.id}
                    position={[alert.location.latitude, alert.location.longitude]}
                  >
                    <Popup>
                      <div className="min-w-[200px]">
                        <div className="font-semibold text-red-600 mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Emergency Alert
                        </div>
                        <Badge className="bg-red-100 text-red-700 mb-2">{alert.incident_type}</Badge>
                        <div className="text-sm text-slate-700 mb-2">{alert.user_name}</div>
                        <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                          Respond Now
                        </Button>
                      </div>
                    </Popup>
                  </Marker>
                )
              ))}
            </MapContainer>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{activeAlerts.length}</div>
              <p className="text-sm text-slate-600 mt-1">Currently active in your area</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="w-5 h-5 text-green-600" />
                Available Helpers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{helpers.length}</div>
              <p className="text-sm text-slate-600 mt-1">Ready to respond nearby</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5 text-orange-600" />
                Danger Zones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{dangerZones.length}</div>
              <p className="text-sm text-slate-600 mt-1">High-risk areas identified</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}