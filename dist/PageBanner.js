'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./waypoints');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var waypoint = void 0; /**
                       @class PageBanner
                       to set shim, make sure that <PageBanner /> is at the top of your page.
                       */


exports.default = _react2.default.createClass({

  getDefaultProps: function getDefaultProps() {
    return {
      message: '',
      type: 'success',
      duration: 3000,
      afterClose: function afterClose() {},
      topOffset: '0px',
      topPalmOffset: '0px',
      hideShim: false,
      sticky: false,
      closeIconClass: ''
    };
  },

  propTypes: {
    message: _react2.default.PropTypes.string,
    type: _react2.default.PropTypes.string,
    duration: _react2.default.PropTypes.number,
    afterClose: _react2.default.PropTypes.func,
    topOffset: _react2.default.PropTypes.string,
    topPalmOffset: _react2.default.PropTypes.string,
    hideShim: _react2.default.PropTypes.bool,
    sticky: _react2.default.PropTypes.bool,
    closeIconClass: _react2.default.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return {
      closePageBannerTimer: null,
      isShowing: false,
      isFixed: false,
      height: null
    };
  },
  componentDidMount: function componentDidMount() {
    //set the height of the banner to animate in and out correctly
    var _props = this.props;
    var topOffset = _props.topOffset;
    var topPalmOffset = _props.topPalmOffset;

    var el = this.refs.pageBannerBody;
    var height = el.clientHeight;
    el.style.top = -height + 'px';

    this.setState({ height: height });

    if (topOffset) {
      document.querySelector('style').textContent += '.page-banner { top: ' + topOffset + ' }';
    }
    if (topPalmOffset) {
      document.querySelector('style').textContent += '@media screen and (max-width: 525px) { .page-banner { top: ' + topPalmOffset + ' } }';
    }

    waypoint = new Waypoint({
      element: this.refs.pageBanner,
      handler: function (direction) {
        this._handleWaypoint(direction);
      }.bind(this)
    });

    //for css animation, move to bottom of call stack
    setTimeout(this._toggleIsShowing);
  },
  componentWillUnmount: function componentWillUnmount() {
    waypoint.destroy();
  },
  _handleWaypoint: function _handleWaypoint(direction) {
    var isFixed = direction === 'down';
    this.setState({ isFixed: isFixed });
  },
  _toggleIsShowing: function _toggleIsShowing() {
    var isShowing = !this.state.isShowing;
    var _props2 = this.props;
    var duration = _props2.duration;
    var hideShim = _props2.hideShim;
    var sticky = _props2.sticky;

    this.setState({ isShowing: isShowing });
    if (isShowing) {
      if (sticky) {
        return;
      }
      this.setState({ closePageBannerTimer: setTimeout(this._close, duration) });
      if (hideShim) {
        return;
      }
      this.refs.pageBannerShim.style.height = this.state.height + 'px';
    } else {
      if (hideShim) {
        return;
      }
      this.refs.pageBannerShim.style.height = '0px';
    }
  },
  _close: function _close() {
    var _this = this;

    this._toggleIsShowing();
    clearTimeout(this.state.closePageBannerTimer);

    setTimeout(function () {
      if (typeof _this.props.afterClose === 'function') {
        _this.props.afterClose();
      }
    }, 300);
  },
  render: function render() {
    var _state = this.state;
    var isFixed = _state.isFixed;
    var isShowing = _state.isShowing;
    var _props3 = this.props;
    var message = _props3.message;
    var type = _props3.type;
    var hideShim = _props3.hideShim;
    var closeIconClass = _props3.closeIconClass;

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { ref: 'pageBanner', className: (0, _classnames2.default)("page-banner", 'page-banner--' + type, { 'page-banner--fixed': isFixed }) },
        _react2.default.createElement(
          'div',
          { ref: 'pageBannerBody', className: (0, _classnames2.default)("page-banner__body", { 'page-banner__body--showing': isShowing }) },
          _react2.default.createElement(
            'div',
            { className: 'page-banner__close' },
            _react2.default.createElement('i', { className: 'page-banner__icon-close ' + closeIconClass, onClick: this._close })
          ),
          message
        )
      ),
      hideShim ? null : _react2.default.createElement('div', { ref: 'pageBannerShim', className: 'page-banner__shim' })
    );
  }
});
module.exports = exports['default'];
