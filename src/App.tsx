import "./App.css";
import Guide from "./Guide";
import Questionnaire from "./Questionnaire";
import { TouchlessApp } from "touchless-navigation";

function App() {
  return (
    <TouchlessApp startElement={2}>
      <div className="flex font-body">
        <Guide />
        <Questionnaire />
      </div>
    </TouchlessApp>
  );
}

export default App;
