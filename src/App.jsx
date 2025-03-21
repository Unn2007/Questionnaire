import {  lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import NotFoundPage from "./pages/NotFounPage/NotFounPage.jsx";
import {QuestionnaireForm} from './components/QuestionnaireForm/QuestionnaireForm.jsx';
import {CompleteQuiz} from './components/CompleteQuiz/CompleteQuiz.jsx'
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage.jsx"));
const CompletePage = lazy(() => import("./pages/CompletePage/CompletePage.jsx"));
const BuilderPage = lazy(() => import("./pages/BuilderPage/BuilderPage.jsx"));



function App() {
 

  return (
    <Layout>
    <Routes>
      <Route path="/" element={<CatalogPage />} />
      <Route path="/builder" element={<BuilderPage />} />
      <Route path="/complete" element={<CompletePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Layout>
  )
}

export default App


