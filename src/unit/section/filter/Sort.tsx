import React, {useState} from "react";
import {Button, DropdownButton} from "@contentmunch/muncher-ui";
import {SortBy, SortFields} from "../../data/UnitFilters";

export const Sort: React.FC<SortProps> = ({sortBy, handleSortChange}) => {
    const [showSortDropDown, setShowSortDropDown] = useState(false);

    return (
        <div className="unit-dropdown">
            <DropdownButton
                element={<h5>{SortFields[sortBy].element}&nbsp;&nbsp;<span
                    className="small">▼</span></h5>}
                showContent={showSortDropDown}
                setShowContent={setShowSortDropDown}
                size="medium"
                variant="primary"
                drop="left"
            >
                <div className="sort-filters">
                    {Object.keys(SortFields).map((sortField) => (
                        <Button
                            key={sortField}
                            active={sortBy === sortField}
                            onClick={() => {
                                handleSortChange(sortField);
                                setShowSortDropDown(false);
                            }}>
                            {SortFields[sortField].element}
                        </Button>
                    ))}
                </div>
            </DropdownButton>
        </div>
    );
};

export interface SortProps {
    sortBy: SortBy;
    handleSortChange: (sortBy: SortBy) => void;
}