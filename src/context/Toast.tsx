import { FC } from "react";
import { ToastProps } from "../types";

const Toast: FC<ToastProps> = ({ id, message, type, onClose }) => {
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center p-4 mb-4 text-sm rounded-lg shadow-lg ${
        type === "success"
          ? "bg-green-100 text-green-700"
          : type === "error"
          ? "bg-red-100 text-red-700"
          : type === "info"
          ? "bg-blue-100 text-blue-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
      role="alert"
      aria-live="assertive"
    >
      <span className="mr-2">{message}</span>
      <button
        className="ml-2 text-lg font-bold focus:outline-none"
        onClick={() => onClose(id)}
        aria-label="Close toast"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
