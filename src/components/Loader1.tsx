import { Loader2 } from "lucide-react";

const Loader1 = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    </div>
  );
};

export default Loader1;
