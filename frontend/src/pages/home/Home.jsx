const Home = () => {
    return (
        <div className={'w-full h-[calc(100vh-4rem)] flex flex-col'}>
            <div className={"bg-tertiary w-full h-2/3 justify-center items-center flex flex-col"}>
                <img src={'/olfactis.svg'} alt={'logo'} className={'absolute h-1/2 z-10'} />
                <h1 className={'text-white text-[4rem] z-50'}>Olfactis</h1>
                {/*<p>“Turn scents into emotions, emotions into memories.”</p>*/}
            </div>
        </div>
    );
}

export default Home;