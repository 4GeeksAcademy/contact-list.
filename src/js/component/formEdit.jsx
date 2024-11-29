import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

export const FormEdit = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const [loading, setLoading] = useState(true); // Track loading state

    const editContact = (event) => {
        event.preventDefault();
        if (name.trim() === "" || phone.trim() === "" || email.trim() === "" || address.trim() === "") {
            toast.error("All fields are required ⛔");
            return;
        }

        const payload = { name, phone, email, address };
        actions.updateContact(payload, id);
        toast.success("Contact updated successfully 🎉");
        navigate("/");
    };

    useEffect(() => {
        const fetchContact = () => {
            if (store.contactList.length > 0) {
                const contact = store.contactList.find(contact => contact.id === id);
                if (contact) {
                    setName(contact.name);
                    setPhone(contact.phone);
                    setEmail(contact.email);
                    setAddress(contact.address);
                } 
            } 
            setLoading(false);
        };

        fetchContact();
    }, [id, store.contactList]);

    if (loading) {
        return <div className="text-center py-5">Loading contact details...</div>;
    }

    return (
        <div className="container py-5 mt-5" style={{ maxWidth: "800px", height: "500px" }}>
            <h1 className="mb-4 text-center">Update Contact</h1>
            <form onSubmit={editContact}>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                    <label>Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <label>Email Address</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        required
                    />
                    <label>Address</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Phone"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        required
                    />
                    <label>Phone Number</label>
                </div>
                <div className="d-flex">
                    <Link to="/" className="text-decoration-none d-flex justify-content-center mt-3">
                        Or go to contacts
                    </Link>
                    <button type="submit" className="btn btn-success mt-4 ms-auto mb-1">Update Contact</button>
                </div>
            </form>
        </div>
    );
};