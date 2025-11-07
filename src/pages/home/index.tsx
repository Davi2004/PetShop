import { useEffect, useState, useContext } from "react"
import { BsCartPlus } from "react-icons/bs"
import { Link } from 'react-router-dom'

import { api } from "../../services/api"

import { CartContext } from "../../context/CartContext"
import toast from "react-hot-toast"

export interface ProductProps {
    id: string,
    title: string,
    description: string,
    price: number,
    cover: string,
    cart: string
}

export function Home() {
    const [products, setProducts] = useState<ProductProps[]>([])
    const [loading, setLoading] = useState(true)
    const { addItemCart } = useContext(CartContext)

    useEffect(() => {
        async function getProducts() {
            const response = await api.get('/products')
            setProducts(response.data);
            setLoading(false);
        }

        getProducts()
    }, []) 

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-56px)]">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-zinc-900 rounded-full animate-spin"></div>
            </div>
        )
    }

    function handleAddCartItem(product: ProductProps) {
        addItemCart(product)
        toast.success('Produto adicionado ao carrinho!', {
            style: {
                borderRadius: 12,
                backgroundColor: "#121212",
                color: "#fff",
            }
        })
    }
    
    return (
        <div>
            <main className="w-full max-w-7xl px-4 mx-auto">
                
                <h1 className="text-center text-2xl font-medium my-5"> Produtos em alta! </h1>

                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 mb-4">
                    {products.map( (product) => (
                        <section key={product.id} className="w-full">
                        
                            <Link to={`/product/${product.id}`}>
                                <img
                                    src={product.cover}
                                    alt={product.title}
                                    className="w-60 rounded-lg max-h-80 mb-2 hover:scale-105 transition-transform duration-200"
                                />
                            </Link>
      
                            <p className="font-medium mt-1 mb-2">{product.title}</p>

                            <div className="flex gap-3 items-center justify-between">

                                <strong className="text-zinc-700/90 text-[18px] select-none">
                                    {product.price.toLocaleString('pt-BR', { 
                                        style: 'currency', 
                                        currency: 'BRL' 
                                    })}
                                </strong>

                                <button 
                                    className="bg-zinc-900 hover:bg-zinc-800 p-1 rounded-lg cursor-pointer"
                                    onClick={ () => handleAddCartItem(product) }
                                >
                                    <BsCartPlus
                                        size={20}
                                        color="#FFF"
                                    />
                                </button>
                                
                            </div>
                            
                        </section>
                    ) )}
                </div>
                
            </main>
        </div>
    )
}