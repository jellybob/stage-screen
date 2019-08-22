import React from 'react';

class ContentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
    };
  }

  componentDidMount() {
    this.nextItem();
    this.timeout = setInterval(this.nextItem.bind(this), 10000);
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

    return <img src={content.url} id="content-image" />
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
