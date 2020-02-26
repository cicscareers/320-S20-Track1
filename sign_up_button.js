'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'Now being redirected';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Sign Up'
    );
  }
}

const domContainer = document.querySelector('#sign_up_container');
ReactDOM.render(e(LikeButton), domContainer);