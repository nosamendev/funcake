import React from 'react';
import { Product } from './Product';

const createTestProps = () => {
  return {
    loading: false,
    quantity: 0,
    item: 0,
    dataNumber: 0,
    id: 'item0',
    name: 'Banana',
    price: 3.00,
    ...props
  }
}

let wrapper, props;

beforeEach(() => {
  props = createTestProps();
  wrapper = shallow(<Product {...props} />);
});

describe('Render Product', () => {
    
    it('render correctly Product component', () => {  
        //expect(wrapper).toMatchSnapshot();                                        
    });

    it('should render one wrapping div', () => {
      expect(wrapper.find('div#item0')).toHaveLength(1);
    });

    it('should render one title', () => {
      expect(wrapper.find('.title')).toHaveLength(1);
    });

    it('should render one input', () => {
      expect(wrapper.find('input')).toHaveLength(1);
    });
});

describe('Product interactions', () => {
    it('should call validateQuantity function on input change', () => {
      //wrapper.find('input').simulate('change', {target: {value: 10}});
      //expect(wrapper.state('quantity')).toEqual(10);
      const input = wrapper.find('input');
      //input.value = '10';

      //wrapper.validateQuantity = jest.fn();
      //wrapper.update();
      input.simulate('change', {target: {value: '10'}});

      expect(wrapper.validateQuantity).toBeCalledWith('10');

      /*
      const mockedValidateQuantity = jest.fn();
      wrapper.validateQuantity = mockedValidateQuantity;
      wrapper.find('input').props().onChange();
      expect(mockedValidateQuantity).toHaveBeenCalledTimes(1);
*/

    });
});