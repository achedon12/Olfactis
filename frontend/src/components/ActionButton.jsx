const ActionButton = ({ children, className, ...otherProps }) => (
    <button className={`bg-quaternary text-white btn ${className}`} {...otherProps}>
        {children}
    </button>
);

export default ActionButton;