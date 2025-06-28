import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { User } from "../types";

const UserDetail: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");

    if (storedData) {
      try {
        const parsedData: User = JSON.parse(storedData);
        setUserData(parsedData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    setLoading(false);
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCreateAnother = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="text-red-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No User Data Found</h2>
            <p className="text-gray-600 mb-6">
              It looks like you haven't created a user yet or the data has been cleared.
            </p>
            <Button onClick={handleGoBack} variant="primary" fullWidth>
              Create User
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">User Details</h1>
          <p className="mt-2 text-sm text-gray-600">Successfully created user account</p>
        </div>

        {/* User Card */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">User Information</h2>
          </div>

          {/* Card Content */}
          <div className="px-6 py-6">
            <dl className="space-y-4">
              {/* Full Name */}
              <div className="flex justify-between py-3 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                <dd className="text-sm text-gray-900 font-semibold">{userData.fullname}</dd>
              </div>

              {/* Email */}
              <div className="flex justify-between py-3 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                <dd className="text-sm text-gray-900">{userData.email}</dd>
              </div>

              {/* Password (masked) */}
              <div className="flex justify-between py-3 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Password</dt>
                <dd className="text-sm text-gray-900 font-mono">{"•".repeat(userData.password.length)}</dd>
              </div>

              {/* Remember Me */}
              <div className="flex justify-between py-3">
                <dt className="text-sm font-medium text-gray-500">Remember Me</dt>
                <dd className="text-sm text-gray-900">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      userData.rememberMe ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {userData.rememberMe ? "Yes" : "No"}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Card Footer */}
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleGoBack} variant="secondary" className="flex-1">
                Back to Form
              </Button>
              <Button onClick={handleCreateAnother} variant="primary" className="flex-1">
                Create Another User
              </Button>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">User Created Successfully!</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  The user account has been created with the information displayed above. In a real
                  application, this data would be stored in a database.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
