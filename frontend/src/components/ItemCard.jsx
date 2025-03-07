const ItemCard = ({item}) => {
    return (
        <div className="w-full h-full bg-white px-4 py-6 flex flex-col justify-between items-center ">
            <div>
                <div className={'flex items-center justify-between mb-4'}>
                    <h2 className={'text-[.6rem] sm:text-sm '}>{item.name}</h2>
                    <p className={'text-[.6rem] sm:text-sm text-quaternary'}>{item.state.name}</p>
                </div>
                <p className={'text-[.5rem] sm:text-xs'}>{item.description}</p>
            </div>
            <div>
                <button className={'bg-quaternary text-white px-4 py-2 text-[.6rem] sm:text-sm cursor-pointer'}>RÉSERVER</button>
            </div>
        </div>
    );
}

export default ItemCard;