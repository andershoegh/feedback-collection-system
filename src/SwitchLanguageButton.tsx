import React, { useContext } from "react";
import { Touchless } from "touchless-navigation";
import { LanguageContext } from "./QuestionSettings";
import DKFlag from "./Resources/DKFlag";
import GBFlag from "./Resources/GBFlag";

export interface SwitchLanguageButtonProps {
  renderOnStep: number;
}

const SwitchLanguageButton: React.SFC<SwitchLanguageButtonProps> = ({
  renderOnStep,
}) => {
  const { language, setLanguage } = useContext(LanguageContext);
  return (
    <>
      {renderOnStep === 1 ? (
        <Touchless
          className={`shadow-inactive rounded-xl px-6 py-2 absolute top-10 left-10 border-4 border-transparent`}
          onClick={() =>
            setLanguage(language === "Danish" ? "English" : "Danish")
          }
        >
          {language === "Danish" ? (
            <div className="flex place-items-center">
              <div className="h-6 w-6 place-items-center flex mr-2">
                <GBFlag />
              </div>
              Switch to English
            </div>
          ) : (
            <div className="flex place-items-center">
              <div className="h-5 w-5 place-items-center flex mr-2">
                <DKFlag />
              </div>
              Skift til dansk
            </div>
          )}
        </Touchless>
      ) : null}
    </>
  );
};

export default SwitchLanguageButton;
