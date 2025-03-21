import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const Navigation = () => {
  return (
    <nav>
      <NavLink className={buildLinkClass} to="/">
        Catalog
      </NavLink>

      <NavLink className={buildLinkClass} to="/builder">
        Create Quiz
      </NavLink>
      <NavLink className={buildLinkClass} to="/complete">
      Complete Quiz
      </NavLink>
    </nav>
  );
};
