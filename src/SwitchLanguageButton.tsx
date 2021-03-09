import React from "react";
import { Touchless } from "touchless-navigation";
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
        <Touchless
          className={`shadow-inactive rounded-xl px-6 py-2 absolute top-10 left-10 border-4 border-transparent`}
          onClick={() => {}}
        >
          {language === "Danish"
            ? "🇬🇧 Switch to English"
            : "🇩🇰 Skift til dansk"}
        </Touchless>
      ) : null}
    </>
  );
};

export default SwitchLanguageButton;
