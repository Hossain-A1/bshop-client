import axios from "axios";

const serverURL = "http://localhost:4000";

export const getSingleProduct = async (slug) => {
  try {
    const res = await axios.get(`${serverURL}/api/product/slug/${slug}`);

    return res.data.payload; // 🔥 Return ONLY the product
  } catch (error) {
    console.log(
      "❌ API Fetch Error:",
    );
    throw error.response?.data?.message || error.message; // 🔥 Throw error for Redux rejection
  }
};
