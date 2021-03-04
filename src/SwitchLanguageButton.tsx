import React from "react";
import { language } from "./QuestionSettings";

export interface SwitchLanguageButtonProps {
  renderOnStep: number;
}

const SwitchLanguageButton: React.SFC<SwitchLanguageButtonProps> = ({
  renderOnStep,
}) => {
  return (
    <>
      {renderOnStep === 1 ? (
        <div className={`${buttonStyle} px-6 py-2 absolute top-10 left-10`}>
          <button onClick={() => {}}>
            {language === "Danish"
              ? "🇬🇧 Switch to English"
              : "🇩🇰 Skift til dansk"}
          </button>
        </div>
      ) : null}
    </>
  );
};

export default SwitchLanguageButton;

const buttonStyle =
  "shadow-inactive focus:shadow-focused focus:border-blue-500 border-4 border-transparent focus:outline-none rounded-xl active:scale-90 animate transition transform";
