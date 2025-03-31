import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from "../../providers/apiConfig.js";
import { Loader, ConfirmPopup } from "../../components/index.js";
import { PencilSimple, TrashSimple, Eye } from '@phosphor-icons/react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";

const Items = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'description', label: 'Description', minWidth: 100 },
        { id: 'picture', label: 'Picture', minWidth: 100 },
        { id: 'reference', label: 'Reference', minWidth: 100 },
        { id: 'category', label: 'Category', minWidth: 100, accessor: item => item.category.name },
        { id: 'state', label: 'State', minWidth: 100, accessor: item => item.state.name },
    ]

    return (
        <div className="w-full">
            <h1 className={'text-3xl text-center my-6 tracking-widest'}>Items</h1>
            {loading ? (
                <Loader />
            ) : (
                <Paper sx={{ width: '98%', overflow: 'hidden' }} className="mx-auto">
                    <TableContainer sx={{ maxHeight: 'calc(100vh - 200px)' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell key="actions" align="center" style={{ minWidth: 100 }}>
                                        Actions
                                    </TableCell>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align="center" style={{ minWidth: column.minWidth }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={item._id}>
                                        <TableCell key="actions" align="center">
                                            {rowActions(item)}
                                        </TableCell>
                                        {columns.map((column) => {
                                            const value = column.accessor ? column.accessor(item) : item[column.id];
                                            return (
                                                <TableCell key={column.id} align="center">
                                                    {column.id === 'picture' ? <img src={value} alt={item.name} className="h-16 w-16" /> : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={items.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            )}
            <ConfirmPopup isOpen={isModalOpen} onClose={closeModal} onConfirm={handleDelete}>
                Are you sure you want to delete this item?
            </ConfirmPopup>
        </div>
    );
}

export default Items;