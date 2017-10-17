import React from 'react';
import classnames from 'classnames';
import { List, fromJS } from 'immutable';

import BabyBanner from './BabyBanner';

import './waypoints';


export default React.createClass({
  displayName: 'PageBanner',
  waypoint: null,

  propTypes: {
    pageMessages: React.PropTypes.object,
    triggerClose: React.PropTypes.number,
    triggerOpen: React.PropTypes.number,
    onBannerClose: React.PropTypes.func,
    isStatic: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      pageMessages: List(),
      triggerClose: 0,
      triggerOpen: 0,
      onBannerClose: () => {},
      isStatic: false
    };
  },

  getInitialState() {
    return {
      isShowing: false,
      isFixed: false,
      ariaHidden: true
    };
  },

  componentWillMount() {
    const { isStatic } = this.props;

    if (isStatic) {
      this.setState({
        isShowing: true,
        ariaHidden: false
      });
    }
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
    if (this.waypoint) {
      this.waypoint.destroy();
    }
  },

  componentDidUpdate() {
    const { isStatic } = this.props;
    if (isStatic) return;

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
        { isShowing ? this.getPageBanners() : null }
      </div>);
  },

  getPageBanners() {
    const { afterClose, closeIconClass, duration, message, pageMessages, type } = this.props;
    let messages = pageMessages;

    if (pageMessages.isEmpty()) {
      messages = fromJS([{ afterClose, closeIconClass, duration, message, type }]);
    }

    return this.renderPageBanners(messages);
  },

  renderPageBanners(pageMessages) {
    const { onBannerClose, isStatic } = this.props;

    return pageMessages.map((pageMessage, index) => {
      if (!pageMessage) return;

      return (<BabyBanner
        key={index}
        afterClose={pageMessage.get('afterClose')}
        bannerId={index}
        closeIconClass={pageMessage.get('closeIconClass')}
        duration={pageMessage.get('duration')}
        message={pageMessage.get('message')}
        onBannerClose={onBannerClose}
        type={pageMessage.get('type')}
        isStatic={isStatic}
      />);
    });
  }
});
