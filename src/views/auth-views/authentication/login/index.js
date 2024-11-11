import React from "react";
import LoginForm from "../../components/LoginForm";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  AUTH_PREFIX_PATH,
  APP_PREFIX_PATH,
  REGISTER_PREFIX_PATH,
  REGISTER_ENTRY_KEY,
} from "configs/AppConfig";

const backgroundURL = "/img/others/img-bg-3.jpg";
const backgroundStyle = {
  backgroundColor: "rgba(11, 152, 60, 0.7)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const Login = (props) => {
  const { t } = useTranslation();
  const theme = useSelector((state) => state.theme.currentTheme);

  return (
    <div className={`h-100 ${theme === "light" ? "bg-white" : ""}`}>
      <Row justify="center" className="align-items-stretch h-100">
      <Col xs={0} sm={0} md={0} lg={8}>
          <div
            className="d-flex flex-column justify-content-between h-100 px-4 "
            style={backgroundStyle}
          >
            {/* <div className="text-right">
              <img
                src="/img/kodomo-logo-white.png"
                alt="logo"
                width={85}
                style={{ marginTop: "10px" }}
              />
            </div> */}
            <Row justify="center">
              <Col xs={0} sm={0} md={0} lg={20}  >
                {/* <img
                  width={400}
                  className="img-fluid mb-5"
                  src="/img/others/img-login.png"
                  alt=""
                />
                <h1 className="text-white">{t("welcome")}</h1>
                <p className="text-white font-size-md">
                  {t("welcome message")}
                </p> */}
                <Carousel showArrows={false} showThumbs={false} showStatus={false} autoPlay={4000} infiniteLoop={true}>
                  <div className="slide">
                  <img
                  width={350}
                  height={300}
                  className="img-fluid mb-5 mt-3"
                  src="/img/images/slide1.png"
                  alt=""
                />
                    <h2 className="text-white">{t("welcome")} </h2>
                    <p className="mb-5 text-white">{t("welcome message")}</p>
                    
                  </div>
                  <div className="slide">
                  <img
                  width={350}
                  height={300}
                  className="img-fluid mb-5 mt-3"
                  src="/img/images/slide2.png"
                  alt=""
                />
                    <h2 className="text-white">{t("slide2")} </h2>
                    <p className="mb-5 text-white">{t("slide2 message")}  </p>
                  </div>
                  <div className="slide">
                  <img
                  width={350}
                  height={300}
                  className="img-fluid mb-5 mt-3"
                  src="/img/images/slide3.png"
                  alt=""
                />
                    
                    <p className="mb-5 text-white"> {t("slide3 message")}</p>
                  </div>
                  
                </Carousel>
              </Col>
            </Row>
            {/* <div className="d-flex justify-content-end pb-4">
              <div>
                <a
                  className="text-white"
                  href="/#"
                  onClick={(e) => e.preventDefault()}
                >
                  {t("footer.terms")}
                </a>
                <span className="mx-2 text-white"> | </span>
                <a
                  className="text-white"
                  href="/#"
                  onClick={(e) => e.preventDefault()}
                >
                  {t("footer.privacy")}
                </a>
              </div>
            </div> */}
          </div>
        </Col>
        <Col xs={20} sm={20} md={24} lg={16}>
          <div className=" container d-flex flex-column justify-content-center h-100 ">
            <Row justify="center">
              <Col xs={24} sm={24} md={20} lg={12} xl={8}>
                <h1>{t("login")}</h1>
                <p>
                  {t("login.message")}
                  <a
                    href={`${REGISTER_PREFIX_PATH}/register/${REGISTER_ENTRY_KEY}`}
                  >
                    {" "}
                    {t("login.sigupMessage")}{" "}
                  </a>
                </p>
                <div className="mt-4">
                  <LoginForm {...props} />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
       
      </Row>
    </div>
  );
};

export default Login;
