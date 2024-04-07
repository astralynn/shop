import React, { Fragment, useState, useEffect, useReducer } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Cart from "../components/Cart"
import axios from 'axios';
import { useCart } from 'react-use-cart';

const reducer = (state, action) => {
    switch(action?.type){
        case "GET":
            return {...state, product: action?.product }
        case "ERROR":
            return{...state, product: {}, shortData: [] }
            case "SHORT":
                const array = action?.products.filter(item => {
                    return item.id != action?.paramsId ||
                    item?.id != action?.product?.id
                }).slice(0, 3);

                return { ...state, shortData: array }
                default:
                    throw new Error(`Unknown action type ${action?.type}`)
    }
}

const Product = () => {
    const { id } = useParams();
    const [Product, setProduct] = useState({});
    const [ShortData, setShortData] = useState([]);
    const { addItem } = useCart();

    const [state, dispatch] = useReducer(reducer, {product: {}, shortData: [], paramsId: id });

    useEffect(() => {
        try {
            axios.get(`http://localhost:9000/product/${id}`)
                .then(response => {
                    const data = response.data;
                    // setProduct(data);
                    dispatch({type: "GET", product: data})
                })
            axios.get(`http://localhost:9000/product`)
                .then(response => {
                    // setShortData([...response.data]);
                    dispatch({type: "SHORT": 
                    products: [...response.data],
                    paramsId: id,}) 
                })
        } catch (error) {
            console.error(error?.message);
            dispatch({ type:})
        }
    }, [id,state?.product?.id, state?.shortData?.length]);

    const handleClick = () => {
        alert(`Товар: ${state?.product?.title} добавлено в карзину`)
        // console.log(Product);

        addItem({ ...state?.product, quantity: 1 });

        setTimeout(() => {
            window.location.replace("/bag");
        }, 500)
    }

    const description = state?.product?.description?.map((text, id) => {
        return (
            <p key={id}>
                {text}
            </p>
        )
    })

    const shortItem = state?.shortData
        .map(product => {
            return (
                <Fragment key={product.id}>
                    <Cart
                        price={product.price}
                        id={product.id}
                        image={product.image}
                        title={product.title}
                    />
                </Fragment>
            )
        })

    if (id)
        return (
            <Fragment>
                <section>
                    <div className="Container">
                        <div className="main__row main__product-row">
                            <div className="main__imageholder">
                                <img src={state?.product.image} alt="error" />
                            </div>

                            <div className="main__content">
                                <h2 className="title-2 main__title">
                                    {state?.product.title}
                                </h2>

                                <p className="price main__price">
                                    {Product.price}
                                    <small className="currency-price"> руб.</small>
                                </p>

                                <div className="main__button">
                                    <button onClick={handleClick} className='main__button-black'>
                                        Купить в один клик
                                    </button>
                                </div>

                                <div className="main__description">
                                    {description}
                                </div>

                                <div className="back">
                                    <Link to={"/shop"} className='back__link'>Назад</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="also">
                    <div className="Container">
                        <h2 className="title-2">Смотрите также</h2>

                        <div className="also__row">
                            {shortItem}
                        </div>
                    </div>
                </section>
            </Fragment>
        )

    return (<h1>Is not defined</h1>)
}

export default Product