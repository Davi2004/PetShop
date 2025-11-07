import { useContext } from "react"
import { Link } from "react-router-dom"
import { FiShoppingCart } from "react-icons/fi"

import { CartContext } from "../../context/CartContext" 

export function Header() {
    const { cartAmount } = useContext(CartContext)
    
    return (
        <header className="w-full px-1 bg-linear-to-b from-slate-200 to-slate-300 shadow-[0_3px_12px_rgba(0,0,0,0.5)] sticky top-0 z-10">

            <nav className="w-full max-w-7xl h-14 flex items-center justify-between px-5 mx-auto">
                
                <Link to="/" className="select-none text-3xl font-bold text-sky-700"> PetShop </Link>

                <Link to="/cart" className="relative">
                
                    <FiShoppingCart size={24} color="#121212"/>

                    {cartAmount > 0 && (
                        <span className="absolute -right-2 -top-1 bg-sky-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
                            {cartAmount}
                        </span>
                    ) }
                    
                </Link>

            </nav>
        </header>
    )
}