import { useNavigate } from 'react-router-dom';
import { TrashSimple } from '@phosphor-icons/react';
import GenericTable from "../../components/GenericTable.jsx";
import config from "../../providers/apiConfig.js";

const LoansHistory = () => {
    const rowActions = (item, openModal) => (
        <div className="flex justify-center space-x-2">
            <TrashSimple className="cursor-pointer text-red-500 hover:text-red-700" onClick={() => openModal(item._id)} />
        </div>
    );

    const columns = [
        { id: 'item', label: 'Item', accessor: (item) => item.item.name, minWidth: 150 },
        { id: 'user', label: 'User', accessor: (item) => item.user.firstname + ' ' + item.user.lastname, minWidth: 150 },
        { id: 'returned_at', label: 'Returned At', accessor: (item) => new Date(item.returned_at).toLocaleDateString(), minWidth: 120 },
        { id: 'start_date', label: 'Start Date', accessor: (item) => new Date(item.start_date).toLocaleDateString(), minWidth: 120 },
        { id: 'end_date', label: 'End Date', accessor: (item) => new Date(item.end_date).toLocaleDateString(), minWidth: 120 },
        { id: 'created_at', label: 'Created At', accessor: (item) => new Date(item.created_at).toLocaleDateString(), minWidth: 120 },
        { id: 'updated_at', label: 'Updated At', accessor: (item) => new Date(item.updated_at).toLocaleDateString(), minWidth: 120 }
    ];

    const fetchUrl = `${config.apiBaseUrl}/loanHistory`;

    return (
        <div>
            <h1 className="text-3xl text-center my-6 tracking-widest">Loans History</h1>
            <GenericTable
                fetchUrl={fetchUrl}
                columns={columns}
                rowActions={rowActions}
            />
        </div>
    );
};

export default LoansHistory;