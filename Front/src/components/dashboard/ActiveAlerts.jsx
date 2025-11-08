import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, MapPin, Clock, Users } from "lucide-react";
import { format } from "date-fns";

export default function ActiveAlerts({ alerts }) {
  const getIncidentColor = (type) => {
    const colors = {
      medical: "red",
      fire: "orange",
      theft: "purple",
      harassment: "pink",
      accident: "blue",
      other: "slate"
    };
    return colors[type] || "slate";
  };

  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          Active Emergency Alerts ({alerts.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              className="p-4 bg-gradient-to-br from-red-50 to-white rounded-xl border border-red-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`bg-${getIncidentColor(alert.incident_type)}-100 text-${getIncidentColor(alert.incident_type)}-700 border-${getIncidentColor(alert.incident_type)}-200`}>
                      {alert.incident_type}
                    </Badge>
                    <Badge variant="outline" className="bg-red-100 text-red-700 animate-pulse">
                      Active
                    </Badge>
                  </div>
                  <div className="font-semibold text-slate-900">{alert.user_name}</div>
                </div>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  Respond
                </Button>
              </div>
              
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{alert.location?.address || "Location shared"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{format(new Date(alert.created_date), "p")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{alert.responders?.length || 0} responders • {alert.alert_radius}m radius</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}