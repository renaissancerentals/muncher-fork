import React, {useState} from "react";
import {Icon} from "@contentmunch/muncher-ui";
import "./assets/CardSlider.scss";
import {Card} from "./data/Card";

export const CardSlider: React.FC<CardSliderProps> = ({cards}) => {
    const [current, setCurrent] = useState(0);

    return (

        <div className="card-slider">
            <div className="card-slider-body">
                <img className="card-slider-image" src={cards[current].img} alt={cards[current].text}/>
                {cards.length > 1 ?
                    <div className="icon-left">
                        <Icon name="chevron-left" size="large" weight={2} onClick={
                            () => {
                                setCurrent(current < 1 ? cards.length - 1 : current - 1)
                            }}/>
                    </div>
                    : ""}

                {cards.length > 1 ?
                    <div className="icon-right">
                        <Icon name="chevron-right" size="large" weight={2} onClick={
                            () => {
                                setCurrent(current === (cards.length - 1) ? 0 : current + 1)
                            }}/>
                    </div>
                    : ""}
            </div>
            <div className="card-slider-footer">
                <h3><a href={cards[current].url}>{cards[current].title}</a></h3>
                <h4><a href={cards[current].url}>{cards[current].text}</a></h4>
            </div>
        </div>

    );
}

export interface CardSliderProps {
    cards: Card[];
}
