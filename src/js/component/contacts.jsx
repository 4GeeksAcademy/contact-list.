import React, { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import { Context } from "../store/appContext";



export const Contacts = () => {

    const { store, actions } = useContext(Context);
    const [show, setShow] = useState(false);


    useEffect(() => {
        actions.getContactList()
    }, []);


    const contactsList = store.contactList.map((contact) => (

        <div className="card-container d-flex justify-content-center">

            <div className="card mb-3" style={{ maxWidth: "500px" }} key={contact.id}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="https://i.pravatar.cc/250" style={{ width: "200px" }} className="img-fluid rounded-circle mt-3 ms-2" alt="PacoelPaco" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="d-flex">
                                <h5 className="card-text">{contact.name}</h5>
                                <div className="ms-auto ">
                                    <div className="btn btn-outline-success me-2"><Link to={`/editContactForm/${contact.id}`} className="text-white text-decoration-none">✏️</Link></div>

                                    {/* Modal button trigger */}
                                    <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target={"#delete-contact" + contact.id} onClick={() => setShow(true)}>
                                        🗑️
                                    </button>


                                    <div className="modal fade" id={"delete-contact" + contact.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure?</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShow(false)}></button>
                                                </div>
                                                <div className="modal-body">
                                                    <p>Are you sure you want to delete this contact, you won't be able to recover it</p>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-outline-info" data-bs-dismiss="modal" onClick={() => setShow(false)}>Close</button>
                                                    <button className="btn btn-outline-danger" onClick={() => actions.deleteContact(contact.id)}>Delete</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <p className="card-text">📍</p>
                                <p className="card-text">{contact.address}</p>
                            </div>
                            <div className="d-flex">
                                <p className="card-text">📞</p>
                                <p className="card-text">{contact.phone}</p>
                            </div>
                            <div className="d-flex">
                                <p className="card-text">📧</p>
                                <p className="card-text">{contact.email}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="container">
            {contactsList}
        </div>
    );


};