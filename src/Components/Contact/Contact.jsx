import React from "react";
import "./Contact.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import mail_icon from "../../assets/mail_icon.svg";
import call_icon from "../../assets/call_icon.svg";
import location_icon from "../../assets/location_icon.svg";

const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "a8a59a56-d6ca-41b4-99ed-577d913a9e21");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      alert (res.message);
      console.log("Success", res);
    } 
  };



  return (
    <div id="contact" className="contact">
      <div className="contact-title">
        <h1>Get in Touch</h1>
        <img src={theme_pattern} alt="Decorative pattern" />
      </div>
      <div className="contact-section">
        <div className="contact-left">
          <h1>Let's Talk</h1>
          <p>
            I am currently available for new opportunities and would love to
            connect! Feel free to Contact 
          </p>
            <div className="contact-details">
            <div className="contact-detail">
                <img src={mail_icon} alt="" /> 
                <p>iamarshit2328@gmail.com</p>               
            </div>
            <div className="contact-detail">
                <img src={call_icon} alt="" />
                <p> +91 83520-15927 </p>
            </div>
            <div className="contact-detail">
                <img src={location_icon} alt="" />
                <p>HAMIRPUR , HIMACHAL PRADESH ,PIN-176041 </p>
            </div>
            </div>
        </div>
        <form onSubmit={onSubmit} className="contact-right">
            <label htmlFor="">Your Name</label>
            <input type="" placeholder="Enter your name" name="name" />
            <label htmlFor="">Your Email</label>
            <input type="" placeholder="Enter your email" name="email" />
            <label htmlFor="">Write Your Message here</label>
            <textarea name="message" rows='8' placeholder="Enter Your Message"></textarea>
            <button type="submit" className="contact-submit">
                Submit now
            </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
