import shop from "@/api/shop"

export default {
    state: {
        items: [], //store objects holding id, quantity
        checkoutStatus: null
    },
    getters: {
        cartProducts(state, getters, rootState){
            return state.items.map(cartItem => {
                const product = rootState.products.items.find(product => product.id === cartItem.id)
                return{
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                }
            })
        },
        cartTotal(state, getters){
            let total = 0
            getters.cartProducts.forEach(product => {
                total += product.price * product.quantity
            })
            return total
        },
    },
    mutations: {
        pushProductToCart(state, productId){
            state.items.push({
                id: productId,
                quantity: 1
            })
        },
        incrementItemQuantity(state, cartItem){
            cartItem.quantity++
        },
        setCheckoutStatus(state, status){
            state.checkoutStatus = status
        },
        emptyCart(state){
            state.items = []
        }
    },
    actions: {
        addProductToCart({state, getters, commit, rootState}, product){
            // check item is still in stock
            if(getters.productIsInStock(product)){
                const cartItem = state.items.find(item => item.id === product.id)
                // find cartitem
                if(!cartItem){
                    commit('pushProductToCart', product.id)
                } else {
                    commit('incrementItemQuantity', cartItem)
                }
                commit('decrementProductInventory', product)
            }
        },
        checkout({state, commit}){
            shop.buyProducts(
                state.items,
                () => {
                    commit('emptyCart')
                    console.log("success")
                    commit('setCheckoutStatus', 'success')
                },
                () => {
                    console.log("fail")
                    commit('setCheckoutStatus', 'fail')
                }
            )
        }
    }
}