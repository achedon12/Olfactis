import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import config from "../../providers/apiConfig.js";
import {ActionButton} from "../../components";

const UpdateItem = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        picture: '',
        reference: '',
        category: '',
        state: ''
    });
    const [categories, setCategories] = useState([]);
    const [states, setStates] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    useEffect(() => {
        const fetchCategoriesAndStates = async () => {
            try {
                const [categoriesResponse, statesResponse] = await Promise.all([
                    fetch(`${config.apiBaseUrl}/category`, {
                        headers: config.getHeaders()
                    }),
                    fetch(`${config.apiBaseUrl}/state`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                ]);
                const categoriesData = await categoriesResponse.json();
                const statesData = await statesResponse.json();
                setCategories(categoriesData);
                setStates(statesData);
            } catch (error) {
                console.error('Failed to fetch categories or states:', error);
            }
        };

        fetchCategoriesAndStates();

        if (isEditMode) {
            const fetchItem = async () => {
                try {
                    const response = await fetch(`${config.apiBaseUrl}/item/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    const data = await response.json();
                    setFormData(data);
                } catch (error) {
                    console.error('Failed to fetch item:', error);
                }
            };

            fetchItem();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = isEditMode ? 'PUT' : 'POST';
            const url = isEditMode ? `${config.apiBaseUrl}/item/${id}` : `${config.apiBaseUrl}/item`;
            const response = await fetch(url, {
                method,
                headers: config.getHeaders(),
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                navigate('/items');
            } else {
                console.error('Failed to save item');
            }
        } catch (error) {
            console.error('Failed to save item:', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            <ActionButton onClick={() => navigate('/items')} className="absolute left-2 md:left-10">Go back</ActionButton>
            <h1 className="text-2xl mb-6 text-center">{isEditMode ? 'Update Item' : 'Add Item'}</h1>
            <form onSubmit={handleSubmit} className="bg-white px-4 md:px-8 py-6 my-4">
                <div className="mb-6">
                    <label className="block text-text-color">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border focus:outline-quaternary"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-text-color">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border focus:outline-quaternary"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-text-color">Picture</label>
                    <input
                        type="text"
                        name="picture"
                        value={formData.picture}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border focus:outline-quaternary"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-text-color">Reference</label>
                    <input
                        type="text"
                        name="reference"
                        value={formData.reference}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border focus:outline-quaternary"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-text-color">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border focus:outline-quaternary"
                        required
                    >
                        {!isEditMode && <option value="">Select a category</option>}
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-6">
                    <label className="block text-text-color">State</label>
                    <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border focus:outline-quaternary"
                        required
                    >
                        {!isEditMode && <option value="">Select a state</option>}
                        {states.map(state => (
                            <option key={state._id} value={state._id}>{state.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-center mt-10">
                    <ActionButton type="submit">
                        {isEditMode ? 'Update' : 'Add'}
                    </ActionButton>
                </div>
            </form>
        </div>
    );
};

export default UpdateItem;