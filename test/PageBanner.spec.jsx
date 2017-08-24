import React from 'react';
import PageBanner from './../dist/PageBanner';
import {shallow} from 'enzyme';
import {fromJS, List} from 'immutable'
const noop = () => {
};
const createComponent = function (props = {}) {

  const updatedProps = Object.assign({
    pageMessages: List(),
    hideShim: false,
    triggerOpen: 0,
    triggerClose: 0
  }, props);

  return shallow(
    <PageBanner {...updatedProps} />
  );
};

context('PageBanner', () => {
  describe('componentWillReceiveProps', () => {
    it('should update triggerOpen', () => {
      const wrapper = createComponent();
      wrapper.setProps({triggerOpen: 1});

      expect(wrapper.state().isShowing).to.be.true;
      expect(wrapper.state().ariaHidden).to.be.false;
    });

    it('should update triggerClose', () => {
      const wrapper = createComponent();
      wrapper.setProps({triggerClose: 1});

      expect(wrapper.state().isShowing).to.be.false;
      expect(wrapper.state().ariaHidden).to.be.true;
    });
  });

  describe('render', () => {
    it('should render pageBanner container with one BabyPageBanner', () => {
      const wrapper = createComponent();
      wrapper.setProps({
        triggerOpen: 1,
        pageMessages: fromJS([{message: 'Page Banner 1', type: 'success', duration: 0}])
      });

      expect(wrapper.find('div.page-banner__container')).to.have.length(1);
      expect(wrapper.find('BabyBanner')).to.have.length(1);
    });

    it('should render pageBanner container with multiple BabyPageBanners', () => {
      const wrapper = createComponent();
      wrapper.setProps({
        triggerOpen: 1,
        pageMessages: fromJS([{message: 'Page Banner 1', type: 'success', duration: 0},
          {message: 'Page Banner 2', type: 'success', duration: 0},
          {message: 'Page Banner 3', type: 'success', duration: 0}
        ])
      });

      expect(wrapper.find('div.page-banner__container')).to.have.length(1);
      expect(wrapper.find('BabyBanner')).to.have.length(3);
    });
  });

  it('should render one pageBanner if we pass single banner props', () => {
    const wrapper = createComponent();
    wrapper.setProps({
      triggerOpen: 1,
      message: 'Page Banner 2',
      type: 'success',
      duration: 0
    });

    expect(wrapper.find('div.page-banner__container')).to.have.length(1);
    expect(wrapper.find('BabyBanner')).to.have.length(1);
  });
});
