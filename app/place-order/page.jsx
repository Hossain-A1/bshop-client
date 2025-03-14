"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { getTotalAmount, getTotalItems } from "@/utils";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const PlaceOrder = () => {
  const { cartItems } = useSelector((state) => state.cart); // Assuming cart state is managed by Redux
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);
  const [method, setMethod] = useState("home");
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [filteredUnions, setFilteredUnions] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    division: "",
    district: "",
    upazila: "",
    union: "",
    building: "",
    landmark: "",
    address: "",
  });
  const serverURL = "http://localhost:4000";
  const deliveryCharge =
    cartItems.length === 1 ? 100 : 100 + (cartItems.length - 1) * 30;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveUserAddress = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        serverURL + "/api/auth/save/address",
        { formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success("Address saved");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const payWithBkash = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/bkash/payment/create",
        { amount: getTotalAmount(cartItems) + deliveryCharge, orderId: 1 },
        { withCredentials: true }
      );
      window.location.href = res.data.bkashURL;
      if (res.data.statusCode === "0000") {
        localStorage.removeItem("cart");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  //later i will do it
  const payWithNagad = async () => {};

  // Fetch address data
  useEffect(() => {
    const fetchFullAddress = async () => {
      try {
        const res = await axios.get(serverURL + "/api/area");
        if (res.data.success) {
          const { divisions, districts, upazilas, unions } = res.data.payload;
          setDivisions(divisions || []);
          setDistricts(districts || []);
          setUpazilas(upazilas || []);
          setUnions(unions || []);
        }
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };

    fetchFullAddress();
  }, []);

  // Filter districts based on selected division
  useEffect(() => {
    if (formData.division) {
      const filtered = districts.filter(
        (d) => d.division_id === Number(formData.division)
      );
      setFilteredDistricts(filtered);
      setFilteredUpazilas([]);
      setFilteredUnions([]);
      setFormData((prev) => ({
        ...prev,
        district: "",
        upazila: "",
        union: "",
      }));
    }
  }, [formData.division, districts]);
  // Filter upazilas based on selected district
  useEffect(() => {
    if (formData.district) {
      const filtered = upazilas.filter(
        (u) => u.district_id === formData.district
      );
      setFilteredUpazilas(filtered);
      setFilteredUnions([]);
      setFormData((prev) => ({ ...prev, upazila: "", union: "" }));
    }
  }, [formData.district, upazilas]);

  // Filter unions based on selected upazila
  useEffect(() => {
    if (formData.upazila) {
      const filtered = unions.filter(
        (un) => un.upazilla_id === Number(formData.upazila)
      );
      setFilteredUnions(filtered);
      setFormData((prev) => ({ ...prev, union: "" }));
    }
  }, [formData.upazila, unions]);
  return (
    <form className='flex flex-col lg:flex-row gap-8 p-0 sm:p-6 bg-gray-100 h-auto'>
      {/* Delivery Information */}
      <div className='bg-white p-2 sm:p-6 rounded-lg shadow-md w-full lg:w-2/3'>
        <h2 className='text-lg font-semibold mb-4'>Delivery Information</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {[
            {
              label: "Full Name",
              name: "fullName",
              type: "text",
              placeholder: "Enter your first and last name",
            },
            {
              label: "Phone Number",
              name: "phone",
              type: "text",
              placeholder: "Please enter your phone number",
            },
            {
              label: "Building / House No / Floor / Street",
              name: "building",
              type: "text",
              placeholder: "Please enter",
            },
            {
              label: "Colony / Suburb / Locality / Landmark",
              name: "landmark",
              type: "text",
              placeholder: "Please enter",
            },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <p className='text-sm font-medium mb-1'>{label}</p>
              <input
                name={name}
                type={type}
                required
                value={formData[name]}
                onChange={onChangeHandler}
                className='w-full border px-3 py-2 rounded text-sm cursor-text'
                placeholder={placeholder}
              />
            </div>
          ))}
          <div>
            <p className='text-sm font-medium mb-1'>Division</p>
            <select
              name='division'
              value={formData.division}
              required='Division is required!'
              onChange={onChangeHandler}
              className='w-full border px-3 py-2 rounded text-sm cursor-pointer'
            >
              <option value=''></option>
              {divisions.length > 0 &&
                divisions.map((div) => (
                  <option key={div.id} value={div.id}>
                    {div.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <p className='text-sm font-medium mb-1'>District</p>
            <select
              name='district'
              required='Districts is required!'
              value={formData.district}
              onChange={onChangeHandler}
              className={`w-full border px-3 py-2 rounded text-sm ${
                !formData.division ? "cursor-not-allowed" : "cursor-pointer"
              } `}
              disabled={!formData.division}
            >
              <option value=''></option>
              {filteredDistricts.map((dist) => (
                <option key={dist.id} value={dist.id}>
                  {dist.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className='text-sm font-medium mb-1'>Upazila</p>
            <select
              name='upazila'
              value={formData.upazila}
              required='Upazila is required!'
              onChange={onChangeHandler}
              className={`w-full border px-3 py-2 rounded text-sm ${
                !formData.district ? "cursor-not-allowed" : "cursor-pointer"
              } `}
              disabled={!formData.district}
            >
              <option value=''></option>
              {filteredUpazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.id}>
                  {upazila.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className='text-sm font-medium mb-1'>Union</p>
            <select
              name='union'
              value={formData.union}
              required='Union is required!'
              onChange={onChangeHandler}
              className={`w-full border px-3 py-2 rounded text-sm ${
                !formData.upazila ? "cursor-not-allowed" : "cursor-pointer"
              } `}
              disabled={!formData.upazila}
            >
              <option value=''></option>
              {filteredUnions.map((union) => (
                <option key={union.id} value={union.id}>
                  {union.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className='text-sm font-medium mb-1'>Address</p>
            <input
              name='address'
              type='text'
              value={formData.address}
              onChange={onChangeHandler}
              className='w-full border px-3 py-2 rounded text-sm'
              placeholder='For Example: House# 123, Street# 123, ABC Road'
            />
          </div>
        </div>
        <div className='mt-4 flex gap-4'>
          {[
            { label: "🏢 OFFICE", value: "office" },
            { label: "🏠 HOME", value: "home" },
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setMethod(value)}
              className={`px-4 py-2 rounded border text-sm ${
                method === value
                  ? "border-blue-500 border-2  border-t-red-500"
                  : "border-gray-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={saveUserAddress}
          className='w-full mt-4 bg-blue-500 text-white py-2 rounded text-sm'
        >
          SAVE
        </button>
      </div>

      {/* Order Summary */}
      <div className='bg-white p-6 rounded-lg shadow-md w-full lg:w-1/3'>
        <h2 className='text-lg font-semibold mb-4'>Order Summary</h2>
        <div className='flex justify-between mb-2 text-sm'>
          <span>
            Items Total ({cartItems && getTotalItems(cartItems)} Items):
          </span>
          <span>৳ {cartItems && getTotalAmount(cartItems)}</span>
        </div>
        <div className='flex justify-between mb-2 text-sm'>
          <span>Delivery Fee:</span>
          <span>৳ {deliveryCharge}</span>
        </div>
        <div className='flex justify-between font-semibold text-lg'>
          <span>Total:</span>
          <span className='text-orange-500'>
            ৳ {cartItems && getTotalAmount(cartItems) + deliveryCharge}
          </span>
        </div>
        <button
          disabled={!formData}
          onClick={payWithBkash}
          className='w-full mt-4 bg-green-700 text-white py-2 rounded text-sm lg:text-lg cursor-pointer'
        >
          Pay with Bkash
        </button>
        <button
          onClick={payWithNagad}
          className='w-full mt-4 bg-green-700 text-white py-2 rounded text-sm lg:text-lg cursor-pointer'
        >
          Pay with Nagod
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
