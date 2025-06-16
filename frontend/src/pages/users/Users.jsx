import { useNavigate } from 'react-router-dom';
import { TrashSimple } from '@phosphor-icons/react';
import GenericTable from "../../components/GenericTable.jsx";
import config from "../../providers/apiConfig.js";

const Users = () => {
    const rowActions = (user, openModal) => (
        <div className="flex justify-center space-x-2">
            <TrashSimple className="cursor-pointer text-red-500 hover:text-red-700" onClick={() => openModal(user._id)} />
        </div>
    );

    const columns = [
        { id: 'name', label: 'Name', accessor: (user) => user.firstname + ' ' + user.lastname, minWidth: 150 },
        { id: 'email', label: 'Email', accessor: (user) => user.email, minWidth: 200 },
        { id: 'subscription', label: 'Subscription', accessor: (user) => user.subscription.name, minWidth: 150 },
        { id: 'isVerified', label: 'Verified', accessor: (user) => user.verified_at ? 'Yes' : 'No', minWidth: 100 },
        { id: 'hasNewsletter', label: 'Newsletter', accessor: (user) => user.newsletter ? 'Yes' : 'No', minWidth: 100 },
        { id: 'created_at', label: 'Created At', accessor: (user) => new Date(user.created_at).toLocaleDateString(), minWidth: 120 },
        { id: 'updated_at', label: 'Updated At', accessor: (user) => new Date(user.updated_at).toLocaleDateString(), minWidth: 120 }
    ];

    const fetchUrl = `${config.apiBaseUrl}/user/list`;

    return (
        <div>
            <h1 className="text-3xl text-center my-6 tracking-widest">Users</h1>
            <GenericTable
                fetchUrl={fetchUrl}
                columns={columns}
                rowActions={rowActions}
            />
        </div>
    );
};

export default Users;