'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _immutable = require('immutable');

var _BabyBanner = require('./BabyBanner');

var _BabyBanner2 = _interopRequireDefault(_BabyBanner);

require('./waypoints');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isShowing: false,
      isFixed: false,
      ariaHidden: true
    }, _this.waypoint = null, _this._handleWaypoint = function (direction) {
      var isFixed = direction === 'down';
      _this.setState({ isFixed: isFixed });
    }, _this.getPageBanners = function () {
      var _this$props = _this.props,
          afterClose = _this$props.afterClose,
          closeIconClass = _this$props.closeIconClass,
          duration = _this$props.duration,
          message = _this$props.message,
          pageMessages = _this$props.pageMessages,
          type = _this$props.type;

      var messages = pageMessages;

      if (pageMessages.isEmpty()) {
        messages = (0, _immutable.fromJS)([{ afterClose: afterClose, closeIconClass: closeIconClass, duration: duration, message: message, type: type }]);
      }

      return _this.renderPageBanners(messages);
    }, _this.renderPageBanners = function (pageMessages) {
      var _this$props2 = _this.props,
          onBannerClose = _this$props2.onBannerClose,
          isStatic = _this$props2.isStatic;


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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_class, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var isStatic = this.props.isStatic;


      if (isStatic) {
        this.setState({
          isShowing: true,
          ariaHidden: false
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
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
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.waypoint) {
        this.waypoint.destroy();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
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
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

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
            _this2.pageBannerContainer = pageBannerContainer;
          }
        },
        isShowing ? this.getPageBanners() : null
      );
    }
  }]);

  return _class;
}(_react2.default.Component);

_class.displayName = 'PageBanner';
_class.propTypes = {
  pageMessages: _propTypes2.default.object,
  triggerClose: _propTypes2.default.number,
  triggerOpen: _propTypes2.default.number,
  onBannerClose: _propTypes2.default.func,
  isStatic: _propTypes2.default.bool
};
_class.defaultProps = {
  pageMessages: (0, _immutable.List)(),
  triggerClose: 0,
  triggerOpen: 0,
  onBannerClose: function onBannerClose() {},
  isStatic: false
};
exports.default = _class;
module.exports = exports['default'];
