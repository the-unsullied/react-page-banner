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
      hideShim: false
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
      this._toggleShimHeight(bannerContainer);
      this.waypoint = new Waypoint({
        element: this.pageBannerContainer,
        handler: function (direction) {
          this._handleWaypoint(direction);
        }.bind(this)
      });
    }
  },


  _handleWaypoint(direction) {
    const isFixed = direction === 'down';
    this.setState({ isFixed });
  },

  _toggleShimHeight(bannerContainer) {
    const pageBanners = bannerContainer.getElementsByClassName('page-banner__body');

    let shimHeight = 0;
    Array.from(pageBanners).forEach(children => {
      shimHeight += children.scrollHeight;
    });

    this.pageBannerShim.style.height = `${(shimHeight)}px`;
  },

  render() {
    const { ariaHidden, isFixed, isShowing } = this.state;

    return (<div>
      <div
        aria-hidden={ariaHidden}
        className={classnames('page-banner-container', { 'page-banner-container--fixed': isFixed })}
        ref={pageBannerContainer => {
          this.pageBannerContainer = pageBannerContainer;
        }}
      >
        { isShowing ? this.renderPageBanner() : null }
      </div>
      { this.renderShim() }
    </div>);
  },

  renderShim() {
    const { hideShim } = this.props;

    return (hideShim ? null : <div
      ref={bannerShim => {
        this.pageBannerShim = bannerShim;
      }}
      className='page-banner__shim'
    />);
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
