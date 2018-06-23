import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import axios from 'axios';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyCnAELf58Rm8kbdJB6KiqjFkovn4bfq0-M';
const YTSearchUrl = 'https://www.googleapis.com/youtube/v3/search';
const YTPlaylistUrl = 'https://www.googleapis.com/youtube/v3/playlistItems';

// create component
class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            videos: [],
            selectedVideo: null,
            playlist: []

        };

        this.videoSearch("tesla");
        this.videoPlaylist("25", "PLmss2JFeexMIh7LC4vVpUI8mf0glfb4a3");

    }
    // get search results
    videoSearch(term) {
        YTSearch(YTSearchUrl, {key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
            console.log(this);
        });
    }
    // get playlist
    videoPlaylist(maxResults, playlistId) {
        YTSearch(YTPlaylistUrl, {key: API_KEY, maxResults: maxResults, playlistId: playlistId, term: "kappa"}, (result) => {
              this.setState({
                  playlist: result
                });
        });
    }
     
    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

        return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <SearchBar
                        onSearchTermChange={videoSearch}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <VideoDetail video={this.state.selectedVideo} />
                </div>
                <div className="col-md-4">
                    <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}
                    />
                </div>

            </div>
        </div>
        );
    }
}


// render compotent into DOM
ReactDOM.render(<App />, document.querySelector(".app"));