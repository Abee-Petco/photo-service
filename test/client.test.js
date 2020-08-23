import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Gallery from '../react-client/src/Gallery.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('Gallery', () => {
  let testImages = [{small: 'https://images.unsplash.com/photo-1?w=54',
                medium: 'https://images.unsplash.com/photo-1?w=400',
                large: 'https://images.unsplash.com/photo-1?w=1000'},
                {small: 'https://images.unsplash.com/photo-2?w=54',
                medium: 'https://images.unsplash.com/photo-2?w=400',
                large: 'https://images.unsplash.com/photo-2?w=1000'}]

  it('should render the main image', () => {
    const wrapper = shallow(<Gallery itemImages={testImages} />);
    expect(wrapper.find('img.galleryMainImage').prop('src')).toEqual('https://images.unsplash.com/photo-1?w=400');
  });

  it('should render small images', () => {
    const wrapper = shallow(<Gallery itemImages={testImages} />);
    expect(wrapper.find('img.gallerySmallImage')).toHaveLength(2);
  });

  it('should render the large image', () => {
    const wrapper = shallow(<Gallery itemImages={testImages} />);
    wrapper.find('img.galleryMainImage').simulate('mouseEnter', {nativeEvent: {offsetX: 10, offsetY: 20}});
    expect(wrapper.state('preview')).toBe(true);
  });


})
