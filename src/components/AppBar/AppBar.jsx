import { Navigation } from "../Navigation/Navigation";

import css from "./AppBar.module.css";

export const AppBar = () => {
  return (
    <header className={css.header}>
      <div className={`${css.container} container`}>
        <Navigation />
      </div>
    </header>
  );
};
