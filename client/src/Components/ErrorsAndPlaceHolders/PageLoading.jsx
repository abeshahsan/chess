export default function PageLoading() {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                zIndex: 100,
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 255, 255, 1)",
                pointerEvents: "none",
            }}
        >
            <div
                className="spinner-border spinner-border"
                role="status"
                style={{ width: "4rem", height: "4rem" }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
