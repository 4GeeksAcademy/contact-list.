import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

const Form = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    function saveContact(event) {
        event.preventDefault();
        if (name.trim() === "" || phone.trim() === "" || email.trim() === "" || address.trim() === "") {
            toast.error("All fields are required ⛔");
            return null;
        }

        const payload = {
            name: name,
            phone: phone,
            email: email,
            address: address
        };

        if (!id) {
            actions.createContact(payload);
        } else {
            actions.updateContact(payload, id);
        }

        navigate("/");
        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
    }


    useEffect(() => {
        if (id && store.contactList.length > 0) {
            const contact = store.contactList.find(contact => contact.id === id);
            setName(contact.name);
            setPhone(contact.phone);
            setEmail(contact.email);
            setAddress(contact.address);
        }
    }, [id, store.contactList]);




    return (
        <div className="container py-5 mt-5" style={{ maxWidth: "500px", Height: "500px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
            <h1 className="mb-4">{!id ? "Add new Contact" : `Editing info of ${name}`}</h1>
            <div className="form-floating mb-3">
                <input type="text" className="form-control " placeholder="guillermo Obando" onChange={(e) => setName(e.target.value)} value={name} required />
                <label >Name</label>
            </div>
            <div className="form-floating mb-3">
                <input type="email" className="form-control " placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                <label >Email Adress</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control " placeholder="name@example.com" onChange={(e) => setAddress(e.target.value)} />
                <label >Adress</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control" placeholder="Password" onChange={(e) => setPhone(e.target.value)} />
                <label >Number</label>
            </div>
            <div className="btn btn-success mt-4 w-100 mb-4" onClick={saveContact}>Save</div>
            <Link to="/" className="text-decoration-none d-flex justify-content-center"> Or go to contacts</Link>
        </div>
    );

};

export default Form;