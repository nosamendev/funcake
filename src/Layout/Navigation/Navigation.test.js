import React from 'react';
import renderer from 'react-test-renderer';
import { NavLink } from 'react-router-dom';
import { Navigation } from './Navigation';
//nepremenno pravim named export na <Navigation> purvo!
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter});

describe('Render Navigation', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Navigation isAuthenticated={false} email={"test-email"} />);
    });

    it('should render 8 NavLinks if not authenticated', () => {
        wrapper.setProps({isAuthenticated: false, email: 'test-email'});
        expect(wrapper.find(NavLink)).toHaveLength(8);
    });

    it('should render 10 NavLinks if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavLink)).toHaveLength(10);
    })
    it('should have a Logout button', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavLink exact to="/logout">LOGOUT</NavLink>)).toEqual(true);
    });
    
});