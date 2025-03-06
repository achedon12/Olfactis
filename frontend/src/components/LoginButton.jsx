const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = false;
    if (!isAuthenticated) {
        return (
            <div className="center-button">
                <button className="btn btn-primary loginBtn"
                        onClick={() => loginWithRedirect()}>
                    Log In</button>
            </div>
        );
    }
};

export default LoginButton;