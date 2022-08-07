import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {
    useLocation,
    Link
} from "react-router-dom";

import { useSelector } from 'react-redux'

import { roles } from "../../constants/roles"



export default function Index() {

    const { user } = useSelector((state) => state.auth)


    let location = useLocation();

    const [products, setProducts] = useState([]);

    //console.log(location.pathname)
    // TODO: depending up buyer and seller, fetch allproduct or only seller products
    let url = `${process.env.REACT_APP_SERVER_DOMAIN}/products`
    if (location.pathname.includes("/sellers/products")) {
        url = `${process.env.REACT_APP_SERVER_DOMAIN}/products/sellers`
    }

    useEffect(() => {
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then(res => {
                setProducts(res.data.data)
                // []

            })
            .catch(err => {

            })
    }, []);

    return (
        <div className="container mt-5">
            {
                                    user.role == roles.SELLER
                                    &&
                                    <Link to="/sellers/products/store"><button type="button" class="btn btn-primary">Add Product</button></Link>
                                }
            <div className="row mt-5">
                {
                products.map(el => {

                    let blob;
                    let image = ""
                    if (el.images[0]?.buffer?.data) {
                        blob = new Blob([Int8Array.from(el.images[0]?.buffer?.data)], { type: el.images[0]?.mimetype });
                        image = window.URL.createObjectURL(blob);
                    }

                    return <div className="col-3 p-2">
                        <div className="card">
                            <Link to={`/products/${el._id}`}>
                                <img src={image} className="card-img-top" alt={el.name} />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">{el.name}</h5>
                                <p className="card-text">{el.description}</p>
                                {
                                    user.role == roles.BUYER
                                    &&
                                    <a href="#" className="btn btn-primary">Add to Cart</a>
                                }
                                {
                                    user.role == roles.SELLER
                                    &&
                                    location.pathname.includes("/sellers/products")
                                    &&
                                    <Link to={`/sellers/products/edit/${el._id}`}>
                                        <button type="button" className="btn btn-primary">Edit</button>
                                         <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Edit
                                        </button> 
                                    </Link>
                                }
                            </div>
                        </div>

                    </div>
                })}
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}