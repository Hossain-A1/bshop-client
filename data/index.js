import { AiFillDashboard, AiOutlineShoppingCart, AiOutlinePlus } from 'react-icons/ai'
import { BsCurrencyDollar, BsChat } from 'react-icons/bs'
import { RiProductHuntLine } from 'react-icons/ri'
export const navItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: <AiFillDashboard />,
        role: 'admin',
        path: '/admin/dashboard'
    },
    {
        id: 2,
        title: 'Orders',
        icon: <AiOutlineShoppingCart />,
        role: 'admin',
        path: '/admin/orders'
    },
 
    {
        id: 3,
        title: 'Payment',
        icon: <BsCurrencyDollar />,
        role: 'admin',
        path: '/admin/dashboard/payment'
    },


    {
      id: 4,
      title: 'All Product',
      icon: <RiProductHuntLine />,
      role: 'admin',
      path: '/admin/dashboard/products'
  },
    {
        id: 5,
        title: 'Add Product',
        icon: <AiOutlinePlus />,
        role: 'admin',
        path: '/admin/add'
    },

  
    {
        id: 6,
        title: 'Discount Product',
        icon: <RiProductHuntLine />,
        role: 'admin',
        path: '/admin/dashboard/discount-products'
    },
 
    {
        id: 7,
        title: 'Chat Customer',
        icon: <BsChat />,
        role: 'admin',
        path: '/admin/dashboard/chat-customer'
    },
  
]