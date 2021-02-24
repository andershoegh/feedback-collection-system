import React from "react";

export interface RankedListQuestionProps {}

const RankedListQuestion: React.SFC<{
  currentStep: number;
  renderOnStep: number;
}> = ({ currentStep, renderOnStep }) => {
  return (
    <>
      {currentStep !== renderOnStep ? null : (
        <div>
          <div>Rankedlist question</div>
          <div></div>
        </div>
      )}
    </>
  );
};

export default RankedListQuestion;
