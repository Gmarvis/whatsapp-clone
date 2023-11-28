import React from "react";

interface WhitebtnProps {
  label: String;
  onClick?: () => void;
  className?: String;
}

const Whitebtn: React.FC<WhitebtnProps> = ({ label, onClick }) => {
  return (
    <div>
      <button
        className="border border-gray-200 rounded-full px-8 py-2 text-[15px] bg-slate-50 text-teal-500 font-semibold cursor-pointer"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default Whitebtn;
