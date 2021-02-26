import { ArrowRight } from "phosphor-react";
import React from "react";

export interface NextButtonProps {
  onClick: () => void;
}

const NextButton: React.SFC<NextButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${buttonStyle} flex px-6 py-2 text-xl  place-items-center`}
    >
      Next <ArrowRight className="ml-2 text-2xl" />
    </button>
  );
};

export default NextButton;

const buttonStyle =
  "shadow-inactive focus:shadow-focused focus:border-blue-500 border-4 border-transparent focus:outline-none rounded-xl active:scale-90 animate transition transform";
