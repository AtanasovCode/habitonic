const ContactForm = () => {
    return (
        <div className="contact-form-container">
            <div className="contact-form-input-container">
                <label className="contact-label" htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    className="contact-form-input"
                />
            </div>
            <div className="contact-form-input-container">
                <label className="contact-label" htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    className="contact-form-input"
                />
            </div>
            <input 
                type="button"
                value="Contact Us"
                className="contact-form-btn"
            />
        </div>
    );
};

export default ContactForm;