'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _immutable = require('immutable');

var _BabyBanner = require('./BabyBanner');

var _BabyBanner2 = _interopRequireDefault(_BabyBanner);

require('./waypoints');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'PageBanner',
  waypoint: null,

  propTypes: {
    pageMessages: _react2.default.PropTypes.object,
    triggerClose: _react2.default.PropTypes.number,
    triggerOpen: _react2.default.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      pageMessages: (0, _immutable.List)(),
      triggerClose: 0,
      triggerOpen: 0,
      hideShim: false
    };
  },
  getInitialState: function getInitialState() {
    return {
      isShowing: false,
      isFixed: false,
      ariaHidden: true
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _props = this.props,
        triggerClose = _props.triggerClose,
        triggerOpen = _props.triggerOpen;


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
  componentWillUnmount: function componentWillUnmount() {
    this.waypoint.destroy();
  },
  componentDidUpdate: function componentDidUpdate() {
    var bannerContainer = this.pageBannerContainer;

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
  _handleWaypoint: function _handleWaypoint(direction) {
    var isFixed = direction === 'down';
    this.setState({ isFixed: isFixed });
  },
  _toggleShimHeight: function _toggleShimHeight(bannerContainer) {
    var pageBanners = bannerContainer.getElementsByClassName('page-banner__body');

    var shimHeight = 0;
    Array.from(pageBanners).forEach(function (children) {
      shimHeight += children.scrollHeight;
    });

    this.pageBannerShim.style.height = shimHeight + 'px';
  },
  render: function render() {
    var _this = this;

    var _state = this.state,
        ariaHidden = _state.ariaHidden,
        isFixed = _state.isFixed,
        isShowing = _state.isShowing;


    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        {
          'aria-hidden': ariaHidden,
          className: (0, _classnames2.default)('page-banner-container', { 'page-banner-container--fixed': isFixed }),
          ref: function ref(pageBannerContainer) {
            _this.pageBannerContainer = pageBannerContainer;
          }
        },
        isShowing ? this.renderPageBanner() : null
      ),
      this.renderShim()
    );
  },
  renderShim: function renderShim() {
    var _this2 = this;

    var hideShim = this.props.hideShim;


    return hideShim ? null : _react2.default.createElement('div', {
      ref: function ref(bannerShim) {
        _this2.pageBannerShim = bannerShim;
      },
      className: 'page-banner__shim'
    });
  },
  renderPageBanner: function renderPageBanner() {
    var _props2 = this.props,
        pageMessages = _props2.pageMessages,
        onBannerClose = _props2.onBannerClose;


    return pageMessages.map(function (pageMessage, index) {
      if (pageMessage === null) return;

      return _react2.default.createElement(_BabyBanner2.default, {
        key: index,
        bannerId: index,
        message: pageMessage.get('message'),
        closeIconClass: 'icon-close',
        type: pageMessage.get('type'),
        duration: pageMessage.get('duration'),
        afterClose: pageMessage.get('afterClose'),
        onBannerClose: onBannerClose
      });
    });
  }
});
module.exports = exports['default'];
