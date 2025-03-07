import { Navbar } from "../components";

const Home = () => {
    return (
        <>
            <Navbar/>
            <div className={'w-full h-[calc(100vh-4rem)] flex flex-col'}>
                <div className={"bg-tertiary w-full h-1/2 justify-center items-center flex"}>
                    <h1 className={'text-white text-[4rem]'}>Olfactis</h1>
                </div>
            </div>
        </>
    );
}

export default Home;