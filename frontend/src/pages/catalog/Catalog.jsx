import { useEffect, useState } from 'react';
import { Loader, ItemCard } from "../../components/index.js";
import { MagnifyingGlass } from '@phosphor-icons/react';
import config from "../../providers/apiConfig.js";

const Catalog = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${config.apiBaseUrl}/item`, {
                    headers: config.getHeaders()
                });
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Failed to fetch items:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch(`${config.apiBaseUrl}/category`, {
                    headers: config.getHeaders()
                });
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchItems();
        fetchCategories();
    }, []);

    const filteredItems = items.filter(item =>
        (selectedCategory === 'All' || item.category.name === selectedCategory) &&
        (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <>
            <div className={'w-full'}>
                <div className={'w-full flex justify-center my-8'}>
                    <div className={'w-5/6 md:w-1/2 relative'}>
                        <input
                            type="text"
                            placeholder="Search a material"
                            className={'w-full p-2 my-2 bg-white placeholder-tertiary text-text-color focus:outline-quaternary pr-10'}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <MagnifyingGlass size={24} className={'absolute right-2 top-1/2 transform -translate-y-1/2 text-tertiary cursor-pointer'} />
                    </div>
                </div>
                <div className={'w-full flex justify-center mb-4 px-4'}>
                    <ul className={'flex space-x-4 overflow-x-auto whitespace-nowrap'}>
                        <li
                            className={`cursor-pointer text-xs lg:text-base ${selectedCategory === 'All' ? 'border-b-2 border-quaternary' : ''}`}
                            onClick={() => setSelectedCategory('All')}
                        >
                            All
                        </li>
                        {categories.map(category => (
                            <li
                                key={category._id}
                                className={`cursor-pointer text-xs lg:text-base ${selectedCategory === category.name ? 'border-b-2 border-quaternary' : ''}`}
                                onClick={() => setSelectedCategory(category.name)}
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>
                {loading ? (
                    <Loader />
                ) : (
                    <div className={'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 w-full md:w-5/6 mx-auto'}>
                        {filteredItems.map((item) => (
                            <ItemCard key={item._id} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Catalog;