import React, { Fragment, useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Cart from "../components/Cart"
import axios from 'axios';
import { useCart } from 'react-use-cart';


const Product = () => {
    const { id } = useParams();
    const [Product, setProduct] = useState({});
    const [ShortData, setShortData] = useState([])
    const { addItem } = useCart();

    useEffect(() => {
        try {
            axios.get(`http://localhost:9000/product/${id}`)
            .then(response => {
                const data = response.data;
                setProduct(data);
            })
            axios.get(`http://localhost:9000/product`)
            .then(response => {
                setShortData([...response.data]);
            }, [id, Product?.id, ShortData.length]);
        }catch (error){
            console.error(error?.message);
        }
    }, [id, Product?.id]);

    const handleClick = () => {
        alert(`Товар: ${Product?.title} добавлен в корзину`)
        // console.log(Product);

        addItem({...Product, quantity: 1});

        setTimeout(() => {
            window.location.replace("/bag");
        }, 500)
    }


    const description = Product?.description?.map((text, id) => {
        return (
            <p key={id}>
                {text}
            </p>
        )
    })

    const shortItem = ShortData.filter(item => (item.id != id || item.id != Product.id
         )).slice(0, 3)
    
    .map(product => {
        return(
            <Fragment>
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
                            <img src={Product.image} alt="error" />
                        </div>

                        <div className="main__content">
                            <h2 className="title-2 main__title">
                                {Product.title}
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
                                <Link to={"/"} className='back__link'>Назад</Link>
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