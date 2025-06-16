import {useState, useEffect} from 'react';
import {useParams, useLocation, useNavigate} from 'react-router-dom';
import config from "../../providers/apiConfig.js";
import {ActionButton, Loader} from "../../components";
import BookingPopup from "../../components/BookingPopup.jsx";
import {ToastContainer, toast} from 'react-toastify';

const ItemDetail = () => {
    const [item, setItem] = useState(null);
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

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

        fetchItem();
    }, [id]);

    if (!item) {
        return <Loader/>;
    }

    const handleGoBack = () => {
        if (fromCatalog) {
            navigate('/catalog');
        } else {
            navigate('/items');
        }
    };

    const handleLoan = async (item) => {
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
        <div className={'w-full h-[calc(100vh-5rem)]'}>
            <div className={'hero bg-white'}>
                <div className="hero-content flex-col lg:flex-row">
                    <img src={`${config.baseUrl}`+item.picture} alt={item.name} className="max-h-[20rem] max-w-full object-cover" />
                    <div>
                        <h1 className="text-2xl text-quaternary mb-2">{item.name}</h1>
                        <span className="badge badge-xs badge-warning mb-4">{item.category.name}</span>
                        <p className="mb-4">{item.description}</p>
                        <p className="mb-4"><strong>Reference:</strong> {item.reference}</p>
                        <div className="card-actions justify-end">
                        <button
                            onClick={() => setShowPopup(true)}
                            className={`${item.state.name === 'AVAILABLE' ? 'bg-quaternary hover:bg-secondary' : 'bg-opposite'} text-white btn`}>
                            {item.state.name === 'AVAILABLE' ? 'Loan' : 'Book'}
                        </button>
                        </div>
                    </div>
                </div>
            </div>
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