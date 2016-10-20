/**
@class PageBanner
to set shim, make sure that <PageBanner /> is at the top of your page.
*/
import React from 'react';
import classnames from 'classnames';
import './waypoints';

let waypoint;

export default React.createClass({

  getDefaultProps: function() {
    return {
      message: '',
      type: 'success',
      duration: 3000,
      afterClose: () => {},
      topOffset: '0px',
      topPalmOffset: '0px',
      hideShim: false,
      sticky: false,
      closeIconClass: ''
    };
  },

  propTypes: {
    message: React.PropTypes.string,
    type: React.PropTypes.string,
    duration: React.PropTypes.number,
    afterClose: React.PropTypes.func,
    topOffset: React.PropTypes.string,
    topPalmOffset: React.PropTypes.string,
    hideShim: React.PropTypes.bool,
    sticky: React.PropTypes.bool,
    closeIconClass: React.PropTypes.string
  },

  getInitialState() {
    return {
      closePageBannerTimer: null,
      isShowing: false,
      isFixed: false,
      height: null
    }
  },

  componentDidMount() {
    //set the height of the banner to animate in and out correctly
    const { topOffset, topPalmOffset } = this.props;
    const el = this.refs.pageBannerBody;
    var height = el.clientHeight;
    el.style.top = `${-(height)}px`;

    this.setState({ height });

    if(topOffset) {
      document.querySelector('style').textContent += `.page-banner { top: ${topOffset} }`;
    }
    if(topPalmOffset) {
      document.querySelector('style').textContent += `@media screen and (max-width: 525px) { .page-banner { top: ${topPalmOffset} } }`;
    }

    waypoint = new Waypoint({
      element: this.refs.pageBanner,
      handler: function(direction) {
        this._handleWaypoint(direction);
      }.bind(this)
    });

    //for css animation, move to bottom of call stack
    setTimeout(this._toggleIsShowing);
  },

  componentWillUnmount() {
    waypoint.destroy();
  },

  _handleWaypoint(direction) {
    const isFixed = direction === 'down';
    this.setState({ isFixed });
  },

  _toggleIsShowing() {
    const isShowing = !this.state.isShowing;
    const { duration, hideShim, sticky } = this.props;
    this.setState({ isShowing });
    if(isShowing) {
      if(sticky) {
        return;
      }
      this.setState({closePageBannerTimer: setTimeout(this._close, duration)});
      if(hideShim) { return; }
      this.refs.pageBannerShim.style.height = `${this.state.height}px`;
    } else {
      if(hideShim) { return; }
      this.refs.pageBannerShim.style.height = `0px`;
    }
  },

  _close() {
    this._toggleIsShowing();
    clearTimeout(this.state.closePageBannerTimer);

    setTimeout(() => {
      if(typeof this.props.afterClose === 'function') {
        this.props.afterClose();
      }
    }, 300);
  },

  render() {
    const { isFixed, isShowing } = this.state;
    const { message, type, hideShim, closeIconClass } = this.props;
    return <div>
      <div ref="pageBanner" className={classnames("page-banner",`page-banner--${type}`, {'page-banner--fixed': isFixed})}>
        <div ref="pageBannerBody" className={classnames("page-banner__body", {'page-banner__body--showing': isShowing})}>
          <div className="page-banner__close">
            <i className={`page-banner__icon-close ${closeIconClass}`} onClick={this._close} />
          </div>
          { message }
        </div>
      </div>
      { hideShim ? null : <div ref="pageBannerShim" className="page-banner__shim"></div> }
    </div>
  }
});
