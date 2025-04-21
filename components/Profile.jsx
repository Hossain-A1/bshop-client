"use client"

import { fetchSingleUser } from "@/features/auth/authSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
const {userAddress,token} = useSelector((state)=>state.auth)

useEffect(()=>{

  if(userAddress && userAddress?.address){

    fetchSingleUser(token)
  }
},[userAddress])

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-semibold mb-4 text-center">Profile Information</h2>

        <div className="mb-4">
          <p className="text-gray-600">Full Name:</p>
          <p className="text-gray-800 font-medium">{userAddress?.address.fullName}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">Email:</p>
          <p className="text-gray-800 font-medium">{userAddress?.email}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">Phone:</p>
          <p className="text-gray-800 font-medium">{userAddress?.address.phone}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">Address:</p>
          <p className="text-gray-800 font-medium">
            {`${userAddress?.address.building}, ${userAddress?.address.district}, ${userAddress?.address.division}`}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">Landmark:</p>
          <p className="text-gray-800 font-medium">{userAddress?.address.landmark}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
