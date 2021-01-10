import React, {useRef, useState} from 'react';
import './assets/Video.scss';
import {Icon, Spinner} from "@contentmunch/muncher-ui";

export const Video: React.FC<VideoProps> = ({url}) => {
    const [isMute, setIsMute] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const video = useRef<HTMLVideoElement>(null);
    const onVideoLoad = () => {
        setVideoLoaded(true);

    }
    return (
        <div className="div-video">
            {videoLoaded ? "" : <Spinner/>}
            <video ref={video} onLoadedData={onVideoLoad} src={url} muted={isMute} autoPlay loop playsInline>
                Your browser does not support the video tag.
            </video>
            {isMute ?
                <span className="volume">
                    <Icon name="mute" size="small" weight={2} onClick={() => {
                        setIsMute(false)
                    }}/>
                </span>
                :
                <span className="volume">
                    <Icon name="volume" size="small" weight={2} onClick={() => {
                        setIsMute(true)
                    }}/>
                </span>
            }
            {isPlaying ?
                <span className="play-pause">
                    <Icon name="pause" size="small" weight={2} onClick={() => {
                        setIsPlaying(false);
                        video.current?.pause();
                    }}/>
                </span>
                :
                <span className="play-pause">
                    <Icon name="play" size="small" weight={2} onClick={() => {
                        setIsPlaying(true);
                        video.current?.play();
                    }}/>
                </span>
            }
        </div>
    );
}

export interface VideoProps {
    url: string;
}