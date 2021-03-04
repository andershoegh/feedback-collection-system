import React from "react";
import { MobileQR } from "touchless-navigation";

export interface WelcomePageProps {
  currentStep: number;
  renderOnStep: number;
  startOnPhoneConnection: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = (props) => {
  const { currentStep, renderOnStep, startOnPhoneConnection } = props;

  return (
    <>
      {currentStep !== renderOnStep ? null : (
        <div className="h-screen w-2/3 flex place-items-center">
          <div>
            <div className="">
              <div className="mb-10">
                <div className="text-4xl">🇩🇰</div>
                <div className="text-2xl leading-10 font-normal mb-2">
                  Prøv de nye kontaktløse skærme ved at udfylde et kort
                  spørgeskema
                </div>
                <div className="font-normal text-gray-600">
                  Scan the QR code with your phone and follow the instructions
                  to get started
                </div>
              </div>

              <div className="mb-10">
                <div className="text-4xl">🇬🇧</div>
                <div className="text-2xl leading-10 font-normal mb-2">
                  Try the public display of the future while answering a short
                  questionnaire
                </div>
                <div className="font-normal text-gray-600">
                  Scan the QR code with your phone and follow the instructions
                  to get started
                </div>
              </div>
            </div>
            <div>
              <div
                onClick={startOnPhoneConnection}
                className={`${buttonStyle} w-72 h-72 text-center justify-center place-items-center flex mt-4`}
              >
                <MobileQR />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomePage;

const buttonStyle =
  "shadow-inactive focus:shadow-focused focus:border-blue-500 border-4 border-transparent focus:outline-none rounded-xl active:scale-90 animate transition transform";
