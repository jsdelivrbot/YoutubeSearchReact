import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY_YOUTUBE = 'AIzaSyCERY5kOsa4A8JvKUrSpNZRPzPg6nqaHvk';

class App extends Component {
	
	constructor( props ) {
		super( props );
		this.state = {
			videos: [],
			selectedVideo: null
		};
		this.videoSearch( '' );
	}
	
	videoSearch( term ) {
		YTSearch( {
			key: API_KEY_YOUTUBE,
			term
		}, ( videos ) => {
			this.setState( {
				videos,
				selectedVideo: videos[0]
			} );
		} );
	}
	
	render() {
		const videoSearch = _.debounce( ( term ) => { this.videoSearch( term ) }, 300 ); 
		
		return (
			<div>
				<SearchBar onSearchTermChange={ videoSearch } />
				<VideoDetail video={ this.state.selectedVideo } />
				<VideoList
					onVideoSelect={ ( selectedVideo ) => { this.setState( { selectedVideo } ) } }
					videos={ this.state.videos }
				/>
			</div>
		);
	}
};

ReactDOM.render( <App />, document.querySelector( '.container' ) );