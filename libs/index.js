
import { serverURL } from "@/secret";
import axios from "axios";
import cookie from "js-cookie";


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

export const addProduct = async () => {
  try {
    const token = cookie.get("accessToken"); // read from cookie directly
    if (!token) {
      console.log("token not found");
      return;
    }

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("desc", product.desc);
    formData.append("sold", product.sold);
    formData.append("stock", product.stock);
    formData.append("discount", product.discount);
    formData.append("category", product.category);
    formData.append("brand", product.brand || "");
    formData.append("price", product.price);
    formData.append("sizes", JSON.stringify(product.sizes));
    formData.append("color", JSON.stringify(product.color));

    // Append images and colorImages
    product.images.forEach((image) => formData.append("images", image));
    product.colorImages.forEach((image) =>
      formData.append("colorImages", image)
    );

    // Send request to the server
    const res = await axios.post(`${serverURL}/api/product/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Required for file uploads
      },
    });

    if (res.data.success) {
      const data = res.data.payload;
      return data;
    }
  } catch (error) {
    console.log("❌ API Fetch Error:");
    throw error.response?.data?.message || error?.message; // 🔥 Throw error for Redux rejection
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
    throw error.response?.data?.message || error?.message; // 🔥 Throw error for Redux rejection
  }
};

export const handleGetUser = async (token) => {
  console.log(token);
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
    throw error.response?.data?.message || error?.message; // 🔥 Throw error for Redux rejection
  }
};
