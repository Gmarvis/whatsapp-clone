"use client";

import React from "react";
type AvatarProps = {
  onClick: () => void;
  profilePicture?: string;
  size: number;
  className?: string;
};

const Avatar = React.memo(
  ({ onClick, profilePicture, size, className }: AvatarProps) => {
    return (
      <div className={className}>
        <button
          onClick={onClick}
          style={{
            backgroundImage: `url(${profilePicture})`,
            width: `${size * 5}px`,
            height: `${size * 5}px`,
          }}
          className={`bg-cover bg-center object-fill rounded-[50%] h-${size} w-${size}`}
        ></button>
      </div>
    );
  }
);

export default Avatar;
