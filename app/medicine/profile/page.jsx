"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/app/components/medcine_layout/layout";
import { Side_bar } from "@/app/components/medicine/mainpage/sidebar";
import Profile from "../../components/profile/Profile";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // أو الاسم اللي خزنت به التوكين

        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const res = await fetch("http://192.168.103.88:3001/api/doctors/myinfo", {
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
        <Side_bar color={'blue'} />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Profile color={'blue'} userData={userData} />
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
