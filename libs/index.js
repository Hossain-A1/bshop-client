import axios from "axios";

const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getSingleProduct = async (slug) => {
  try {
    const res = await axios.get(`${serverURL}/api/product/slug/${slug}`);
    if (res.data.success) {
      return res.data.payload;
    }
  } catch (error) {
    console.log("❌ API Fetch Error:");
    throw error.response?.data?.message || error.message; // 🔥 Throw error for Redux rejection
  }
};

export const handleAddToCart = async (count, token) => {
  try {
    const res = await axios.post(
      serverURL + "/api/cart/add",
      { count },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.data.payload.items;
  } catch (error) {
    console.log("❌ API Fetch Error:");
    throw error.response?.data?.message || error.message; // 🔥 Throw error for Redux rejection
  }
};

export const handleGetUser = async (token) => {
  try {
    const res = await axios.get(serverURL + "/api/auth/get", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.success) {
      const user = res.data.payload;
      return user;
    }
  } catch (error) {
    console.log("❌ API Fetch Error:");
    throw error.response?.data?.message || error.message; // 🔥 Throw error for Redux rejection
  }
};
