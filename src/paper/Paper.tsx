import React from "react";
import "./assets/Paper.scss";
export const Paper: React.FC = ({children}) => {
    return (
        <section className="paper">
            {children}
        </section>
    );
};