import { Button } from "@/components/ui/button";
import { AlertTriangle, ChartBar, Package, PieChart, User } from "lucide-react";
import React from "react";
import DoughnutChart from "../components/charts/DoughnutChart";
import LineChart from "../components/charts/LineChart";

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-sm text-gray-600 leading-relaxed">
        Check the disaster, resources and pending verifications
      </h2>
      <div className="mt-4 grid grid-cols-4 gap-x-6">
        <div className="flex gap-4 justify-between p-2 rounded-md shadow bg-white">
          <div>
            <h4 className="font-medium text-gray-600">Total Disaters</h4>
            <p className="mt-3 text-xl font-bold">34</p>
          </div>
          <Button>
            <AlertTriangle />
          </Button>
        </div>
        <div className="flex gap-4 justify-between p-2 rounded-md shadow bg-white">
          <div>
            <h4 className="font-medium text-gray-600">Total Resources</h4>
            <p className="mt-3 text-xl font-bold">34</p>
          </div>
          <Button>
            <Package />
          </Button>
        </div>
        <div className="flex gap-4 justify-between p-2 rounded-md shadow bg-white">
          <div>
            <h4 className="font-medium text-gray-600">Active Volunteers</h4>
            <p className="mt-3 text-xl font-bold">34</p>
          </div>
          <Button>
            <User />
          </Button>
        </div>
        <div className="flex gap-4 justify-between p-2 rounded-md shadow bg-white">
          <div>
            <h4 className="font-medium text-gray-600">Pending Verification</h4>
            <p className="mt-3 text-xl font-bold">34</p>
          </div>
          <Button>
            <ChartBar />
          </Button>
        </div>
      </div>
      {/* Charts  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 ">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Disaster Types</h2>
          <DoughnutChart />
        </div>

        <div className="bg-white p-5 rounded-xl shadow h-180">
          <h2 className="text-lg font-semibold mb-4">Disaster Types</h2>
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
