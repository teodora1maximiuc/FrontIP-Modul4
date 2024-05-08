import "./Footer.css";
import Facebook from "../img/facebook.png";
import Twitter from "../img/twitter.png";
import Youtube from "../img/youtube.png";
import Instagram from "../img/instagram.png";

const Footer = () =>
{
    return(
        <footer>
            <div className="footer-image"></div>
            <div className="footer-section">
                <div className="footer-content">
                    <p>Smart <br/>Household <br/>Management</p>
                </div>
                <div className="footer-contact">
                    <p>Contact</p>
                    <p id="colored">info@household.com</p>
                    <p id="number">+ 01 234 567 890</p>
                    <a><img src={Facebook} alt="facebook" /></a>
                    <a><img src={Twitter} alt="twitter" /></a>
                    <a><img src={Youtube} alt="youtube" /></a>
                    <a><img src={Instagram} alt="instagram" /></a>
                </div>
            </div>
        </footer>
    )
}
export default Footer;