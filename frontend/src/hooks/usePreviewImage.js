import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useShowToast } from "./useShowToast";

export const usePreviewImage = () => {
  const [imgUrl, setImgUrl] = useState("");
  const toast = useShowToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgUrl(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      toast("Invalid file type", "Please select an image file", "error");
    }
  };
  return { handleImageChange, imgUrl };
};
