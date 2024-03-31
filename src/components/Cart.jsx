import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Cart = ({ className, title, price, key = 0, image = "/product1.png", ...props }) => {
    className = `Cart ${className}`

    return (
        <Fragment key={key}>
            <div className={className} {...props}>
                <div className="Cart__imageholder">
                    <img src={image} alt="Image title" />
                </div>

                <h4 className="Cart__title"> {title} </h4>

                {
                    props.extra && (
                        <Fragment>
                            <button onClick={props.update.add}>
                                +
                            </button>
                            <span>{props.totalPrice}</span>
                            <button onClick={props.update.minuce}>
                                -
                            </button>
                            <button onClick={props.remove}>
                                &times;
                            </button>

                        </Fragment>
                    )
                }

                <footer className="Cart__footer">
                    <p className="price">{price} руб.</p>

                    <Link to={`/product/${props.id}`} className="Cart__link">Смотреть</Link>
                </footer>
            </div>
        </Fragment>
    )
}

export default Cart