/**
@class PageBanner
to set shim, make sure that <PageBanner /> is at the top of your page.
*/
import React from 'react';
import classnames from 'classnames';
import 'waypoints';
import { FormattedHTMLMessage } from 'react-intl';

let waypoint;

export default React.createClass({

  getDefaultProps: function() {
    return {
      message: '',
      type: 'success',
      duration: 95000,
      afterClose: () => {},
      topOffset: '0px',
      topPalmOffset: '0px'
    };
  },

  propTypes: {
    message: React.PropTypes.string,
    type: React.PropTypes.string,
    duration: React.PropTypes.number,
    afterClose: React.PropTypes.func,
    topOffset: React.PropTypes.string,
    topPalmOffset: React.PropTypes.string
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
    const el = this.refs.pageBannerBody;
    const topOffset = this.props.topOffset;
    const topPalmOffset = this.props.topPalmOffset;
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
    const { duration } = this.props;
    this.setState({ isShowing });
    if(isShowing) {
      if(duration) {
        this.setState({closePageBannerTimer: setTimeout(this._close, duration)});
      }
      this.refs.pageBannerShim.style.height = `${this.state.height}px`;
    } else {
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
    const type = this.props.type;
    const { customMessage } = this.props;
    return <div>
      <div ref="pageBanner" className={classnames("page-banner",`page-banner--${type}`, {'page-banner--fixed': isFixed})}>
        <div ref="pageBannerBody" className={classnames("page-banner__body", {'page-banner__body--showing': isShowing})}>
          <div className="page-banner__close">
            <i className="icon-close" onClick={this._close} />
          </div>
          {
            customMessage ? customMessage : <FormattedHTMLMessage id={this.props.message} values={this.props.translationValues} />
          }
        </div>
      </div>
      <div ref="pageBannerShim" className="page-banner__shim"></div>
    </div>
  }
});
