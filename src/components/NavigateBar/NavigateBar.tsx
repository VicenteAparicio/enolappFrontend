const baseClass = "navigateBar";

export const NavigateBar = () => {
    return (
        <div className={baseClass}>
            <ul className={baseClass + '__navigateList'}>
                <li className="links">Home</li>
                <li className="links">Login</li>
            </ul>
        </div>
    )
}