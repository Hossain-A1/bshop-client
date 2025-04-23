"use client";

import { fetchSingleUser } from "@/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const { userAddress } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(userAddress);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODAyMjk4MGFjYjdiMmQ3Y2FhZTM1ZmMiLCJuYW1lIjoiaG9zc2FpbiIsImVtYWlsIjoibXJob3NzYWluYWhtZWQ3QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NTM5NzE3MSwiZXhwIjoxNzQ1Mzk4OTcxfQ.Zr0Q0nxOPFAB8JXJKANmkFEjwqu3X_Nd3gZR1Nfu92E";

  useEffect(() => {
    dispatch(fetchSingleUser(token));
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100'>
      <div className='bg-white shadow-lg rounded-2xl p-6 w-full sm:w-3/4 md:w-1/2 lg:w-1/3'>
        <h2 className='text-2xl font-semibold mb-4 text-center'>
          Profile Information
        </h2>

        <div className='mb-4'>
          <p className='text-gray-600'>Full Name:</p>
          <p className='text-gray-800 font-medium'>
            {userAddress?.name}
          </p>
        </div>

        <div className='mb-4'>
          <p className='text-gray-600'>Email:</p>
          <p className='text-gray-800 font-medium'>{userAddress?.email}</p>
        </div>

        <div className='mb-4'>
          <p className='text-gray-600'>Phone:</p>
          <p className='text-gray-800 font-medium'>
            {userAddress?.address.phone}
          </p>
        </div>

        <div className='mb-4'>
          <p className='text-gray-600'>Address:</p>
          <p className='text-gray-800 font-medium'>
            {`${userAddress?.address.building}, ${userAddress?.address.district}, ${userAddress?.address.division}`}
          </p>
        </div>

        <div className='mb-4'>
          <p className='text-gray-600'>Landmark:</p>
          <p className='text-gray-800 font-medium'>
            {userAddress?.address.landmark}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
