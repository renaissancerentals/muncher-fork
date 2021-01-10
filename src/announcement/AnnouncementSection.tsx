import React, {Fragment, useEffect, useState} from "react";
import './assets/Announcement.scss';
import {Button} from "@contentmunch/muncher-ui";
export const AnnouncementSection: React.FC<AnnouncementSectionProps> = ({handleContactClicked}) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5000);
        return () => clearTimeout(timer);

    }, []);
    return (
        <Fragment>
            {
                isVisible ?
                    <div className="section-announcement">
                        <section className="left">
                            <h2>Offices Are Safely Open</h2>
                            <p>
                                Our offices are open by appointment; walk-in's are also welcome.
                                We are now offering self-guided tours on-site in select units.
                            </p>
                            <Button onClick={handleContactClicked} size="small">Questions? contact us
                                ››</Button>
                        </section>
                        <section className="right">
                            <h2>Live, Virtual & Video Tours Available</h2>
                            <p>
                                Do you prefer to look for your next home from the comfort of your own living room?
                                Schedule a live video tour with our leasing team for a customized experience.We also
                                have Virtual 360&deg; Tours and Video Tours for you to view online at your
                                convenience.
                            </p>
                        </section>
                    </div> : ""
            }
        </Fragment>
    );
};

export interface AnnouncementSectionProps {
    handleContactClicked: () => void;
}