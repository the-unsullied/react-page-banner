import React from 'react';
import PageBanner from './../dist/PageBanner';
import { shallow } from 'enzyme';
const noop = () => {};

const createComponent = function(props = {}) {

  const state = Object.assign({
    messages: {},
    ariaHidden: false,
    triggerOpen: false,
    triggerClose: false,
  }, props);

  return shallow(
    <PageBanner {...state} />
  );
};

context('PageBanner', () => {
  describe('componentWillReceiveProps', () => {
    it('should update triggerOpen', () => {

    });
  });
});
