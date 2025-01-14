import axios from "axios";
import React from "react";

const imageUpload = async (photo) => {
  const formData = new FormData();
  formData.append("image", photo);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGEBB_HOSTING_API
    }`,
    formData
  );
  return data?.data?.display_url;
};

export default imageUpload;
