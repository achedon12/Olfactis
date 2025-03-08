import {CustomButton} from "./index.js";

const ItemCard = ({item}) => {
    return (
        <div className="w-full h-full bg-white px-4 py-6 flex flex-col justify-between items-center ">
            <div>
                <div className={'flex items-center justify-between mb-4'}>
                    <h2 className={'text-[.6rem] sm:text-sm '}>{item.name}</h2>
                    <p className={'text-[.5rem] sm:text-xs text-quaternary'}>{item.category.name}</p>
                </div>
                <p className={'text-[.5rem] sm:text-xs'}>{item.description}</p>
            </div>
            <div className={'mt-4'}>
                {/*<button className={'bg-quaternary text-white px-4 py-2 text-[.6rem] sm:text-sm hover:bg-tertiary transition ease-in duration-200 cursor-pointer'}>Book</button>*/}
                <CustomButton>Book</CustomButton>
            </div>
        </div>
    );
}

export default ItemCard;