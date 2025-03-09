import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from "../../providers/apiConfig.js";
import { ActionButton, Loader, ConfirmPopup } from "../../components/index.js";
import { PencilSimple, TrashSimple, Eye } from '@phosphor-icons/react';

const Items = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const navigate = useNavigate();

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

    const handleDelete = async () => {
        try {
            const response = await fetch(`${config.apiBaseUrl}/item/delete/${itemToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                setItems(items.filter(item => item._id !== itemToDelete));
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
            console.error('Failed to delete item:', error);
        } finally {
            setIsModalOpen(false);
            setItemToDelete(null);
        }
    };

    const openModal = (itemId) => {
        setItemToDelete(itemId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setItemToDelete(null);
    };

    const rowActions = (item) => {
        return (
            <div className="flex justify-center space-x-2">
                <Eye className="cursor-pointer text-blue-500 hover:text-blue-700 text-xs sm:text-sm md:text-base lg:text-lg" onClick={() => navigate(`/item/${item._id}`)} />
                <PencilSimple className="cursor-pointer text-orange-500 hover:text-orange-700 text-xs sm:text-sm md:text-base lg:text-lg" onClick={() => navigate(`/item/update/${item._id}`)} />
                <TrashSimple className="cursor-pointer text-red-500 hover:text-red-700 text-xs sm:text-sm md:text-base lg:text-lg" onClick={() => openModal(item._id)} />
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
                        <ActionButton onClick={() => navigate('/item/update')}>Add Item</ActionButton>
                    </div>
                    <div className="overflow-x-auto rounded">
                        <table className="min-w-full bg-white">
                            <thead>
                            <tr>
                                <th className="bg-secondary py-2 px-4 border-r border-quaternary text-[.7rem] lg:text-base">Tools</th>
                                <th className="bg-secondary py-2 px-4 border-r border-quaternary text-[.7rem] lg:text-base">Name</th>
                                <th className="bg-secondary py-2 px-4 border-r border-quaternary text-[.7rem] lg:text-base">Description</th>
                                <th className="bg-secondary py-2 px-4 border-r border-quaternary text-[.7rem] lg:text-base">Picture</th>
                                <th className="bg-secondary py-2 px-4 border-r border-quaternary text-[.7rem] lg:text-base">Reference</th>
                                <th className="bg-secondary py-2 px-4 border-r border-quaternary text-[.7rem] lg:text-base">Category</th>
                                <th className="bg-secondary py-2 px-4 text-[.7rem] lg:text-base">State</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items.map(item => (
                                <tr key={item._id}>
                                    <td className="py-2 px-4 border-t border-r border-quaternary text-[.6rem] lg:text-sm">{rowActions(item)}</td>
                                    <td className="py-2 px-4 border-t border-r border-quaternary text-[.6rem] lg:text-sm">{item.name}</td>
                                    <td className="py-2 px-4 border-t border-r border-quaternary text-[.6rem] lg:text-sm truncate max-w-xs">{item.description}</td>
                                    <td className="py-2 px-4 border-t border-r border-quaternary text-[.6rem] lg:text-sm">{item.picture}</td>
                                    <td className="py-2 px-4 border-t border-r border-quaternary text-[.6rem] lg:text-sm">{item.reference}</td>
                                    <td className="py-2 px-4 border-t border-r border-quaternary text-[.6rem] lg:text-sm">{item.category.name}</td>
                                    <td className="py-2 px-4 border-t border-quaternary text-[.6rem] lg:text-sm">{item.state.name}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <ConfirmPopup isOpen={isModalOpen} onClose={closeModal} onConfirm={handleDelete}>
                Are you sure you want to delete this item?
            </ConfirmPopup>
        </div>
    );
}

export default Items;