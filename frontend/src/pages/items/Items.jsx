import { useNavigate } from 'react-router-dom';
import { Eye, PencilSimple, TrashSimple } from '@phosphor-icons/react';
import GenericTable from "../../components/GenericTable.jsx";
import config from "../../providers/apiConfig.js";

const Items = () => {
    const navigate = useNavigate();

    const rowActions = (item, openModal) => (
        <div className="flex justify-center space-x-2">
            <Eye className="cursor-pointer text-blue-500 hover:text-blue-700" onClick={() => navigate(`/item/${item._id}`)} />
            <PencilSimple className="cursor-pointer text-orange-500 hover:text-orange-700" onClick={() => navigate(`/item/update/${item._id}`)} />
            <TrashSimple className="cursor-pointer text-red-500 hover:text-red-700" onClick={() => openModal(item._id)} />
        </div>
    );

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'description', label: 'Description', minWidth: 100 },
        { id: 'category', label: 'Category', minWidth: 100, accessor: item => item.category.name },
        { id: 'state', label: 'State', minWidth: 100, accessor: item => item.state.name },
    ];

    const fetchUrl = `${config.apiBaseUrl}/item`;

    return (
        <div>
            <h1 className="text-3xl text-center my-6 tracking-widest">Items</h1>
            <GenericTable
                fetchUrl={fetchUrl}
                columns={columns}
                rowActions={rowActions}
            />
        </div>
    );
};

export default Items;