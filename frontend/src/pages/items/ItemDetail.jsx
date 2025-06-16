import {useState, useEffect} from 'react';
import {useParams, useLocation, useNavigate} from 'react-router-dom';
import config from "../../providers/apiConfig.js";
import {ActionButton, Loader} from "../../components";
import BookingPopup from "../../components/BookingPopup.jsx";
import { ToastContainer, toast } from 'react-toastify';

const ItemDetail = () => {
    const [item, setItem] = useState(null);
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [loans, setLoans] = useState([]);

    const fromCatalog = new URLSearchParams(location.search).get('fromCatalog') === 'true';

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

        const fetchLoans = async () => {
            try {
                const response = await fetch(`${config.apiBaseUrl}/loan/${id}/many`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setLoans(data);
            } catch (error) {
                console.error('Failed to fetch loans:', error);
            }
        };

        fetchItem();
        fetchLoans();

    }, [id]);

    if (!item) {
        return <Loader/>;
    }

    const isAdmin = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const role = user.subscription.name
        return role === 'admin';
    }

    const handleGoBack = () => {
        if (fromCatalog) {
            navigate('/catalog');
        } else {
            navigate('/items');
        }
    };

    const handleLoan = async (item) => {
        toast.info('Processing your loan request...');

        let hasDueDate = false;
        const dueDate = new Date();
        if (JSON.parse(localStorage.getItem('user')).subscription.loan_limit !== -1) {
            const dueDate = new Date();
            hasDueDate = true;
            dueDate.setMonth(dueDate.getMonth() + JSON.parse(localStorage.getItem('user')).subscription.loan_limit);
        }
        const response = await fetch(`${config.apiBaseUrl}/loan`, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                item: item._id,
                user: JSON.parse(localStorage.getItem('user'))._id,
                start_date: new Date(),
                end_date: hasDueDate ? dueDate : null
            })
        });

        const data = await response.json();
        if (response.ok) {
            setItem(data.item);
            localStorage.setItem('loans', JSON.stringify(data.loans || []));
            toast.success('Loan successful');
            setShowPopup(false);
        } else {
            toast.error(data.error || data.message || 'An error occurred while processing your request');
        }
    };

    const handleBook = async (item) => {
        toast.info('Processing your booking request...');

        const dueDate = new Date();
        dueDate.setMonth(dueDate.getMonth() + JSON.parse(localStorage.getItem('user')).subscription.booking_limit);

        const response = await fetch(`${config.apiBaseUrl}/booking`, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                item: item._id,
                user: JSON.parse(localStorage.getItem('user'))._id,
                start_date: new Date(),
                end_date: dueDate
            })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('bookings', JSON.stringify(data.bookings));
            toast.success('Booking successful');
            setShowPopup(false);
        } else {
            toast.error(data.error);
        }
    };

    return (
        <div className={'w-full h-[calc(100vh-4rem)]'}>
            <div className={'h-2/3 bg-white'}>
                <div className="flex flex-col lg:flex-row items-center lg:items-start h-full">
                    <div className="w-full lg:w-1/2 mb-4 lg:mb-0 flex justify-center items-center h-full">
                        <img src={`${config.baseUrl}/items/`+item.picture} alt={item.name} className="max-w-[35%] h-auto object-cover"/>
                    </div>
                    <div className="w-full lg:w-1/2 p-8">
                        <h1 className="text-2xl text-quaternary mb-4">{item.name}</h1>
                        <p className="mb-4">{item.description}</p>
                        <p className="mb-4"><strong>Reference:</strong> {item.reference}</p>
                        <p className="mb-4"><strong>Category:</strong> {item.category.name}</p>
                        <div className={`w-full p-8 bg-secondary text-white`}>
                            {item.state.name === 'AVAILABLE' && <p>This item is available for loan.</p>}
                            {item.state.name === 'LOANED' &&
                                <div>
                                    <p>This item is currently loaned.</p>
                                </div>
                            }
                            <button
                                onClick={() => setShowPopup(true)}
                                className={`${item.state.name === 'AVAILABLE' ? 'bg-quaternary hover:bg-secondary' : 'bg-opposite'} text-white px-4 py-2 text-[.6rem] sm:text-sm transition ease-in duration-200 cursor-pointer mt-10`}>
                                {item.state.name === 'AVAILABLE' ? 'Loan' : 'Book'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isAdmin && (
                <div className="text-center pt-10">
                    <h1 className="text-2xl text-quaternary mb-4">Loans</h1>
                    {loans.length > 0 ? (
                            <table className="min-w-full mt-4 border-collapse">
                                <thead>
                                <tr>
                                    <th className="border p-2">User</th>
                                    <th className="border p-2">Start Date</th>
                                    <th className="border p-2">End Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {loans.map((loan) => (
                                    <tr key={loan._id}>
                                        <td className="border p-2">
                                            {loan?.user?.email || 'Unknown'}
                                        </td>
                                        <td className="border p-2">
                                            {new Date(loan.start_date).toLocaleString()}
                                        </td>
                                        <td className="border p-2">
                                            {new Date(loan.end_date).toLocaleString()}
                                        </td>
                                    </tr>)
                                )}

                                </tbody>
                            </table>)
                        : <p>No loan was found.</p>}
                </div>)
            }
            <div className={'w-full flex justify-center items-center h-1/3'}>
                <ActionButton onClick={handleGoBack}>Go back</ActionButton>
            </div>
            <BookingPopup
                item={item}
                showPopup={showPopup}
                setShowPopup={setShowPopup}
                action={item.state.name === 'AVAILABLE' ? 'Loan' : 'Book'}
                handleAction={() => {
                    item.state.name === 'AVAILABLE' ? handleLoan(item) : handleBook(item);
                }}
            />
            <ToastContainer />
        </div>
    );
}

export default ItemDetail;