import React from 'react';
import chai, { expect } from 'chai'
import App from './index';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

/**
  This is a test file. We are using enzyme to generate our "wrapper" shell.
  This wrapper is an in-memory representaion of how our elemnet would render
  to DOM.

  We also use chai-enzyme to simplify our testing statements.
**/
describe('App Component', () => {
  it('render a div', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).to.have.tagName('div')
  });
});
