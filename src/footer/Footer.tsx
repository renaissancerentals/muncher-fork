import React from 'react';
import renrenMobile from './assets/renren-mobile-logo.png';
import accessibilityLogo from './assets/accessibility-logo.png';
import renrenLogo from './assets/renren-logo.png';
import equalHousingLogo from './assets/equal-housing-logo.png';
import chamberLogo from './assets/chamber-logo.png';
import rainbowLogo from './assets/rainbow-logo.png';
import './assets/Footer.scss';

export const Footer: React.FC<FooterProps> = ({nav, accessibilityLink}) => {
    return (
        <footer>
            <div className="mobile">
                <div className="div-footer-logo">
                    <div><img src={equalHousingLogo} alt="equal housing opportunity " height="60"/></div>

                    <a href="https://www.renaissancerentals.com" className="href-logo">
                        <img src={renrenMobile} alt="renaissance rentals " height="90"/>
                    </a>
                    <div>
                        <a href="https://www.chamberbloomington.org/">
                            <img src={chamberLogo} alt="chamber member  " height="60"/>
                        </a>
                    </div>
                </div>
                <a href={accessibilityLink ? accessibilityLink : "https://www.renaissancerentals.com/accessibility"}>
                    <img src={accessibilityLogo} alt="accessibility" height="25"/>
                </a>

                <nav>
                    {nav}
                </nav>
                <div>
                    <img src={rainbowLogo} alt="we welcome all " height="30"/>
                </div>


            </div>
            <div className="main">
                <div className="container">
                    <div className="left">
                        <nav>
                            {nav}
                        </nav>
                    </div>
                    <div className="center">
                        <a href="https://www.renaissancerentals.com" className="href-logo">
                            <img src={renrenLogo} height="150" alt="renaissance rentals, we build community"/>
                        </a>
                    </div>
                    <div className="right">
                        <div className="first">
                            <div><img src={equalHousingLogo} alt="equal housing opportunity " height="60"/></div>
                            <div>
                                <a href="https://www.chamberbloomington.org/">
                                    <img src={chamberLogo} alt="chamber member  " height="60"/>
                                </a>
                            </div>
                        </div>
                        <div>
                            <img src={rainbowLogo} alt="we welcome all " height="30"/>
                        </div>
                        <a href={accessibilityLink ? accessibilityLink : "https://www.renaissancerentals.com/accessibility"}>
                            <img src={accessibilityLogo} alt="accessiblity " height="25"/>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export interface FooterProps {
    nav: React.ReactNode;
    accessibilityLink?: string;
}