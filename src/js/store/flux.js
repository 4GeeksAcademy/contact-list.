
import toast, { Toaster } from 'react-hot-toast';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			contactList: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction

			insertContactToList: (contact) => {
				const store = getStore();
				const updatedContactList = [...store.contactList, contact];
				setStore({ contactList: updatedContactList });
			},

			createContact: async (payload) => {
				fetch("https://playground.4geeks.com/contact/agendas/cesar/contacts", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(
						payload
					)
				})

					.then(response => response.json())
					.then(data => {
						console.log(data);
						const actions = getActions();
						actions.insertContactToList(data);
						toast.success("Contact created successfully 🎉");
					})


			},

			deleteContact: async (id) => {
				const response = await fetch(`https://playground.4geeks.com/contact/agendas/cesar/contacts/${id}`, {
					method: "DELETE"
				});


				if (response.ok) {
					const store = getStore();
					const updatedContactList = store.contactList.filter(contact => contact.id !== id);
					setStore({ contactList: updatedContactList });
					toast.success("Contact deleted successfully 🎉");
				} else {
					toast.error("Error deleting contact ⛔");
				}
			},


			getContactList: async () => {
				const response = await fetch("https://playground.4geeks.com/contact/agendas/cesar/contacts", {
					method: "GET"
				});


				const data = await response.json();
				console.log(data);
				setStore({ contactList: data.contacts });
			},

			updateContact: async (payload, id) => {

				const response = await fetch(`https://playground.4geeks.com/contact/agendas/cesar/contacts/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(payload)

				});
				const data = await response.json();
				console.log(data);
				const updatedContactList = getStore().contactList.map(contact => {
					if (contact.id === id) {
						return data.contact;
					}
					return contact;
				});
				setStore({ contactList: updatedContactList });
				toast.success("Contact updated successfully 🎉", {
				});
			},




			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;