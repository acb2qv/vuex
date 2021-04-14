import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { //= data
        products: [],
        cart: [] //store objects holding id, quantity
    },
    getters: { //= computed properties
        availableProducts(state, getters){
            return state.products.filter(product => product.inventory > 0)
        }
    },
    actions: {
        fetchProducts({commit}){
            return new Promise((resolve, reject) => {
                shop.getProducts(products => {
                    commit('setProducts', products)
                    resolve()
                })
            })
        },
        addProductToCart(context, product){
            // check item is still in stock
            if(product.inventory > 0){
                const cartItem = context.state.cart.find(item => item.id === product.id)
                // find cartitem
                if(!cartItem){
                    context.commit('pushProductToCart', product.id)
                } else {
                    context.commit('incrementItemQuantity', cartItem)
                }
                context.commit('decrementProductInventory', product)
            }
        }
    },
    mutations: {
        setProducts(state, products) {
            // update products
            state.products  = products
        },
        pushProductToCart(state, productId){
            state.cart.push({
                id: productId,
                quantity: 1
            })
        },
        incrementItemQuantity(state, cartItem){
            cartItem.quantity++
        },
        decrementProductInventory(state, cartItem){
            cartItem.quantity--
        }
    }
})