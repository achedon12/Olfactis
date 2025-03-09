import {useState, useEffect} from 'react';
import {useParams, useLocation, useNavigate} from 'react-router-dom';
import config from "../../providers/apiConfig.js";
import {ActionButton, Loader} from "../../components";

const ItemDetail = () => {
    const [item, setItem] = useState(null);
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

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

    return (
        <div className={'w-full h-[calc(100vh-4rem)]'}>
            <div className={'h-2/3 bg-white'}>
                <div className="flex flex-col lg:flex-row items-center lg:items-start">
                    <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                        <img src={item.picture} alt={item.name} className="w-full h-auto object-cover"/>
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
                                    {/*<p>The expected return date is {new Date(item.loan.end_date).toLocaleDateString()}.</p>*/}
                                </div>
                            }
                            <button className={`${item.state.name === 'AVAILABLE' ? 'bg-quaternary hover:bg-secondary' : 'bg-opposite'} text-white px-4 py-2 text-[.6rem] sm:text-sm transition ease-in duration-200 cursor-pointer mt-10`}>
                                {item.state.name === 'AVAILABLE' ? 'Loan' : 'Book'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'w-full flex justify-center items-center h-1/3'}>
                <ActionButton onClick={handleGoBack}>Go back</ActionButton>
            </div>
        </div>
    );
}

export default ItemDetail;