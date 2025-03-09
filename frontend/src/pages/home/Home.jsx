import {ActionButton} from "../../components";
import {useNavigate} from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();

    return (
        <div className={'w-full h-[calc(100vh-4rem)] flex flex-col'}>
            <section className={"bg-tertiary w-full h-2/3 flex justify-center items-center flex-col md:flex-row"}>
                <h1 className={'text-white text-[4rem] sm:text-[6rem] lg:text-[8rem] tracking-widest z-50'}>Olfactis</h1>
                <img src={'/olfactis.svg'} alt={'logo'} className={'absolute md:relative z-10 h-1/3 sm:h-1/2 md:h-2/3'} />
            </section>

            <section className={'w-full h-40 justify-center items-center flex flex-col'}>
                <p className="tracking-widest text-xl text-center">“Turn scents into emotions, emotions into memories.”</p>
                <div className={'flex justify-between items-center w-1/4 md:w-1/12'}>
                    <hr className={'w-1/4 my-4 border-1 border-quaternary'} />
                    <p className="text-lg text-quaternary">o</p>
                    <hr className={'w-1/4 my-4 border-1 border-quaternary'} />
                </div>
            </section>

            <section className={'w-full h-30 justify-center items-center flex flex-col'}>
                <ActionButton onClick={() => navigate('/catalog')}>Search a item to book</ActionButton>
            </section>

        </div>
    );
}

export default Home;