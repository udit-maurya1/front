import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShieldAlert, AlertTriangle, Flame, ShoppingBag, 
  UserX, Car, HelpCircle, X
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const incidentTypes = [
  { type: "medical", label: "Medical Emergency", icon: AlertTriangle, color: "red" },
  { type: "fire", label: "Fire", icon: Flame, color: "orange" },
  { type: "theft", label: "Theft", icon: ShoppingBag, color: "purple" },
  { type: "harassment", label: "Harassment", icon: UserX, color: "pink" },
  { type: "accident", label: "Accident", icon: Car, color: "blue" },
  { type: "other", label: "Other Emergency", icon: HelpCircle, color: "slate" },
];

export default function SOSButton({ onTrigger }) {
  const [showDialog, setShowDialog] = useState(false);
  const [isTriggering, setIsTriggering] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const handleSOSPress = () => {
    setShowDialog(true);
  };

  const handleIncidentSelect = async (incidentType) => {
    setShowDialog(false);
    setIsTriggering(true);
    setCountdown(3);

    // Countdown before triggering
    for (let i = 2; i >= 0; i--) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(i);
    }

    await onTrigger(incidentType);
    setIsTriggering(false);
    setCountdown(null);
  };

  return (
    <>
      <Card className="border-none shadow-2xl bg-gradient-to-br from-white to-slate-50 overflow-hidden">
        <CardContent className="p-8 md:p-12">
          <div className="text-center space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Emergency SOS</h2>
              <p className="text-slate-600">Press the button to send instant alert</p>
            </div>

            <div className="relative inline-block">
              {/* Pulsing rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-red-500 rounded-full opacity-20 animate-ping" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 bg-red-500 rounded-full opacity-30 animate-pulse" />
              </div>
              
              {/* Main button */}
              <button
                onClick={handleSOSPress}
                disabled={isTriggering}
                className="relative z-10 w-48 h-48 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-2xl hover:from-red-700 hover:to-red-600 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isTriggering && countdown !== null ? (
                  <div className="text-center">
                    <div className="text-6xl font-bold text-white mb-2">{countdown}</div>
                    <div className="text-white text-sm">Sending alert...</div>
                  </div>
                ) : (
                  <div className="text-center group-hover:scale-110 transition-transform">
                    <ShieldAlert className="w-20 h-20 text-white mx-auto mb-3" />
                    <div className="text-white font-bold text-2xl">SOS</div>
                  </div>
                )}
              </button>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-medium text-red-900 mb-1">How it works:</p>
                  <p className="text-sm text-red-700">
                    Choose emergency type → 3-second countdown → Alert sent to nearby helpers, 
                    police, and your trusted contacts with your live location.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Incident Type Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Select Emergency Type</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-4">
            {incidentTypes.map((incident) => (
              <Button
                key={incident.type}
                onClick={() => handleIncidentSelect(incident.type)}
                variant="outline"
                className={`h-24 flex flex-col items-center justify-center gap-2 hover:bg-${incident.color}-50 hover:border-${incident.color}-300 transition-all`}
              >
                <incident.icon className={`w-8 h-8 text-${incident.color}-600`} />
                <span className="text-sm font-medium">{incident.label}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}