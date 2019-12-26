import React from 'react';
import renderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import Header from './Header';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter});


let wrapper;

beforeEach(() => {
  wrapper = shallow(<Header />);
});

describe('Render Header', () => {
    
    it('render correctly Header component', () => {  
        expect(wrapper).toMatchSnapshot();                                        
    });
});