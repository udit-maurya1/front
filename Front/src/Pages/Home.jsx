import { Button } from "@/components/ui/button";
import { 
  ShieldAlert, MapPin, Users, Bot, Bell, Radio,
  Download, Apple, Smartphone, CheckCircle, ArrowRight,
  Zap, Clock
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: ShieldAlert,
      title: "Smart SOS Alert",
      description: "One-tap emergency alert to nearby helpers, police, and your trusted contacts instantly.",
      color: "red"
    },
    {
      icon: MapPin,
      title: "Live Location Tracking",
      description: "Share your real-time location with responders until you're safe.",
      color: "blue"
    },
    {
      icon: Bot,
      title: "AI Assistant",
      description: "Smart chatbot guides you through emergencies and notifies authorities automatically.",
      color: "purple"
    },
    {
      icon: Users,
      title: "Community Network",
      description: "Connect with verified helpers and build your trusted safety network.",
      color: "green"
    },
    {
      icon: Radio,
      title: "Danger Zone Alerts",
      description: "AI predicts high-risk areas based on past incidents and real-time data.",
      color: "orange"
    },
    {
      icon: Bell,
      title: "Auto Recording",
      description: "Automatically capture audio/video evidence when SOS is triggered.",
      color: "indigo"
    }
  ];

  // Static mapping for background and shadow color classes

  // Map color names to Tailwind gradient and shadow classes
  const colorClassMap = {
    red: {
      gradient: "bg-gradient-to-br from-red-500 to-red-600",
      shadow: "shadow-red-500/30"
    },
    blue: {
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      shadow: "shadow-blue-500/30"
    },
    purple: {
      gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
      shadow: "shadow-purple-500/30"
    },
    green: {
      gradient: "bg-gradient-to-br from-green-500 to-green-600",
      shadow: "shadow-green-500/30"
    },
    orange: {
      gradient: "bg-gradient-to-br from-orange-500 to-orange-600",
      shadow: "shadow-orange-500/30"
    },
    indigo: {
      gradient: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      shadow: "shadow-indigo-500/30"
    }
  };

  const stats = [
    { value: "24/7", label: "Emergency Support" },
    { value: "500m+", label: "Helper Radius" },
    { value: "<30s", label: "Response Time" },
    { value: "100%", label: "Privacy Protected" }
  ];

  return (
    
    <div className="max-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-slate-900 via-red-950 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full px-4 py-2 text-sm">
                <Zap className="w-4 h-4 text-red-400" />
                <span className="text-red-200">India's Smart Safety Platform</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Your Safety,
                <span className="block bg-linear-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  Our Priority
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                Smart emergency response system that connects you with nearby helpers, authorities, and your trusted network in seconds.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-2xl shadow-red-500/50 text-lg h-14">
                  <Download className="w-5 h-5 mr-2" />
                  Download for Android
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10 text-white text-lg h-14">
                  <Apple className="w-5 h-5 mr-2" />
                  Download for iOS
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:block hidden">
              <div className="relative z-10 bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border border-white/10">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-linear-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                        <ShieldAlert className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">Emergency Mode</div>
                        <div className="text-sm text-slate-400">Ready to help</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center py-8">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-red-500 rounded-full blur-3xl opacity-50 animate-pulse" />
                      {/* Extracted className for clarity */}
                      {(() => {
                        const sosButtonClass =
                          "relative w-48 h-48 bg-linear-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 transition-transform";
                        return (
                          <div className={sosButtonClass}>
                            <div className="text-center">
                              <ShieldAlert className="w-20 h-20 text-white mx-auto mb-2" />
                              <div className="text-white font-bold text-xl">SOS</div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                    <p className="text-slate-300 mt-6">Tap to send emergency alert</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                      <Users className="w-6 h-6 text-blue-400 mb-2" />
                      <div className="text-sm text-slate-400">Nearby Helpers</div>
                      <div className="text-xl font-bold text-white">12</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                      <Clock className="w-6 h-6 text-green-400 mb-2" />
                      <div className="text-sm text-slate-400">Avg Response</div>
                      <div className="text-xl font-bold text-white">28s</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-tr from-red-500/20 to-blue-500/20 rounded-3xl blur-3xl -z-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Powerful Safety Features
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Advanced technology designed to keep you and your community safe
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="group relative bg-linear-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 ${colorClassMap[feature.color].gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg ${colorClassMap[feature.color].shadow}`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-linear-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Get help in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Trigger SOS", description: "Press the emergency button or use voice command 'Help me'" },
              { step: "02", title: "Alert Sent", description: "Nearby helpers, police, and your contacts receive instant notification" },
              { step: "03", title: "Help Arrives", description: "Live location tracking guides responders directly to you" }
            ].map((item, idx) => (
              <div key={idx} className="text-center relative">
                <div className="mb-6">
                  <div className="inline-block relative">
                    <div className="w-20 h-20 bg-linear-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-2xl">
                      {item.step}
                    </div>
                    {idx < 2 && (
                      <ArrowRight className="hidden md:block absolute top-1/2 -right-16 transform -translate-y-1/2 text-slate-300 w-8 h-8" />
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-linear-to-br from-red-600 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Download resQMe Today
          </h2>
          <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
            Join thousands of users who trust resQMe for their safety. Available on Android and iOS.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white hover:bg-slate-100 text-red-600 shadow-2xl text-lg h-14">
              <Smartphone className="w-5 h-5 mr-2" />
              Download for Android
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10 text-white text-lg h-14">
              <Apple className="w-5 h-5 mr-2" />
              Download for iOS
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Free Forever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>No Ads</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>100% Private</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-linear-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">resQMe</span>
            </div>
            <div className="text-slate-400">
              © 2025 resQMe. Making India safer, one alert at a time.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}