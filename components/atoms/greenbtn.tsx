import React from "react";

interface WhitebtnProps {
  label: String;
  onClick?: () => void;
  className?: String;
}

const Greenbtn: React.FC<WhitebtnProps> = ({ label, onClick }) => {
  return (
    <div>
      <button
        className="rounded-full px-8 py-2 text-[15px] text-slate-50 bg-teal-600 font-semibold cursor-pointer"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default Greenbtn;
