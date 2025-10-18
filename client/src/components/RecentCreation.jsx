import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

function RecentCreation({ prompt, type, date, result }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // You can later move this helper to utils
  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      onClick={() => setIsExpanded((prev) => !prev)}
      className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{prompt}</p>
          <p className="text-sm text-gray-400 mt-1">
            {type} - {formattedDate}
          </p>
        </div>

        {/* Type tag + arrow icon */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-blue-800 bg-blue-100 border border-blue-200 rounded-full px-3 py-1">
            {type}
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
        </div>
      </div>

      {/* Expandable Animated Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-3 text-gray-700 border-t border-gray-100 pt-2 overflow-hidden"
          >
            <p>{result}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default RecentCreation;
