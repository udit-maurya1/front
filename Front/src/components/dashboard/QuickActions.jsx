import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, MessageSquare, Users, Bell, Phone } from "lucide-react";

const quickActions = [
  { 
    icon: MapPin, 
    label: "View Map", 
    description: "See danger zones & helpers",
    page: "Map",
    color: "blue"
  },
  { 
    icon: MessageSquare, 
    label: "AI Assistant", 
    description: "Get emergency guidance",
    page: "AIAssistant",
    color: "purple"
  },
  { 
    icon: Users, 
    label: "My Network", 
    description: "Manage trusted contacts",
    page: "TrustedNetwork",
    color: "green"
  },
  { 
    icon: Bell, 
    label: "Incident Feed", 
    description: "Community safety updates",
    page: "CommunityFeed",
    color: "orange"
  },
];

export default function QuickActions() {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, idx) => (
          <Link key={idx} to={createPageUrl(action.page)}>
            <Card className="border-none shadow-md hover:shadow-lg transition-all cursor-pointer group">
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 bg-${action.color}-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <action.icon className={`w-6 h-6 text-${action.color}-600`} />
                </div>
                <div className="text-sm font-semibold text-slate-900">{action.label}</div>
                <div className="text-xs text-slate-500 mt-1">{action.description}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}