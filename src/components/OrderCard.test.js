import { mount } from '@vue/test-utils'
import OrderCard from '@/components/OrderCard.vue'

describe('OrderCard', () => {
  it('renders order information correctly', () => {
    const order = {
      id: 1,
      title: 'Test Order',
      flavor: 'Test Flavor',
      price: 'R$10.00',
      description: 'Test Description',
      image: '/test-image.png'
    }

    const wrapper = mount(OrderCard, {
      propsData: {
        order
      }
    })
    expect(wrapper.find('.order-card-title').text()).toBe(order.title)
    expect(wrapper.find('.order-card-price').text()).toBe(order.price)
    expect(wrapper.find('.order-card-body p:nth-child(1)').text()).toContain(order.flavor)
    expect(wrapper.find('.order-card-body p:nth-child(2)').text()).toContain(order.description)
    expect(wrapper.find('.order-card-image img').attributes('src')).toBe(order.image)
  })

  it('renders default image if no image provided', () => {
    const order = {
      id: 1,
      title: 'Test Order',
      flavor: 'Test Flavor',
      price: 'R$10.00',
      description: 'Test Description'
    }

    const wrapper = mount(OrderCard, {
      propsData: {
        order
      }
    })
    expect(wrapper.find('.order-card-image img').attributes('src')).toBe('/images@2x.png')
  })
})
