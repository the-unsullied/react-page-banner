import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, findRenderedComponentWithType, Simulate } from 'react-addons-test-utils';
import PageBanner from './../dist/PageBanner';

const noop = () => {};

const createComponent = function(props = {}, shouldReturnParent) {

  const state = Object.assign({
    message: '',
    type: 'success',
    duration: 3000,
    afterClose: () => {},
    topOffset: '0px',
    topPalmOffset: '0px',
    hideShim: false,
    sticky: false
  }, props);

  const Parent = React.createFactory(React.createClass({
    getInitialState() { return state; },
    render() { return <PageBanner {...this.state} /> }
  }));

  const parentComponent = renderIntoDocument(Parent());
  const component = findRenderedComponentWithType(parentComponent, PageBanner);

  return shouldReturnParent ? { parent: parentComponent, component } : component;
};

context('PageBanner', () => {
  describe('initial load', () => {
  });
});
