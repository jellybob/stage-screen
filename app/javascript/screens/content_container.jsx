import React from 'react';
import YouTube from 'react-youtube';

class ImageContainer extends React.Component {
  componentDidMount() {
    this.completionTimer = setTimeout(this.props.onComplete, 2500);
  }

  componentWillUnmount() {
    clearTimeout(this.completionTimer);
  }

  render() {
    return <img src={this.props.content.url} id="content-image" />
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
        autoplay: 1,
        controls: 0,
        disablekb: 1, // Disable YouTube keyboard shortcuts
        modestbranding: 1, // Remove YouTube branding
        iv_load_policy: 3, // Don't show annotations
        fs: 0, // Disable the fullscreen button
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
    //this.timeout = setInterval(this.nextItem.bind(this), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  nextItem() {
    fetch('/content/next').
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
