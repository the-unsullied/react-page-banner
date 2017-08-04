import React from 'react';
import classnames from 'classnames';
import { List } from 'immutable';

import BabyBanner from './BabyBanner';

import './waypoints';


export default React.createClass({
  displayName: 'PageBanner',
  waypoint: null,

  propTypes: {
    pageMessages: React.PropTypes.object,
    triggerClose: React.PropTypes.number,
    triggerOpen: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      pageMessages: List(),
      triggerClose: 0,
      triggerOpen: 0,
    };
  },

  getInitialState() {
    return {
      isShowing: false,
      isFixed: false,
      ariaHidden: true
    };
  },

  componentWillReceiveProps(nextProps) {
    const { triggerClose, triggerOpen } = this.props;

    if (triggerOpen !== nextProps.triggerOpen) {
      this.setState({
        isShowing: true,
        ariaHidden: false
      });
    }

    if (triggerClose !== nextProps.triggerClose) {
      this.setState({
        isShowing: false,
        ariaHidden: true
      });
    }
  },

  componentWillUnmount() {
    this.waypoint.destroy();
  },

  componentDidUpdate() {
    const bannerContainer = this.pageBannerContainer;

    if (bannerContainer) {
      if (this.waypoint) return;
      this.waypoint = new Waypoint({
        element: this.pageBannerContainer,
        handler: this._handleWaypoint
      });
    }
  },


  _handleWaypoint(direction) {
    const isFixed = direction === 'down';
    this.setState({ isFixed });
  },

  render() {
    const { ariaHidden, isFixed, isShowing } = this.state;

    return (
      <div
        aria-hidden={ariaHidden}
        className={classnames('page-banner__container', { 'page-banner__container--fixed': isFixed })}
        ref={pageBannerContainer => {
          this.pageBannerContainer = pageBannerContainer;
        }}
      >
        { isShowing ? this.renderPageBanner() : null }
      </div>);
  },

  renderPageBanner() {
    const { pageMessages, onBannerClose } = this.props;

    return pageMessages.map((pageMessage, index) => {
      if (pageMessage === null) return;

      return (<BabyBanner
        key={index}
        bannerId={index}
        message={pageMessage.get('message')}
        closeIconClass='icon-close'
        type={pageMessage.get('type')}
        duration={pageMessage.get('duration')}
        afterClose={pageMessage.get('afterClose')}
        onBannerClose={onBannerClose}
      />);
    });
  }

});
