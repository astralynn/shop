import React, { Fragment, useState, useEffect } from 'react'
import Cart from "../components/Cart"
import axios from 'axios';

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
    const array = [];

    for (
        let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++
    ) {
        array.push(i);
    }

    return array.map(btn => {
        return <button
            className="pagination"
            key={btn}
            onClick={() => paginate(btn)}
        >
            {btn}
        </button>
    })
}

const Home = () => {
    const [Products, setProducts] = useState([]);

    useEffect(() => {
        try {
            axios.get(`http://localhost:9000/product`).then(res => {
                const data = res.data;
                setProducts(() => {
                    return data && data.length ? [...data] : []
                })
            }).catch(error => console.error(error))
        } catch (error) {
            console.error(error.message);
            setProducts([])
        }
    }, [Products.length]);

    const [CurrentPage, setCurrentPage] = useState(1);
    const [ProductsPerPage] = useState(3);

    const indexOfLastProduct = CurrentPage * ProductsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - ProductsPerPage;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const product = Products
        .slice(indexOfFirstProduct, indexOfLastProduct).map(item => {
            return <Fragment key={item.id}>
                <Cart
                    id={item.id}
                    price={item.price}
                    title={item.title}
                    image={item.image}
                />

            </Fragment>
        });

    return (
        <Fragment>
            <section>
                <div className="Container">
                    <h2 className="title-2">Магазин</h2>

                    <div className="main__row">
                        {product}
                    </div>

                    <div className="main__paginations">
                        <Pagination
                            productsPerPage={ProductsPerPage}
                            totalProducts={Products.length}
                            paginate={paginate}
                        />
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Home