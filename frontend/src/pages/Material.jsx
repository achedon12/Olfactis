import Navbar from "../components/Navbar.jsx";

const Material = () => {
    return (
        <>
            <Navbar/>
            <div className={'w-full h-screen'}>
                <div className={"bg-tertiary w-full h-1/2 justify-center items-center flex"}>
                    <h1 className={'text-white text-[4rem]'}>MATERIEL</h1>
                </div>
            </div>
        </>
    );
}

export default Material;