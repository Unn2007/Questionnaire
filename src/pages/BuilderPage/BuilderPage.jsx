import { useLocation } from "react-router-dom";
import { QuestionnaireForm } from "../../components/QuestionnaireForm/QuestionnaireForm.jsx";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import css from "./BuilderPage.module.css";

export default function BuilderPage() {
    const location = useLocation();
    const quizData = location.state?.quizData || null; 
    console.log("Полученные данные:", location.state);

    return (
        <section>
            <div className="container">
                <DocumentTitle>BuilderPage</DocumentTitle>
                <QuestionnaireForm initialData={quizData} />
            </div>
        </section>
    );
}
