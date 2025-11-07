import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'

export function Cart() {
    const { cart, total, addItemCart, removeItemCart } = useContext(CartContext)

    const isEmpty = cart.length === 0

    function handleAcquisition() {
        toast.success('Compra efetuada com sucesso!', {
            style: {
                borderRadius: 12,
                backgroundColor: "#121212",
                color: "#fff",
            }
        });
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-6">

            {isEmpty && (
                <div className="flex flex-col items-center justify-center h-[calc(90vh-56px)]">
                    <p className="text-center text-xl font-medium">
                        Poxa! Seu carrinho está vazio 😥
                    </p>

                    <Link
                        to="/"
                        className="bg-slate-600 text-white font-medium p-1 px-2 mt-4 rounded hover:bg-slate-700 transition-colors"
                    >
                        Acessar Produtos
                    </Link>
                </div>
            )}

            {!isEmpty && (
                <>

                    <h1 className="text-4xl font-semibold text-center mb-6"> Meu Carrinho </h1>
                
                    <div className="bg-white shadow-[0_3px_12px_rgba(0,0,0,0.5)] rounded-2xl p-6 mb-8">
                        {cart.map((item) => (
                            <section
                                key={item.id}
                                className="grid grid-cols-1 md:grid-cols-[120px_1fr_auto_auto] gap-6 items-center py-4"
                            >
                                <div className="flex justify-center">
                                    <img
                                        src={item.cart}
                                        alt={item.title}
                                        className="w-28 mx-auto"
                                    />
                                </div>

                                <div>
                                    <p className="text-lg font-semibold leading-tight">{item.title}</p>
                                    <p className="text-gray-700 font-medium mt-1">
                                        Preço:{" "}
                                        {item.price.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL"
                                        })}
                                    </p>
                                </div>

                                <div className="flex items-center justify-center gap-2">
                                    <button className="bg-slate-600 px-3 py-1 rounded text-white cursor-pointer" onClick={ () => removeItemCart(item) }>-</button>
                                    <span className="text-lg font-medium">{item.amount}</span>
                                    <button className="bg-slate-600 px-3 py-1 rounded text-white cursor-pointer" onClick={ () => addItemCart(item) }>+</button>
                                </div>

                                <div className="text-right font-semibold text-gray-800">
                                    Subtotal: {item.total.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL"
                                    })}
                                </div>

                                <div className="col-span-full w-full border-b-2 border-gray-400"></div>
                            </section>
                        ))}
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-xl font-semibold">Total: {total}</p>

                        <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-medium cursor-pointer" onClick={ () => handleAcquisition() }>
                            Finalizar compra
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}