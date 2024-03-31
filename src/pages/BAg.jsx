import React, { Fragment } from 'react'
import { useCart } from 'react-use-cart'
import Cart from '../components/Cart';

const Bag = () => {
    const {
        isEmpty,
        items,
        updateItemQuantity,
        removeItem
    } = useCart();

    const item = items.map(item => {
        return (
            <Fragment key={item.id}>
                <Cart
                price={item.price}
                title={item.title}
                image={item.image}
                id={item.id}
                extra={true}
                totalPrice={item.price * item.quantity}
                update={{
                    minuce: () => updateItemQuantity(
                        item.id, item.quantity-1
                    ),
                    add: () => updateItemQuantity(
                        item.id, item.quantity + 1
                    ),
                }}
                remove={() => removeItem(item.id)}
                
                />
            </Fragment>
        )
    })

    if(isEmpty) return (<h1>Is Empty</h1>);

    return (
        <div className='Container'>
            {item}
        </div>
    )

  return (
    <div>Bag</div>
  )
}

export default  Bag