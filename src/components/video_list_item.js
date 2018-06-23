import React from 'react';

const VideoListItem = ({video, onVideoSelect}) => {
    // or const video = props.video;
    const ImageUrl = video.snippet.thumbnails.default.url;
    return (
        <li onClick={() => onVideoSelect(video)} className="list-group-item">
            <div className="video-list media">
                <img className="img-thumbnail mr-3" src={ImageUrl}/>

                <div className="media-body">
                    <p>{video.snippet.title}</p>
                </div>
            </div>
        </li>
    )
}

export default VideoListItem;  