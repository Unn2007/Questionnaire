import DocumentTitle from "../../components/DocumentTitle.jsx";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchQuizes,
    fetchNextPage,
  } from '../../redux/quiz/operations.js';
  import {
    selectIsLoading,
    selectLastKey,
    selectPage,
    selectTotal,
  } from '../../redux/quiz/selectors.js';
  import { nextPage } from '../../redux/quiz/slice.js';
import { Toaster } from 'react-hot-toast';
import { Loader } from '../../components/Loader/Loader.jsx';
import {QuizCardList} from '../../components/QuizCardList/QuizCardList.jsx'
import css from './CatalogPage.module.css'

export default function CatalogPage() {
    const dispatch = useDispatch();
    const lastKey = useSelector(selectLastKey);
    const isLoading = useSelector(selectIsLoading);
    const total = useSelector(selectTotal);
    const page = useSelector(selectPage);
    const isLastPage = page > total / 3;
    const loadMore = async () => {
      if (!lastKey || isLastPage) return;
  
      dispatch(fetchNextPage(lastKey));
      dispatch(nextPage());
    };
  
    useEffect(() => {
      if (page === 1) {
        dispatch(fetchQuizes());
      }
    }, []);
    return (
        <section className={css.page}>
      <div className={`container ${css.container}`}>
        <DocumentTitle>Catalog</DocumentTitle>

        {isLoading && <Loader />}
        {/* <Toaster /> */}
        {/* <FiltersForm /> */}

        <QuizCardList />
        {!isLastPage && (
            <button type="button" onClick={loadMore} className={css.button}>Load more</button>
          
        )}
      </div>
    </section>
    )
}