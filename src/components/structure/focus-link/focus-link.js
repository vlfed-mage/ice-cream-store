import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const FocusLink = ({ to, children, activeClassName, ...props }) => {
    const params =
        typeof to === 'string'
            ? {
                  pathname: to,
                  state: { focus: true },
              }
            : {
                  ...to,
                  state: to.state ? { ...to.state, focus: true } : { focus: true },
              };

    return activeClassName ? (
        <NavLink {...props} className={({ isActive }) => (isActive ? activeClassName : undefined)} to={params}>
            {children}
        </NavLink>
    ) : (
        <Link {...props} to={params.to}>
            {children}
        </Link>
    );
};

export default FocusLink;
