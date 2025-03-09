import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from "../../providers/apiConfig.js";
import {Loader} from "../../components";

const ItemDetail = () => {
    const [item, setItem] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`${config.apiBaseUrl}/item/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setItem(data);
            } catch (error) {
                console.error('Failed to fetch item:', error);
            }
        };

        fetchItem();
    }, [id]);

    if (!item) {
        return <Loader />;
    }

    return (
        <div className="max-w-5xl mx-auto mt-10 p-4 bg-white">
            <div className="flex flex-col lg:flex-row items-center lg:items-start">
                <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                    <img src={item.picture} alt={item.name} className="w-full h-auto object-cover" />
                </div>
                <div className="w-full lg:w-1/2 lg:pl-8">
                    <h1 className="text-2xl text-quaternary mb-4">{item.name}</h1>
                    <p className="mb-4">{item.description}</p>
                    <p className="mb-4"><strong>Reference:</strong> {item.reference}</p>
                    <p className="mb-4"><strong>Category:</strong> {item.category.name}</p>
                    <p className="mb-4"><strong>State:</strong> {item.state.name}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;