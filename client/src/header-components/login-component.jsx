export default function LoginComponent({onClickLoginBtn}) {


    return (
        <>
            <div className={`col-md-3 text-end`}>
                <button type="button" className="btn btn-outline-primary me-2" onClick={onClickLoginBtn}>Login</button>
                <button type="button" className="btn btn-primary">Sign-up</button>
            </div>
        </>
    );
}