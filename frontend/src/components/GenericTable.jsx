import { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { Loader, ConfirmPopup } from "./index.js";
import config from "../providers/apiConfig.js";

const GenericTable = ({ fetchUrl, columns, rowActions }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
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
        const fetchData = async () => {
            try {
                const response = await fetch(fetchUrl, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const result = await response.json();
                console.log('Fetched data:', result);
                setData(result);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fetchUrl]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`${fetchUrl}/${itemToDelete}`, {
                method: 'DELETE',
                headers: config.getHeaders(),
            });
            if (response.ok) {
                setData(data.filter(item => item._id !== itemToDelete));
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

    return (
        <div className="w-full">
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
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={item._id}>
                                        <TableCell key="actions" align="center">
                                            {rowActions(item, openModal)}
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
                        count={data.length}
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
};

export default GenericTable;