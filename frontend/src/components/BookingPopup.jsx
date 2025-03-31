import {useEffect, useRef, useState} from "react";
import config from "../providers/apiConfig.js";

const BookingPopup = ({item, setShowPopup, showPopup, action = 'Loan', handleAction = () => {}}) => {

    const subscription = useRef(JSON.parse(localStorage.getItem('user')).subscription);
    const bookingCount = useRef(JSON.parse(localStorage.getItem('bookings')).length);
    const loansCount = useRef(JSON.parse(localStorage.getItem('loans')).length);
    const [dueDate, setDueDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    useEffect(() => {
        if (subscription.current.loan_limit === -1) {
            setDueDate('No limit');
            return;
        }
        const date = new Date();
        date.setMonth(date.getMonth() + subscription.current.loan_limit);
        setDueDate(date.toDateString());
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (showPopup && action === 'Book') {
                const response = await fetch(`${config.apiBaseUrl}/loan/${item._id}`, {
                    method: 'GET',
                    headers: config.headers
                });

                if (response.ok) {
                    const data = await response.json();
                    setReturnDate(new Date(data.end_date).toDateString());
                }
            }
        };

        fetchData();
    }, [showPopup]);

    if (!showPopup) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-xs z-50">
            <div className="bg-white p-6 shadow-lg">
                <div className="mb-4">
                    <h1 className="text-2xl text-quaternary mb-4">{item.name}</h1>
                    <p className="mb-4">{item.description}</p>
                    <p className="mb-4"><strong>Reference:</strong> {item.reference}</p>
                    <p className="mb-4"><strong>Category:</strong> {item.category.name}</p>
                    <p className={`mb-4 ${item.state.name === 'LOANED' ? 'text-red-500' : ''}`}>
                        <strong>Due date:</strong> {dueDate}
                    </p>

                    {item.state.name === 'AVAILABLE' && <p className="mb-4"><strong>Remaining loans:</strong> {subscription.current.loan_limit === -1 ? 'No limit' : subscription.current.loan_limit - loansCount.current}</p>}
                    {item.state.name === 'LOANED' && <p className="mb-4"><strong>Remaining books:</strong> {subscription.current.booking_limit === -1 ? 'No limit' : subscription.current.booking_limit - bookingCount.current}</p>}
                    <div className={`w-full p-4 bg-secondary text-white`}>
                        {item.state.name === 'AVAILABLE' && <p>This item is available for loan.</p>}
                        {item.state.name === 'LOANED' &&
                            <div>
                                <p>This item is currently loaned.</p>
                                <p>It will be available on { returnDate }.</p>
                            </div>
                        }
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => setShowPopup(false)}
                        className="bg-gray-300 px-4 py-2 cursor-pointer">Cancel
                    </button>
                    <button
                        onClick={() => handleAction(item)}
                        className="bg-red-500 text-white px-4 py-2 cursor-pointer">{action}</button>
                </div>
            </div>
        </div>
    );

}

export default BookingPopup;