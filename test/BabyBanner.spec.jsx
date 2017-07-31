import React from 'react';
import BabyBanner from './../dist/BabyBanner';
import { shallow } from 'enzyme';
const noop = () => {};

const createComponent = function(props = {}) {

  const updatedProps = Object.assign({
    afterClose: noop,
    ariaLabelCloseIcon: 'Close Icon',
    ariaLiveMessage: 'off',
    closeIconClass: '',
    duration: 3000,
    message: '',
    roleCloseIcon: 'button',
    roleMessage: null,
    sticky: false,
    tabIndexBody: '-1',
    topOffset: null,
    topPalmOffset: null,
    type: 'success'
  }, props);

  return shallow(
    <BabyBanner {...updatedProps} />
  );
};

context('BabyBanner', () => {
  describe('render', () => {
    it('should show BabyBanner', () => {
      const wrapper = createComponent();
      wrapper.setProps({ message: "This is BabyBanner test", type: 'error'});

      expect(wrapper.find('div.page-banner')).to.have.length(1);
      expect(wrapper.find('div.page-banner__body')).to.have.length(1);
      expect(wrapper.find('div.page-banner__close')).to.have.length(1);
      expect(wrapper.text()).to.equals('This is BabyBanner test')
    });

  });
});
