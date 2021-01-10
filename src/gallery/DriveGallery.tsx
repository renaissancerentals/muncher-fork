import React, {useEffect, useState} from "react";
import {Gallery, GalleryType} from "./Gallery";
import {GalleryImage} from "./data/GalleryImage";
import {getGalleryImages} from "./service/GalleryService";
import {Button} from "@contentmunch/muncher-ui";
import "./assets/DriveGallery.scss";

export const DriveGallery: React.FC<DriveGalleryProps> = ({driveId, type, initialSize, showName}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [currentImages, setCurrentImages] = useState<GalleryImage[]>([]);
    const [showButton, setShowButton] = useState<boolean>(true);

    useEffect(() => {
        getGalleryImages(driveId).then(galleryImages => {
            setImages(galleryImages);
            if (initialSize && initialSize < galleryImages.length) {
                setCurrentImages(galleryImages.slice(0, initialSize));
            } else {
                setCurrentImages(galleryImages);
            }
            setIsLoading(false);
        })
    }, [driveId, initialSize]);

    const handleButtonClick = () => {
        setShowButton(false);
        setCurrentImages(images);
    };

    return (
        <div className="drive-gallery">
            <Gallery images={currentImages} isLoading={isLoading} type={type} showName={showName}/>
            {showButton ? <Button variant={"secondary"} onClick={handleButtonClick}>More Pictures »</Button> : ""}
        </div>

    );
};

export interface DriveGalleryProps {
    driveId: string;
    type?: GalleryType;
    initialSize?: number;
    showName?: boolean;
}

DriveGallery.defaultProps = {
    type: "simple",
    showName: true
}