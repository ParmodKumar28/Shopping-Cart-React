import { createContext, useContext, useState } from "react";
import CartModal from "./components/CartModal";

const itemContext = createContext();

// Custom hooks for useContext
function useValue() {
    const value = useContext(itemContext);
    return value;
}

// Custom provider component
function CustomItemContext({children}) {
  const [total, setTotal] = useState(0);
  const [item, setItem] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
//   console.log(props);

const handleAdd = (prod) => {
    const index = cart.findIndex((item) => item.id === prod.id);
    if(index === -1)
    {
        setCart([...cart, {...prod, qty: 1}]);
        setTotal(total + prod.price);
    }
    else
    {
        cart[index].qty++;
        setCart(cart);
        setTotal(total + cart[index].price);
    }
    setItem(item + 1);
  };

  const handleRemove = (id) => {
    const index = cart.findIndex((item) => item.id === id);
    if(index !== -1)
    {
        cart[index].qty--;
        setItem(item - 1);
        setTotal(total - cart[index].price);
        if(cart[index].qty === 0){
            cart.splice(index, 1);
        }
    }

    setCart(cart);
  };

  const clear = () => {
    setItem(0);
    setTotal(0);
    setCart([]);
}

const toggle = () => {
    setShowCart(!showCart);
}

  return(
    // Default provider
    <itemContext.Provider value={{total, item, handleAdd, handleRemove, clear, showCart, toggle, cart}}>
        {showCart && <CartModal toggle={toggle} />}
        {children}
    </itemContext.Provider>
  )
}

export { itemContext, useValue };
export default CustomItemContext;
