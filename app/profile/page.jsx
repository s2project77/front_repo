"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/app/components/mainpage_layout/layout";
import { Side_bar } from "@/app/components/mainpage/side_bar";
import Profile from "../components/profile/Profile";
import { Loader2 } from "lucide-react";
const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const res = await fetch("http://localhost:80/api/pharmacies/myinfo", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json();
        setUserData(data.data.data);
        console.log("✅ userData from API:", data.data.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

    const LoadingScreen = () => (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur opacity-20 animate-pulse"></div>
          <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl shadow-emerald-500/10 p-12 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 animate-bounce">
                <Loader2 className="animate-spin" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Your profile</h2>
              <p className="text-gray-600">Fetching your pharmacy information...</p>
            </div>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="sm:grid-cols-[1.1fr_4fr] grid-cols-1 grid">
        <Side_bar color={"green"} />
        {loading ? (
          <LoadingScreen />
        ) : (
          <Profile color={"green"} userData={userData} />
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
