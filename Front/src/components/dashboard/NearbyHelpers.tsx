import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Phone, MapPin, Star, Shield } from "lucide-react";

export default function NearbyHelpers({ helpers }) {
  const getHelperIcon = (type) => {
    switch(type) {
      case 'guardian': return '🛡️';
      case 'ex_police': return '👮';
      case 'medical': return '⚕️';
      case 'security': return '🔒';
      default: return '👤';
    }
  };

  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-green-600" />
          Nearby Helpers
        </CardTitle>
      </CardHeader>
      <CardContent>
        {helpers.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No helpers nearby</p>
          </div>
        ) : (
          <div className="space-y-3">
            {helpers.map((helper, idx) => (
              <div 
                key={helper.id || idx}
                className="p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getHelperIcon(helper.helper_type)}</div>
                    <div>
                      <div className="font-semibold text-slate-900">{helper.name}</div>
                      <div className="text-xs text-slate-500 capitalize">
                        {helper.helper_type?.replace(/_/g, ' ')}
                      </div>
                    </div>
                  </div>
                  {helper.is_verified && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1 text-xs text-amber-600">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span className="font-medium">{helper.rating.toFixed(1)}</span>
                    <span className="text-slate-400">({helper.total_responses} helps)</span>
                  </div>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    <Phone className="w-3 h-3 mr-1" />
                    Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}