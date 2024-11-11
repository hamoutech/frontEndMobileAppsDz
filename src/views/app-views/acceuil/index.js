import { useState, useEffect } from "react";
import { Row, Col, Button } from "antd";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import dashBoardNavTree from "../../../configs/NavigationConfig";
import backimage from "../../../assets/svg/captureicon.PNG";
import match from "../../../assets/svg/rencontre.png";
import live from "../../../assets/svg/match-en-ligne.png";
import partner from "../../../assets/svg/partenaire.png";
import effectif from "../../../assets/svg/personnes.png";
import player from "../../../assets/svg/player.png";
import home from "../../../assets/svg/accueil.png";
import stade from "../../../assets/svg/stade.png";
import message from "../../../assets/svg/courrier.png";
import news from "../../../assets/svg/un-journal.png";
import boutique from "../../../assets/svg/boutique.png";
import ad from "../../../assets/svg/ad.png";
const colorMapping = {
  Dashboards: "#104A72",
  Club: "#8C8E19",
  Stadium: "#5C3D7A",
  Partner: "#CC660B",
  headcount: "#104A72",
  Matchs: "#5C4037",
  Message: "#B15C99",
  TV: "#CC462A",
  News: "#1E7A1F",
  Boutique: "#128899",
  Ad: "#5C3D7A",
};
// const colorMapping = {
//   Dashboards: "#104A72", // Darker blue
//   Club: "#8C8E19", // Darker yellow-green
//   Stadium: "#5C3D7A", // Darker purple
//   Partner: "#CC660B", // Darker orange
//   headcount: "#A11F20", // Darker red
//   Matchs: "#5C4037", // Darker brown
//   Message: "#B15C99", // Darker pink
//   TV: "#CC462A", // Darker orange-red
//   News: "#1E7A1F", // Darker green
//   Boutique: "#128899", // Darker cyan
// };

const getbackimage = (item) => {
  if (item === "Club") return `url(${home})`;
  else if (item === "Stadium") return `url(${stade})`;
  else if (item === "Partner") return `url(${partner})`;
  else if (item === "Players") return `url(${player})`; // Image for Joueurs
  else if (item === "Staff") return `url(${effectif})`; // Image for Staff
  else if (item === "Matchs") return `url(${match})`;
  else if (item === "Message") return `url(${message})`;
  else if (item === "TV") return `url(${live})`;
  else if (item === "News") return `url(${news})`;
  else if (item === "Ad") return `url(${ad})`;
  else return `url(${boutique})`;
};

const DefaultDashboard = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [theNav, setTheNav] = useState(dashBoardNavTree);
  const navigate = useNavigate();

  const buttonStyle = {
    width: "15vw",
    height: "16vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    flexDirection: "column",
    position: "relative",
    fontSize: "14px",
    color: "white",
    backgroundSize: "contain",
    backgroundPosition: "center",
    transition: "transform 0.3s",
    backgroundImage: `url(${backimage})`,
    backgroundRepeat: "no-repeat",
  };

  const hoverStyle = {
    transform: "scale(1.07)",
  };

  const textStyle = {
    position: "absolute",
    bottom: "0px",
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", fontWeight: "700" }}>
        {t("Bienvenue sur l'espace administrateur")}
      </h2>
      <h4 style={{ textAlign: "center" }}>
        {t(
          "Nous sommes ravis de vous accueillir dans cet espace dédié à la gestion et à la supervision de l’application mobile. En tant qu'administrateur, vous avez désormais accès à des fonctionnalités avancées qui vous permettront de gérer efficacement l’application."
        )}
      </h4>
      <Row
        gutter={[64, 64]}
        justify="space-around"
        align="middle"
        style={{ marginTop: "5vh" }}
      >
        {theNav.map((item) => {
          if (item.key !== "Acceuil") {
            if (item.key === "headcount") {
              return item.submenu.map((subitem) => (
                <Col key={subitem.key}>
                  <Button
                    style={{
                      ...buttonStyle,
                      ...(hoveredButton === subitem.key ? hoverStyle : {}),
                      backgroundImage: getbackimage(subitem.key),
                      backgroundColor: colorMapping[subitem.key] || "#104A72",
                    }}
                    onMouseEnter={() => setHoveredButton(subitem.key)}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={() => navigate(subitem.path)}
                  >
                    <div style={textStyle}>{t(subitem.title)}</div>
                  </Button>
                </Col>
              ));
            } else {
              return (
                <Col key={item.key}>
                  <Button
                    style={{
                      ...buttonStyle,
                      ...(hoveredButton === item.key ? hoverStyle : {}),
                      backgroundImage: getbackimage(item.key),
                      backgroundColor: colorMapping[item.key] || "#FFF",
                    }}
                    onMouseEnter={() => setHoveredButton(item.key)}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={() => navigate(item.path)}
                  >
                    <div style={textStyle}>{t(item.title)}</div>
                  </Button>
                </Col>
              );
            }
          }
          return null;
        })}
      </Row>
    </div>
  );
};

export default DefaultDashboard;
