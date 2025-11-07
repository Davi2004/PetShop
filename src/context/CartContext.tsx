import { createContext, type ReactNode, useState, useEffect } from "react";
import { type ProductProps } from '../pages/home'

interface CartContextData {
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductProps) => void
    removeItemCart: (product: CartProps) => void
    total: string;
}

interface CartProps {
    id: string;
    title: string;
    description: string;
    price: number;
    cover: string;
    cart: string;
    amount: number;
    total: number;
}

interface CartProviderProps {
    children: ReactNode;
}

export const CartContext = createContext({} as CartContextData)

function CartProvider({children}: CartProviderProps ) {
    const [cart, setCart] = useState<CartProps[]>([])
    const [total, setTotal] = useState("")

    useEffect(() => {
        const cartStorage = localStorage.getItem("@petshopcart");
        
        if (cartStorage) {
            const storedCart = JSON.parse(cartStorage);
            setCart(storedCart);
            totalResultCart(storedCart);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("@petshopcart", JSON.stringify(cart));
    }, [cart]);
    
    // Adiciona no carrinho o produto e verifica se ele já não existe.
    function addItemCart(newItem: ProductProps) {
        // Verifica se o produto já não existe no carrinho.
        const indexItem = cart.findIndex(item => item.id === newItem.id)

        // Se entrou aqui, significa que esse produto já existe, portanto, somasse +1 na quantidade e calculasse o total desse carrinho
        if(indexItem !== -1) {
            let cartList = [...cart];

            cartList[indexItem].amount += 1;
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;

            setCart(cartList);
            totalResultCart(cartList)
            return;
        }

        // Adicionar esse item na noss lista.
        let data = {
            ...newItem,
            amount: 1,
            total: newItem.price
        }

        const newCart = [...cart, data];
        setCart(newCart);
        totalResultCart(newCart);
    }

    function removeItemCart(product: CartProps) {
        const indexItem = cart.findIndex(item => item.id === product.id)

        if(cart[indexItem]?.amount > 1) {
            // Diminuir 1 na quantidade e recalcula o total
            let cartList = [...cart];

            cartList[indexItem].amount -= 1;
            cartList[indexItem].total -= cartList[indexItem].price;

            setCart(cartList);
            totalResultCart(cartList)
            return;
        }

        const removeItem = cart.filter(item => item.id !== product.id)
        setCart(removeItem);
        totalResultCart(removeItem)
    }

    function totalResultCart(items: CartProps[]) {
        const result = items.reduce((acc, obj) => { return acc + obj.total }, 0)
        const resultFormated = result.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
        setTotal(resultFormated);
    }
    
    return(
        <CartContext.Provider value={{ 
            cart, 
            cartAmount: cart.length, 
            addItemCart, 
            removeItemCart, 
            total 
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;