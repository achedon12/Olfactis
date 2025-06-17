import {useState, useEffect} from 'react';
import config from "../../providers/apiConfig.js";
import {toast} from "react-toastify";

const Tabs = ({user, loans, loansReturned, bookings}) => {
    const [subUpdateModalOpen, setSubUpdateModalOpen] = useState(false);
    const [loanConfirmModalOpen, setLoanConfirmModalOpen] = useState(false);
    const [loanConfirmAction, setLoanConfirmAction] = useState(null);
    const [loanTo, setLoanTo] = useState(null);
    const [subscriptions, setSubscriptions] = useState([]);
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    };

    useEffect(() => {
        const fetchAllSubscriptions = async () => {
            try {
                const response = await fetch(`${config.apiBaseUrl}/subscription/upgradable/${user._id}`, {
                    method: 'GET',
                    headers: config.getHeaders()
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch subscriptions');
                }
                const data = await response.json();
                setSubscriptions(data);
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
                return [];
            }
        }
        fetchAllSubscriptions();
    }, []);

    const handleLoanAction = async (action, loanId) => {
        try {
            const response = await fetch(`${config.apiBaseUrl}/loan/${action}/${loanId}`, {
                method: 'PUT',
                headers: config.getHeaders()
            });
            if (!response.ok) {
                throw new Error(`Failed to ${action} loan`);
            }
            setLoanConfirmModalOpen(false);
            setLoanTo(null);
            const responseData = await response.json();
            if (action === 'return') {
                const updatedLoans = loans.filter(loan => loan._id !== loanId);
                localStorage.setItem('loans', JSON.stringify(updatedLoans));
                localStorage.setItem('loansReturned', JSON.stringify([...loansReturned, responseData]));
            } else if (action === 'extend') {
                const updatedLoans = loans.map(loan => {
                    if (loan._id === loanId) {
                        return {...loan, end_date: responseData.end_date};
                    }
                    return loan;
                });
                localStorage.setItem('loans', JSON.stringify(updatedLoans));
            }
            toast.info(`Loan ${action}ed successfully`);
            window.location.reload();
        } catch (error) {
            console.error(`Error ${action}ing loan:`, error);
        }
    }

    const handleSubscriptionUpgrade = async (subscriptionId) => {
        try {
            const response = await fetch(`${config.apiBaseUrl}/subscription/upgrade/${user._id}`, {
                method: 'PUT',
                headers: config.getHeaders(),
                body: JSON.stringify({subscriptionId})
            });
            if (!response.ok) {
                throw new Error('Failed to upgrade subscription');
            }
            setSubUpdateModalOpen(false);
            const newSub = await response.json();
            const updatedUser = {...user, subscription: newSub.subscription};
            localStorage.setItem('user', JSON.stringify(updatedUser));
            toast.info(`Subscription upgraded to ${newSub.subscription.name}`);
            window.location.reload();
        } catch (error) {
            console.error('Error upgrading subscription:', error);
        }
    };

    return (
        <div className="w-full h-full rounded-sm overflow-hidden p-6 bg-white">
            <div className="tabs tabs-lift">
                <input type="radio" name="my_tabs_3" className="tab" aria-label="Loans" defaultChecked/>
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Your loans</h3>
                        {loans.length === 0 ? (
                            <p className="text-gray-500">No loans ongoing.</p>
                        ) : (
                            <div className="space-y-4">
                                {loans.map((loan, index) => (
                                    <div key={loan.id || index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-gray-900">{loan.item.name}</h4>
                                                <p className="text-sm text-gray-500 mb-5">{loan.item.category.name}</p>
                                                <p>Start date : {formatDate(loan.start_date)}</p>
                                                <p>End date : {formatDate(loan.end_date)}</p>
                                            </div>
                                            <img src={`${config.baseUrl}` + loan.item.picture} alt={loan.item.name}
                                                 className="w-24 object-contain"/>
                                        </div>
                                        <div className="mt-5 flex space-x-3">
                                            <button className="btn btn-error" onClick={() => {
                                                setLoanConfirmAction('return');
                                                setLoanConfirmModalOpen(true);
                                                setLoanTo(loan._id);
                                            }}>
                                                Return loan
                                            </button>
                                            <button className="btn btn-info" onClick={() => {
                                                setLoanConfirmAction('extend');
                                                setLoanConfirmModalOpen(true);
                                                setLoanTo(loan._id);
                                            }}>
                                                Extend loan
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <input type="radio" name="my_tabs_3" className="tab" aria-label="Bookings"/>
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Your bookings</h3>
                        {bookings.length === 0 ? (
                            <p className="text-gray-500">No bookings ongoing.</p>
                        ) : (
                            <div className="space-y-4">
                                {bookings.map((booking, index) => (
                                    <div key={booking.id || index} className="border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-medium text-gray-900">{booking.item.name}</h4>
                                        <p className="text-sm text-gray-500">{booking.item.category.name}</p>
                                        <p>Start date : {formatDate(booking.start_date)}</p>
                                        <p>Fin : {formatDate(booking.end_date)}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <input type="radio" name="my_tabs_3" className="tab" aria-label="Loan history"/>
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Loan history</h3>
                        {loansReturned.length === 0 ? (
                            <p className="text-gray-500">No loan history.</p>
                        ) : (
                            <div className="space-y-4">
                                {loansReturned.map((loanReturned, index) => (
                                    <div key={loanReturned.id || index}
                                         className="border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-medium text-gray-900">{loanReturned.item.name}</h4>
                                        <p className="text-sm text-gray-500">{loanReturned.item.category.name}</p>
                                        <p>Returned on : {formatDate(loanReturned.returned_at)}</p>
                                        <p>Start date : {formatDate(loanReturned.start_date)}</p>
                                        <p>End date : {formatDate(loanReturned.end_date)}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <input type="radio" name="my_tabs_3" className="tab" aria-label="Subscription"/>
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Subscription
                            : {user.subscription.name}</h3>
                        <div className="space-y-4">
                            <p>Description: {user.subscription.description}</p>
                            <p>Price: {user.subscription.price === -1 ? 'Free' : `${user.subscription.price} €`}</p>
                            <p>Loan Limit: {user.subscription.loan_limit === -1 ? 'Unlimited' : user.subscription.loan_limit}</p>
                            <p>Booking Limit: {user.subscription.booking_limit === -1 ? 'Unlimited' : user.subscription.booking_limit}</p>
                            <p>Extend Duration: {user.subscription.extend_duration === -1 ? 'Unlimited' : `${user.subscription.extend_duration} days`}</p>
                            <p>Loan duration: {user.subscription.loan_duration === -1 ? 'Unlimited' : `${user.subscription.loan_duration} days`}</p>
                        </div>
                        <div className="mt-5">
                            <button className="btn btn-accent" onClick={() => setSubUpdateModalOpen(true)}>
                                Upgrade Subscription
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {loanConfirmModalOpen && (
                <LoanConfirmModal
                    action={loanConfirmAction}
                    onConfirm={() => handleLoanAction(loanConfirmAction, loanTo)}
                    onClose={() => setLoanConfirmModalOpen(false)}
                />
            )}
            {subUpdateModalOpen && (
                <SubscriptionUpdateModal
                    subscriptions={subscriptions}
                    onUpgrade={handleSubscriptionUpgrade}
                    onClose={() => setSubUpdateModalOpen(false)}
                />
            )}
        </div>
    );
};

const LoanConfirmModal = ({action, onConfirm, onClose}) => {
    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="text-lg font-medium mb-4">Confirm {action === 'return' ? 'Return' : 'Extension'}</h2>
                <p>Are you sure you want to {action} this loan?</p>
                <div className="modal-action">
                    <button className="btn btn-error" onClick={() => onConfirm()}>
                        Confirm
                    </button>
                    <button className="btn" onClick={() => onClose()}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

const SubscriptionUpdateModal = ({subscriptions, onUpgrade, onClose}) => {
    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="text-lg font-medium mb-4">Upgrade Subscription</h2>
                {subscriptions.length > 0 ? (
                    <div>
                        <p className="mb-4">Choose a new subscription plan:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {subscriptions.map((sub) => (
                                <div key={sub._id} className="border border-gray-200 rounded-lg p-4">
                                    <h3 className="font-medium text-gray-900">{sub.name}</h3>
                                    <p className="text-sm text-gray-500">{sub.description}</p>
                                    <p><strong>Price:</strong> {sub.price === -1 ? 'Free' : `${sub.price} €`}
                                    </p>
                                    <p><strong>Loan
                                        Limit:</strong> {sub.loan_limit === -1 ? 'Unlimited' : sub.loan_limit}
                                    </p>
                                    <p><strong>Booking
                                        Limit:</strong> {sub.booking_limit === -1 ? 'Unlimited' : sub.booking_limit}
                                    </p>
                                    <p>
                                        <strong>Loan
                                            duration:</strong> {sub.loan_duration === -1 ? 'Unlimited' : `${sub.loan_duration} days`}
                                    </p>
                                    <button className="btn btn-success mt-3"
                                            onClick={() => onUpgrade(sub._id)}>
                                        Upgrade to {sub.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-500">No subscriptions available for upgrade.</p>
                        <p>(You are already on the highest plan)</p>
                    </>
                )}
                <div className="modal-action">
                    <button className="btn" onClick={() => onClose()}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Tabs;