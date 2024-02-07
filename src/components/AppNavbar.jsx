const links = [
    { path: '/', text: 'หน้าหลัก' },
    { path: '/edit', text: 'เพิ่มรายการ' },
];
const AppNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ paddingLeft: "8px"}}>
            <a className="navbar-brand" href="#">
                React ID Card
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {links.map((link) => {
                        return (
                            <li key={link.text} className="nav-item">{/* active */}
                                <a href={link.path} className="nav-link">{link.text}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
};
export default AppNavbar;