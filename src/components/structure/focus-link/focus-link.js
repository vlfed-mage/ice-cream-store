import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const FocusLink = ({ to, children, activeClassName, ...props }) => {
    const { state } = useLocation();
    const params = {
        to: to,
        state: state ? { ...state, focus: true } : { focus: true },
    };

    return activeClassName ? (
        <NavLink
            {...props}
            className={({ isActive }) => (isActive ? activeClassName : undefined)}
            to={params.to}
            state={params.state}>
            {children}
        </NavLink>
    ) : (
        <Link {...props} to={params.to} state={params.state}>
            {children}
        </Link>
    );
};

export default FocusLink;
