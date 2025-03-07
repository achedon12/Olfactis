import {useEffect, useState} from 'react';
import {Navbar, Loader} from "../components";
import {MagnifyingGlass} from '@phosphor-icons/react';
import ItemCard from '../components/ItemCard';
import config from "../providers/apiConfig.js";

const Material = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <>
            <Navbar/>
            <div className={'w-full'}>
                <h1 className={'text-3xl text-center my-6 tracking-widest'}>Matériel</h1>
                <div className={'w-full flex justify-center mb-4'}>
                    <div className={'w-5/6 md:w-1/2 relative'}>
                        <input type="text"
                               placeholder="Rechercher un matériel"
                               className={'w-full p-2 my-2 bg-input-color placeholder-white text-text-color focus:outline-quaternary pr-10'}
                        />
                        <MagnifyingGlass size={24}
                                         className={'absolute right-2 top-1/2 transform -translate-y-1/2 text-white cursor-pointer'}/>
                    </div>
                </div>
                {loading ? (
                    <Loader/>
                ) : <div className={'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 w-full md:w-5/6 mx-auto'}>
                    {items.map((item) => (
                        <ItemCard key={item._id} item={item}/>
                    ))}
                </div>}
            </div>
        </>
    );
}

export default Material;