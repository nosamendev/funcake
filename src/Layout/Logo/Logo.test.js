import React from 'react';
import renderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import Logo from './Logo';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter});

let wrapper;
beforeEach(() => {
    wrapper = shallow(<Logo />);
});

describe('Render Logo', () => {
    
    it('render correctly Logo component', () => {  
        //const LogoComponent = renderer.create(<Logo />).toJSON();
        expect(wrapper).toMatchSnapshot();
    });

    it('should render a link', () => {
        expect(wrapper.find(Link)).toHaveLength(1);
    })
});