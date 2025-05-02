"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/app/components/mainpage_layout/layout";
import { Side_bar } from "@/app/components/mainpage/side_bar";
import Profile from "../components/profile/Profile";

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

        const res = await fetch("http://192.168.108.88:4000/api/pharmacies/myinfo", {
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

  return (
    <Layout>
      <div className="sm:grid-cols-[1.1fr_4fr] grid-cols-1 grid">
        <Side_bar color={"green"} />
        {loading ? (
          <div className="flex justify-center items-center w-full min-h-[400px]">
            <p className="text-xl text-green-600 font-semibold animate-pulse">Loading profile...</p>
          </div>
        ) : (
          <Profile color={"green"} userData={userData} />
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
