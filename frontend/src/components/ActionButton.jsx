const ActionButton = ({ children, ...otherProps }) => (
    <button className={'bg-quaternary text-white px-4 py-2 text-[.6rem] sm:text-sm hover:bg-tertiary transition ease-in duration-200 cursor-pointer'} {...otherProps}>
        {children}
    </button>
);

export default ActionButton;