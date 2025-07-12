import './footer.styles.scss';

import githubIcon from "../../assets/github-mark.svg";
import linkedinIcon from "../../assets/linkedin.svg";

const FooterComponent = () => {
  return (
    <div className='container footer'>
      <div className='footer-content'>
        <span>
          2025 - Worn Again
        </span>
        <div className='footer-icons'>
        
          <a href='https://github.com/basilahamed07/odoo_hackation.git' title='Odoo Hackathon'>
            <img src={githubIcon} alt='Github' />
          </a>
        </div>
      </div>
    </div>
  );
}

export default FooterComponent;
