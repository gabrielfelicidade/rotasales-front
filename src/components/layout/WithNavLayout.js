import Navbar from "./Navbar";

const WithNavLayout = (props) => {
    return (
        <>
            <Navbar />
            <div style={{ width: '95vw', margin: 'auto', marginTop: '15px' }}>
                {props.children}
            </div>
        </>
    )
}

export default WithNavLayout;