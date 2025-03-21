import { useLocation } from "react-router-dom";
import { CompleteQuiz } from "../../components/CompleteQuiz/CompleteQuiz.jsx";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import css from "./CompletePage.module.css";

export default function CompletePage() {
  const location = useLocation();
  const quizData = location.state?.quizData;

  return (
    <section>
      <div className="container">
        <DocumentTitle>BuilderPage</DocumentTitle>
        <CompleteQuiz quiz={quizData} />
      </div>
    </section>
  );
}
