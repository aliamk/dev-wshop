import { useRouter } from "next/router";
import Image from "next/image";

const Footer = () => {
  const router = useRouter();

  return (
    <div className="footer">
      <div className="footer_flex_container">
        <div className="c_1">
          ON
          <br />
          <a
            href="https://www.madebyon.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            madebyon.com
          </a>
        </div>
        <div className="c_2">
          Bureau, C3, Design District,
          <br />
          13 Soames Walk, London, SE10 0AX
        </div>
        <div className="c_3">
          <a href="mailto:hello@madebyon.com?subject=Assistance with the Cervest-Storyblok CMS Guide">
            hello@madebyon.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
