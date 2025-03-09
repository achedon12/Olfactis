import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className={'w-full h-screen flex flex-col items-center justify-between bg-tertiary p-8'}>
            <h2 className={'text-white text-2xl'}>Olfactis</h2>
            <div className={'flex flex-col items-center'}>
                <h1 className={'text-white text-[4rem]'}>404 Not Found</h1>
                <Link to={'/'} className={'text-white text-sm underline'}>Go back to home</Link>
            </div>
            <p className={'text-white text-sm'}>Maybe try another URL ;)</p>
        </div>
    );
}

export default NotFound;