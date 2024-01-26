import '../styles/info-page.css';

const Feature = ({
    Icon,
    title,
    description,
}) => {
    return (
        <div className="feature-container">
            <div className="feature-icon-container">
                <Icon 
                    size={128}
                    weight="fill"
                    color="#fff"
                    className="feature-icon"
                />
            </div>
            <div className="feature-info">
                <div className="feature-title">
                    {title}
                </div>
                <div className="feature-subtitle">
                    {description}
                </div>
            </div>
        </div>
    );
}

export default Feature;