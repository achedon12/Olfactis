import { useNavigate } from "react-router-dom";
import { ActionButton } from "./index.js";

const ItemCard = ({ item }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/item/${item._id}?fromCatalog=true`);
    };

    if (!item) {
        return <div className="w-full h-full bg-white px-4 py-6 flex justify-center items-center">Loading...</div>;
    }

    return (
        <div className="w-full h-full bg-white px-4 py-6 flex flex-col justify-between items-center cursor-pointer" onClick={handleCardClick}>
            <div>
                <div className={'flex items-center justify-between mb-4'}>
                    <h2 className={'text-[.6rem] sm:text-sm '}>{item.name}</h2>
                    {item.category && (<p className={'text-[.5rem] sm:text-xs text-quaternary'}>{item.category.name}</p>)}
                </div>
                <p className={'text-[.5rem] sm:text-xs'}>{item.description}</p>
            </div>
            <div className={'mt-4'}>
                <button className={`${item.state.name === 'AVAILABLE' ? 'bg-quaternary' : 'bg-opposite'} hover:bg-secondary text-white px-4 py-2 text-[.6rem] sm:text-sm transition ease-in duration-200 cursor-pointer`}>
                    {item.state.name === 'AVAILABLE' ? 'Loan' : 'Book'}
                </button>
            </div>
        </div>
    );
}

export default ItemCard;