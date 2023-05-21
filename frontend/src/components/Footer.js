import React from "react";

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>About Us</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                sed dapibus leo nec ornare diam.
              </p>
            </div>
            <div className="col-md-4">
              <h5>Contact Us</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#!" className="text-decoration-none text-dark">
                    Email Us
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-decoration-none text-dark">
                    Call Us
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-decoration-none text-dark">
                    Visit Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Follow Us</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#!" className="text-decoration-none text-dark">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-decoration-none text-dark">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-decoration-none text-dark">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container-fluid bg-secondary">
          <div className="row">
            <div className="col-md-12">
              <div className="text-center">
                <p className="mb-0 text-white">
                  &copy; 2023 My Awesome Website
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
