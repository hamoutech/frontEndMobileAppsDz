import React from "react";
import RegisterForm from "../../components/RegisterForm";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const backgroundURL = "/img/others/img-bg-3.jpg";
const backgroundStyle = {
  // backgroundImage: `url(${backgroundURL})`,
  backgroundColor: "rgba(11, 152, 60, 0.7)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const RegisterOne = (props) => {
  const { t } = useTranslation();
  const theme = useSelector((state) => state.theme.currentTheme);

  return (
    <div className={`h-100 ${theme === "light" ? "bg-white" : ""}`}>
      <Row justify="center" className="align-items-stretch h-100">
        <Col xs={0} sm={0} md={0} lg={8}>
          <div
            className="d-flex flex-column justify-content-between h-100 px-4"
            style={backgroundStyle}
          >
           
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
                  {" "}
                  {t("footer.terms")}
                </a>
                <span className="mx-2 text-white"> | </span>
                <a
                  className="text-white"
                  href="/#"
                  onClick={(e) => e.preventDefault()}
                >
                  {" "}
                  {t("footer.privacy")}
                </a>
              </div>
            </div> */}
          </div>
        </Col>
        <Col xs={20} sm={20} md={24} lg={16}>
          <div className="container d-flex flex-column justify-content-center h-100">
            <Row justify="center">
              <Col xs={24} sm={24} md={20} lg={12} xl={8}>
                <h1>{t("signup")} </h1>
                <p className="text-muted">
                  {t("register.message")}
                  <a href="/auth/login">{t("register.backToLogin")}</a>
                </p>
                <div className="mt-4">
                  <RegisterForm {...props} />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterOne;
