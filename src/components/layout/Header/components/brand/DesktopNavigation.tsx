import React from 'react';
import { NavLink } from './NavLink';
import { NAV_ITEMS } from "../../constants";

export const DesktopNavigation: React.FC = () => {
    return (
        <nav className="hidden md:flex items-center space-x-6 mx-8" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
                <NavLink key={item.path} to={item.path} label={item.label} />
            ))}
        </nav>
    );
};