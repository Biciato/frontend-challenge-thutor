import { createStore } from 'vuex'

export default createStore({
  state: {
    orders: [
      {
        title: 'Um suco de goiaba',
        flavor: 'Goiaba',
        price: 'R$5,00',
        description: 'Um mero suco de goiaba',
        image: '/images@2x.png'
      }
    ]
  },
  mutations: {
    ADD_ORDER(state, order) {
      state.orders.unshift(order)
    }
  },
  actions: {
    addOrder({ commit }, order) {
      commit('ADD_ORDER', order)
    }
  }
})
