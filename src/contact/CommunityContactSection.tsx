import React, {useEffect, useState} from 'react';
import './assets/Contact.scss';
import {getCommunityContact} from "./service/ContactService";
import {CommunityContact} from "./data/CommunityContact";
import {CommunityId} from "..";
import {ContactSection} from "./ContactSection";
import {ContactSectionSkeleton} from "./ContactSectionSkeleton";

export const CommunityContactSection: React.FC<CommunityContactSectionProps> = ({communityId, variant}) => {
        const [isLoading, setIsLoading] = useState<boolean>(true);
        const [communityContact, setCommunityContact] = useState<CommunityContact>();


        useEffect(() => {
            if (communityId) {
                getCommunityContact(communityId).then(contact => {
                    setIsLoading(false);
                    setCommunityContact(contact);
                });
            } else {
                setIsLoading(false);
            }
        }, [communityId]);

        return (
            isLoading ? <ContactSectionSkeleton/> :
                <ContactSection variant={variant}
                                as={communityContact?.as}
                                conversionTrackingIds={communityContact?.conversionTrackingIds}
                                to={communityContact?.to}
                                subject={communityContact?.to}
                                communityId={communityId}
                />
        );
    }
;

export interface CommunityContactSectionProps {
    communityId: CommunityId;
    variant?: "long";
}