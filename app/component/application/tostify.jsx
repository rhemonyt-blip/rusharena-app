import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Toast function
export const showToast = (type = "default", message) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      break;

    case "error":
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
      });
      break;

    case "warning":
      toast.warning(message, {
        position: "top-right",
        autoClose: 3000,
      });
      break;

    case "info":
      toast.info(message, {
        position: "top-right",
        autoClose: 3000,
      });
      break;

    default:
      toast(message, {
        position: "top-right",
        autoClose: 3000,
      });
      break;
  }
};
