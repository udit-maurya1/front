import React from "react";
import { Shield, Users, BarChart, Globe, Lock, Code, LogOut, Settings, Database, Link2 } from "lucide-react";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, active }: SidebarItemProps) => (
  <div
    className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
      active
        ? "bg-red-600 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`}
  >
    <Icon size={18} />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-center py-4 border-b border-gray-700">
            resQMe
          </h2>
          <div className="mt-4 space-y-2 px-2">
            <SidebarItem icon={Shield} label="Overview" active />
            <SidebarItem icon={Users} label="Users" />
            <SidebarItem icon={Database} label="Data" />
            <SidebarItem icon={BarChart} label="Analytics" />
            <SidebarItem icon={Globe} label="Domains" />
            <SidebarItem icon={Lock} label="Security" />
            <SidebarItem icon={Code} label="Code" />
            <SidebarItem icon={Settings} label="Settings" />
          </div>
        </div>

        <div className="px-2 mb-4">
          <SidebarItem icon={LogOut} label="Logout" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Overview</h1>
            <p className="text-gray-500">
              Your safety, our priority. Connect with nearby helpers, authorities, and your trusted network.
            </p>
          </div>
          <div className="space-x-2">
            <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
              Open App
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Share App
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* App Visibility */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-2">App Visibility</h2>
            <p className="text-sm text-gray-600 mb-4">
              Control who can access your application.
            </p>
            <select className="border px-3 py-2 rounded-md w-full mb-3">
              <option>Public</option>
              <option>Private</option>
            </select>

            <label className="flex items-center gap-2 text-sm text-gray-700 mb-3">
              <input type="checkbox" defaultChecked />
              Require login to access
            </label>

            <div className="bg-yellow-100 border border-yellow-300 p-3 rounded-md text-yellow-700">
              <p className="text-sm font-medium">
                Your app data is publicly accessible.
              </p>
              <button className="mt-2 px-3 py-1 bg-yellow-400 hover:bg-yellow-500 rounded-md text-sm">
                Run Security Scan
              </button>
            </div>
          </div>

          {/* Invite Users */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-2">Invite Users</h2>
            <p className="text-sm text-gray-600 mb-4">
              Grow your user base by inviting others.
            </p>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-3 py-2 border rounded-md hover:bg-gray-100">
                <Link2 size={16} /> Copy Link
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Send Invites
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
