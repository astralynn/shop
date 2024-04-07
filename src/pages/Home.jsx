import React, { Fragment, useState, useEffect, useReducer } from 'react'
import Cart from "../components/Cart"
import axios from 'axios';

const reducer = (state, action) => {
    switch(action?.type){
        case "GET":
            return {...state, produts: action.products}
            case "ERROR":
                return {...state, products: []}
                default:
                    throw new Error(`Unknown action ${action.type}`);
    }
}

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
    const [state, dispatch] = useReducer(reducer, {products: []})

    useEffect(() => {
        try {
            axios.get(`http://localhost:9000/product`).then(res => {
                const data = res.data;
                // setProducts(() => {
                //     return data && data.length ? [...data] : []
                // })
                dispatch({type: "GET", products: data})

            }).catch(error => console.error(error))
        } catch (error) {
            console.error(error.message);
            // setProducts([])
            dispatch({type: "ERROR"});
        }
    }, []);

    const [CurrentPage, setCurrentPage] = useState(1);
    const [ProductsPerPage] = useState(3);

    const indexOfLastProduct = CurrentPage * ProductsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - ProductsPerPage;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const product = state?.products 
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