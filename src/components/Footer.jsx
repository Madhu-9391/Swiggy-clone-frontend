import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="fi">
          <div className="fi0">
            <div className="fi1">
              <img src="/images/swiggyfooterlogo.png" alt="Foodie logo" />
              <h2>Foodie</h2>
            </div>
            <h4>© 2024 Bundl<br />Technologies Pvt. Ltd</h4>
          </div>
          <div className="fi2">
            <h3>Company</h3>
            <a href="#">About</a><br />
            <a href="#">Careers</a><br />
            <a href="#">Team</a><br />
            <a href="#">Foodie One</a><br />
            <a href="#">Foodie Instamart</a><br />
            <a href="#">Foodie Genie</a>
          </div>
          <div className="fi3">
            <div className="Contactus">
              <h3>Contact us</h3>
              <a href="#">Help & Support</a><br />
              <a href="#">Partner with us</a><br />
              <a href="#">Ride with us</a><br />
            </div>
            <div className="Legal">
              <h3>Legal</h3>
              <a href="#">Terms & Conditions</a><br />
              <a href="#">Cookie Policy</a><br />
              <a href="#">Privacy Policy</a><br />
              <a href="#">Investor Relations</a><br />
            </div>
          </div>
          <div className="fi4">
            <h3>We deliver to:</h3>
            <a href="#">Bangalore</a><br />
            <a href="#">Gurgaon</a><br />
            <a href="#">Hyderabad</a><br />
            <a href="#">Delhi</a><br />
            <a href="#">Mumbai</a><br />
            <a href="#">Pune</a><br />
            <button>589 cities <i className="ri-arrow-down-s-line"></i></button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
