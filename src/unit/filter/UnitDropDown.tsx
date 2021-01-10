import React, {useState} from "react";
import {DropdownButton} from "@contentmunch/muncher-ui";
import "./assets/UnitDropDown.scss";

export const DropDownFilter: React.FC<UnitDropDownProps> = ({label, drop, children}) => {
    const [showContent, setShowContent] = useState(false);

    return (
        <div className="unit-dropdown">
            <DropdownButton
                element={<h5>{label}&nbsp;&nbsp;<span className="small">▼</span></h5>}
                showContent={showContent}
                setShowContent={setShowContent}
                size="medium"
                variant="primary"
                drop={drop}
            >
                {children}
            </DropdownButton>
        </div>

    );
}

export interface UnitDropDownProps {
    label: string;
    drop?: "left" | "right" | "middle";
    children: React.ReactNode;
}