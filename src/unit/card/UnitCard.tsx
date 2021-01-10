import React from "react";
import "./assets/UnitCard.scss";
import {Unit} from "../..";
import tourIcon from "./assets/360-icon.png";
import videoIcon from "./assets/video-icon.png";
import {Badge} from "@contentmunch/muncher-ui";

export const UnitCard: React.FC<UnitCardProps> = ({unit}) => {
    return (
        <div className="unit-card" style={{backgroundImage: `url(${unit.img})`}}>
            {unit.featured ? <Badge>Featured</Badge> : ''}
            {unit.virtualTour ?
                <div className="icon-tour">
                    <a href={unit.virtualTour}>
                        <img src={tourIcon} alt="tour icon" height={30}/>
                    </a>
                </div>
                : ''}
            {unit.video ?
                <div className="icon-video">
                    <a href={unit.video}>
                        <img src={videoIcon} alt="video icon" height={20}/>
                    </a>
                </div>
                : ''}
            <div className="unit-card-footer">
                <div className="left">
                    <h3 className="truncate">
                        <a href={unit.url} title={unit.title}>{unit.title}</a>
                    </h3>
                    <p>{unit.rate}/mo</p>
                </div>
                <div className="right">
                    <p>{unit.bedrooms} bed, {unit.bathrooms} bath</p>
                    <p>{unit.squareFoot} sq. ft.</p>
                </div>
            </div>
        </div>
    );
}

export interface UnitCardProps {
    unit: Unit;
}