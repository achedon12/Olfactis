import {useNavigate} from "react-router-dom";
import {ActionButton, Loader} from "./index.js";
import config from "../providers/apiConfig.js";

const ItemCard = ({item}) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/item/${item._id}?fromCatalog=true`);
    };

    if (!item) {
        return <Loader/>;
    }

    return (
        <div
            className="card bg-base-100 w-75 shadow-sm cursor-pointer hover:bg-base-200 transition ease-in duration-200"
            onClick={handleCardClick}>
            <div className={"p-4"}>
                <figure className="bg-gray-100 rounded-lg overflow-hidden">
                    <img src={`${config.baseUrl}` + item.picture} alt={item.name}
                         className="w-full h-40 object-contain"/>
                </figure>
            </div>

            <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <span className="badge badge-xs badge-warning">{item.category.name}</span>
                <p className="text-sm text-gray-500">{item.description}</p>
                <div className="card-actions justify-center mt-4">
                    <button
                        className={`${item.state.name === 'AVAILABLE' ? 'bg-quaternary' : 'bg-opposite'} 
                        hover:bg-secondary text-white px-4 py-2 text-[.6rem] sm:text-sm transition ease-in 
                        duration-200 rounded w-1/2`}>
                        {item.state.name === 'AVAILABLE' ? 'Loan' : 'Book'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;