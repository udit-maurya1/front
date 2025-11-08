import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bell, MapPin, Clock, AlertTriangle, Flame, 
  ShoppingBag, UserX, Car, TrendingUp, Filter
} from "lucide-react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CommunityFeed() {
  const [filterType, setFilterType] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");

  const { data: incidents = [] } = useQuery({
    queryKey: ['incidents'],
    queryFn: () => base44.entities.IncidentReport.list('-created_date'),
  });

  const getIncidentIcon = (type) => {
    const icons = {
      medical: AlertTriangle,
      fire: Flame,
      theft: ShoppingBag,
      harassment: UserX,
      accident: Car,
      other: Bell
    };
    return icons[type] || Bell;
  };

  const getIncidentColor = (type) => {
    const colors = {
      medical: 'red',
      fire: 'orange',
      theft: 'purple',
      harassment: 'pink',
      accident: 'blue',
      other: 'slate'
    };
    return colors[type] || 'slate';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'red',
      serious: 'orange',
      moderate: 'yellow',
      minor: 'green'
    };
    return colors[severity] || 'slate';
  };

  const filteredIncidents = incidents.filter(incident => {
    const typeMatch = filterType === "all" || incident.incident_type === filterType;
    const severityMatch = filterSeverity === "all" || incident.severity === filterSeverity;
    return typeMatch && severityMatch;
  });

  const stats = {
    total: incidents.length,
    today: incidents.filter(i => {
      const incidentDate = new Date(i.created_date);
      const today = new Date();
      return incidentDate.toDateString() === today.toDateString();
    }).length,
    resolved: incidents.filter(i => i.was_resolved).length,
    critical: incidents.filter(i => i.severity === 'critical').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Community Feed</h1>
          <p className="text-slate-600 mt-2">Stay informed about safety incidents in your area</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <Bell className="w-10 h-10 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
              <div className="text-xs text-slate-600 mt-1">Total Reports</div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <Clock className="w-10 h-10 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">{stats.today}</div>
              <div className="text-xs text-slate-600 mt-1">Today</div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-10 h-10 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">{stats.resolved}</div>
              <div className="text-xs text-slate-600 mt-1">Resolved</div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-10 h-10 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">{stats.critical}</div>
              <div className="text-xs text-slate-600 mt-1">Critical</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Filters:</span>
              </div>
              
              <div className="flex flex-col md:flex-row gap-3 flex-1">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Incident Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="fire">Fire</SelectItem>
                    <SelectItem value="theft">Theft</SelectItem>
                    <SelectItem value="harassment">Harassment</SelectItem>
                    <SelectItem value="accident">Accident</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="serious">Serious</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="minor">Minor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(filterType !== "all" || filterSeverity !== "all") && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setFilterType("all");
                    setFilterSeverity("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Incident Feed */}
        <Card className="border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              Recent Incidents ({filteredIncidents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredIncidents.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">No incidents match your filters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredIncidents.map((incident) => {
                  const IncidentIcon = getIncidentIcon(incident.incident_type);
                  
                  return (
                    <Card 
                      key={incident.id}
                      className="border-2 hover:border-slate-300 transition-all"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 bg-${getIncidentColor(incident.incident_type)}-50 rounded-xl flex items-center justify-center`}>
                              <IncidentIcon className={`w-6 h-6 text-${getIncidentColor(incident.incident_type)}-600`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className={`bg-${getIncidentColor(incident.incident_type)}-100 text-${getIncidentColor(incident.incident_type)}-700 border-${getIncidentColor(incident.incident_type)}-200 capitalize`}>
                                  {incident.incident_type}
                                </Badge>
                                <Badge className={`bg-${getSeverityColor(incident.severity)}-100 text-${getSeverityColor(incident.severity)}-700 border-${getSeverityColor(incident.severity)}-200 capitalize`}>
                                  {incident.severity}
                                </Badge>
                                {incident.was_resolved && (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    Resolved
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-slate-700 mt-2">{incident.description}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-3 text-sm text-slate-600 border-t pt-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{incident.location?.area_name || "Location unavailable"}</span>
                          </div>
                          <div className="hidden md:block text-slate-300">•</div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{format(new Date(incident.created_date), "PPp")}</span>
                          </div>
                          {incident.response_time_minutes && (
                            <>
                              <div className="hidden md:block text-slate-300">•</div>
                              <div className="flex items-center gap-2 text-green-600">
                                <TrendingUp className="w-4 h-4" />
                                <span>Responded in {incident.response_time_minutes} min</span>
                              </div>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}