import '../styles/homepage.css';

const Homepage = () => {
    return (
        <div className="home-container">
            <div className="home-info-container">
                <div className="home-heading">
                    Track, Organize, <span className="home-fancy">Conquer</span> your day
                </div>
                <div className="home-desc">
                    Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Reprehenderit expedita
                    eaque sequi quod, quasi ea accusamus
                    ipsam cumque, corrupti cupiditate
                </div>
                <button className="home-btn">
                    Start Tracking
                </button>
            </div>
            <div className="home-image-container"></div>
        </div>
    );
}

export default Homepage;