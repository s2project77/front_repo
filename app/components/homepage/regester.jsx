// components/RegisterLoginSection.jsx
import Link from "next/link";
import React from "react";

const FeatureItem = ({ children }) => {
  return (
    <li className="flex items-center mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-green-600 mr-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {children}
    </li>
  );
};

const RegisterLoginSection = () => {
  return (
    <div id="regester">
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-semibold mb-4 text-center">
                New here?
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Register for easy access to pharmacy details and more.
              </p>

              <ul className="mb-6">
                <FeatureItem>Save your favorite pharmacies</FeatureItem>
                <FeatureItem>Get medication reminders</FeatureItem>
                <FeatureItem>Track prescription history</FeatureItem>
              </ul>

              <Link
                href="/regestration"
                className="block w-full py-3 px-4 bg-green-600 text-white rounded-md text-center font-medium hover:bg-green-700 transition"
              >
                Register Now
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-semibold mb-4 text-center">
                Already a member?
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Log in to manage your preferences and find pharmacies faster!
              </p>

              <ul className="mb-6">
                <FeatureItem>Access your saved pharmacies</FeatureItem>
                <FeatureItem>View medication history</FeatureItem>
                <FeatureItem>Manage notifications</FeatureItem>
              </ul>

              <Link
                href="/login"
                className="block w-full py-3 px-4 border border-green-600 text-green-600 rounded-md text-center font-medium hover:bg-green-50 transition"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterLoginSection;
