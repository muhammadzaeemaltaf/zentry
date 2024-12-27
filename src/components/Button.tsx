import React from "react";

interface ButtonProps {
  id: string;
  title: string;
  leftIcon?: React.ReactNode;
  containerClass: string;
  rightIcon?: React.ReactNode,
}

const Button: React.FC<ButtonProps> = ({
  id,
  title,
  leftIcon,
  containerClass,
  rightIcon
}) => {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div>{title}</div>
        {rightIcon}
      </span>
    </button>
  );
};

export default Button;
