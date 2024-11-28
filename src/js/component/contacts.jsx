import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";



export const Contacts = () => {

    const { store, actions } = useContext(Context);



    useEffect(() => {
        actions.getContactList()
    }, []);


    const contactsList = store.contactList.map((contact) => (

        <div className="">

            <div className="border-bottom mb-3" key={contact.id}>
                <div className="p-2 d-flex">
                    <div className="">
                        <img id="rick" src="https://static.wikia.nocookie.net/character-stats-and-profiles/images/3/36/Rick_Sanchez.1.jpg/revision/latest?cb=20230729031243"  className="img-fluid mt-3 ms-2" alt="Rick" />
                    </div>
                    <div className=" ">
                        <div id="info" className="card-body">
                            <div className="d-flex">
                                <h5 className="card-text">{contact.name}</h5>
                                <div className="ms-auto d-flex">
                                    <div id="functions">
                                        <Link to={`/editContact/${contact.id}`} className="">
                                            <button className="border border-0 bg-transparent mx-4">
                                                <i class="fa-solid fa-pen"></i>
                                            </button>
                                        </Link>

                                        {/* Modal button trigger */}
                                        <button type="button" className="border border-0 bg-transparent" data-bs-toggle="modal"  onClick={() => actions.deleteContact(contact.id)}>
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <p className="card-text">
                                    <i class="fa-solid fa-location-dot"></i>
                                </p>
                                <p className="card-text ms-3">{contact.address}</p>
                            </div>
                            <div className="d-flex">
                                <p className="card-text">
                                    <i class="fa-solid fa-phone"></i>
                                </p>
                                <p className="card-text ms-3">{contact.phone}</p>
                            </div>
                            <div className="d-flex">
                                <p className="card-text">
                                    <i class="fa-solid fa-envelope"></i>
                                </p>
                                <p className="card-text ms-3">{contact.email}</p>
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