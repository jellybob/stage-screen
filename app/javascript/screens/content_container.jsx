import React from 'react';
import YouTube from 'react-youtube';

class ImageContainer extends React.Component {
  componentDidMount() {
    // This needs to be an interval. It was originally using setTimeout,
    // which seems cleaner, but didn't work if more than one image was
    // displayed in a row. In the case of multiple images in a row the
    // content property is just updated, rather than the component being
    // remounted.
    this.completionTimer = setInterval(this.props.onComplete, 2500);
  }

  componentWillUnmount() {
    clearInterval(this.completionTimer);
  }

  render() {
    return <img src={this.props.content.url} id="content-image" />
  }
}

class VideoContainer extends React.Component {
  render() {
    return (
      <video
        src={this.props.content.url}
        autoPlay="autoPlay"
        muted="muted"
        preload="auto"
        onEnded={this.props.onComplete}
        width="100%"
        height="100%" />
    );
  }
}

class YouTubeContainer extends React.Component {
  render() {
    var videoUrl = this.props.content.url.split('/');
    var videoId = videoUrl[videoUrl.length - 1];
    var opts = {
      width: window.innerWidth,
      height: window.innerHeight,
      playerVars: {
        start: 0,
        autoplay: 1,
        controls: 0,
        disablekb: 1, // Disable YouTube keyboard shortcuts
        modestbranding: 1, // Remove YouTube branding
        iv_load_policy: 3, // Don't show annotations
        fs: 0, // Disable the fullscreen button,
        enablejsapi: 1,
        origin: document.location.origin,
      },
    }

    return (
      <YouTube
        videoId={videoId}
        id="content-youtube"
        opts={opts}
        onEnd={this.props.onComplete}
        onError={this.props.onComplete}
        />
    )
  }
}

var contentComponents = {
  'image': ImageContainer,
  'youtube': YouTubeContainer,
  'video': VideoContainer,
};

class ContentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
    };
  }

  componentDidMount() {
    this.nextItem();
  }

  nextItem() {
    console.log('Loading next content item');

    var itemUrl = '/content';
    if (this.state.content) {
      itemUrl = `${itemUrl}?previous=${this.state.content.id}`
    }

    fetch(itemUrl).
      then(response => response.json()).
      then(data => {
        this.setState({ 'content': data });
      });
  }

  renderContent() {
    var content = this.state.content;
    if (!content) {
      return null;
    }

    console.log(content.content_type);
    var ContentComponent = contentComponents[content.content_type];
    return <ContentComponent content={content} onComplete={this.nextItem.bind(this)} />;
  }

  render() {
    return (
      <div className="content">
        { this.renderContent() }
      </div>
    );
  }
}

export default ContentContainer;
