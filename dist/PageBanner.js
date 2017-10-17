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
    triggerOpen: _react2.default.PropTypes.number,
    onBannerClose: _react2.default.PropTypes.func,
    isStatic: _react2.default.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      pageMessages: (0, _immutable.List)(),
      triggerClose: 0,
      triggerOpen: 0,
      onBannerClose: function onBannerClose() {},
      isStatic: false
    };
  },
  getInitialState: function getInitialState() {
    return {
      isShowing: false,
      isFixed: false,
      ariaHidden: true
    };
  },
  componentWillMount: function componentWillMount() {
    var isStatic = this.props.isStatic;


    if (isStatic) {
      this.setState({
        isShowing: true,
        ariaHidden: false
      });
    }
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
    if (this.waypoint) {
      this.waypoint.destroy();
    }
  },
  componentDidUpdate: function componentDidUpdate() {
    var isStatic = this.props.isStatic;

    if (isStatic) return;

    var bannerContainer = this.pageBannerContainer;

    if (bannerContainer) {
      if (this.waypoint) return;
      this.waypoint = new Waypoint({
        element: this.pageBannerContainer,
        handler: this._handleWaypoint
      });
    }
  },
  _handleWaypoint: function _handleWaypoint(direction) {
    var isFixed = direction === 'down';
    this.setState({ isFixed: isFixed });
  },
  render: function render() {
    var _this = this;

    var _state = this.state,
        ariaHidden = _state.ariaHidden,
        isFixed = _state.isFixed,
        isShowing = _state.isShowing;


    return _react2.default.createElement(
      'div',
      {
        'aria-hidden': ariaHidden,
        className: (0, _classnames2.default)('page-banner__container', { 'page-banner__container--fixed': isFixed }),
        ref: function ref(pageBannerContainer) {
          _this.pageBannerContainer = pageBannerContainer;
        }
      },
      isShowing ? this.getPageBanners() : null
    );
  },
  getPageBanners: function getPageBanners() {
    var _props2 = this.props,
        afterClose = _props2.afterClose,
        closeIconClass = _props2.closeIconClass,
        duration = _props2.duration,
        message = _props2.message,
        pageMessages = _props2.pageMessages,
        type = _props2.type;

    var messages = pageMessages;

    if (pageMessages.isEmpty()) {
      messages = (0, _immutable.fromJS)([{ afterClose: afterClose, closeIconClass: closeIconClass, duration: duration, message: message, type: type }]);
    }

    return this.renderPageBanners(messages);
  },
  renderPageBanners: function renderPageBanners(pageMessages) {
    var _props3 = this.props,
        onBannerClose = _props3.onBannerClose,
        isStatic = _props3.isStatic;


    return pageMessages.map(function (pageMessage, index) {
      if (!pageMessage) return;

      return _react2.default.createElement(_BabyBanner2.default, {
        key: index,
        afterClose: pageMessage.get('afterClose'),
        bannerId: index,
        closeIconClass: pageMessage.get('closeIconClass'),
        duration: pageMessage.get('duration'),
        message: pageMessage.get('message'),
        onBannerClose: onBannerClose,
        type: pageMessage.get('type'),
        isStatic: isStatic
      });
    });
  }
});
module.exports = exports['default'];
