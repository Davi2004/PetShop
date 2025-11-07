import { useParams, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { api } from '../../services/api'
import { type ProductProps } from "../home"

import { BsCartPlus } from "react-icons/bs"
import toast from "react-hot-toast"
import { CartContext } from "../../context/CartContext"


export function ProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState<ProductProps | null>(null)
    const [loading, setLoading] = useState(true)
    const { addItemCart } = useContext(CartContext)
    const navigate = useNavigate()

    useEffect(() => {
        async function getProduct() {
            try {
                const response = await api.get(`/products/${id}`)
                setProduct(response.data)
            } catch (error) {
                console.error("Erro ao carregar produto:", error)
            } finally {
                setLoading(false)
            }
        }

        getProduct()

    }, [id])


    function handleAddCartItem(product: ProductProps) {
        toast.success(`Produto adicionado ao carrinho!`, {
            style: {
                borderRadius: 50,
                backgroundColor: "#121212",
                color: "#FFF"
            },
            position: "bottom-center",
            duration: 1000
        })
        addItemCart(product)

        navigate("/cart")
    }


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-zinc-900 rounded-full animate-spin"></div>
            </div>
        )
    }


    return (
        <div className="w-full">
            
            <div className="text-center mt-10">
                <h1 className="text-3xl md:text-5xl font-bold">Detalhes do Produto</h1>
                <div className="w-full max-w-3xl h-3 bg-blue-400 mx-auto mt-3 rounded"></div>
            </div>


            <main className="max-w-6xl mx-auto px-6 mt-14 flex flex-col lg:flex-row items-center gap-14">

                <div className="flex justify-center w-full">
                    <img
                        className="w-60 md:w-80 shadow-[0_3px_12px_rgba(0,0,0,0.5)] rounded-2xl"
                        src={product?.cover}
                        alt={product?.title}
                    />
                </div>

                <div className="w-full">

                    <h2 className="text-2xl md:text-3xl font-semibold text-black mb-4">
                        {product?.title}
                    </h2>

                    <p className="text-zinc-600 leading-relaxed mb-6 max-w-xl">
                        {product?.description}
                    </p>

                    <div className="flex items-center gap-10 mt-6">

                        <strong className="text-2xl md:text-3xl text-zinc-800">
                            {product?.price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            })}
                        </strong>

                        <button
                            className="bg-zinc-900 p-2 rounded-xl hover:bg-zinc-800 transition cursor-pointer"
                            onClick={() => product && handleAddCartItem(product)}
                        >
                            <BsCartPlus size={16} color="#FFF" />
                        </button>

                    </div>

                </div>
            </main>

        </div>
    )
}
