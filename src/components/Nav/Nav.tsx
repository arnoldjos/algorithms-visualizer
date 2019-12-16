import React from "react";
import { NavLink } from "react-router-dom";

import css from "./Nav.module.scss";

export default function Nav() {
	return (
		<div className={css.Nav}>
			<ul className={css.Nav__container}>
				<li className={css.Nav__item}>
					<NavLink
						activeClassName={css.Nav__link__active}
						className={css.Nav__link}
						to="/"
						exact
					>
						Home
					</NavLink>
				</li>
				<li className={css.Nav__item}>
					<NavLink
						activeClassName={css.Nav__link__active}
						className={css.Nav__link}
						to="/sorting"
					>
						Sorting
					</NavLink>
				</li>
				<li className={css.Nav__item}>
					<NavLink
						activeClassName={css.Nav__link__active}
						className={css.Nav__link}
						to="/pathfinding"
					>
						Pathfinding
					</NavLink>
				</li>
			</ul>
		</div>
	);
}
