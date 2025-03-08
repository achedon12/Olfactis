import { useEffect, useState } from 'react';
import config from "../providers/apiConfig.js";
import { CustomButton, Loader } from "../components";
import { Pencil, Trash } from '@phosphor-icons/react';

const Items = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${config.apiBaseUrl}/item/list`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Failed to fetch items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const rowActions = (item) => {
        return (
            <div className="flex justify-center space-x-4">
                <Pencil size={20} className="cursor-pointer text-blue-500 hover:text-blue-700" />
                <Trash size={20} className="cursor-pointer text-red-500 hover:text-red-700" />
            </div>
        );
    }

    return (
        <div className="w-full">
            <h1 className={'text-3xl text-center my-6 tracking-widest'}>Items</h1>
            {loading ? (
                <Loader />
            ) : (
                <div className={'mx-4 lg:mx-20'}>
                    <div className="flex justify-start mb-4">
                        <CustomButton>Add Item</CustomButton>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-[.6rem] lg:text-sm">Tools</th>
                                <th className="py-2 px-4 border-b text-[.6rem] lg:text-sm">Name</th>
                                <th className="py-2 px-4 border-b text-[.6rem] lg:text-sm">Description</th>
                                <th className="py-2 px-4 border-b text-[.6rem] lg:text-sm">Picture</th>
                                <th className="py-2 px-4 border-b text-[.6rem] lg:text-sm">Reference</th>
                                <th className="py-2 px-4 border-b text-[.6rem] lg:text-sm">Category</th>
                                <th className="py-2 px-4 border-b text-[.6rem] lg:text-sm">State</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items.map(item => (
                                <tr key={item._id}>
                                    <td className="py-2 px-4 border text-[.6rem] lg:text-sm">{rowActions(item)}</td>
                                    <td className="py-2 px-4 border text-[.6rem] lg:text-sm">{item.name}</td>
                                    <td className="py-2 px-4 border text-[.6rem] lg:text-sm truncate max-w-xs">{item.description}</td>                                    <td className="py-2 px-4 border text-[.6rem] lg:text-sm">{item.picture}</td>
                                    <td className="py-2 px-4 border text-[.6rem] lg:text-sm">{item.reference}</td>
                                    <td className="py-2 px-4 border text-[.6rem] lg:text-sm">{item.category.name}</td>
                                    <td className="py-2 px-4 border text-[.6rem] lg:text-sm">{item.state.name}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Items;