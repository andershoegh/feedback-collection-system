import { ArrowBendUpLeft } from "phosphor-react";
import React from "react";

export interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.SFC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${buttonStyle} flex px-4 py-1 text-lg items-center`}
    >
      <ArrowBendUpLeft className="mr-3 text-xl" /> Back
    </button>
  );
};

export default BackButton;

const buttonStyle =
  "shadow-inactive focus:shadow-focused focus:border-blue-500 border-4 border-transparent focus:outline-none rounded-xl active:scale-90 animate transition transform";
