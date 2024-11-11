import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Drawer } from "antd";
import utils from "utils";
import { MenuOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";

const { useBreakpoint } = Grid;

const SideContent = (props) => {
  const { sideContent, sideContentWidth = 250, border } = props;
  return (
    <div
      className={`side-content ${border ? "with-border" : ""}`}
      style={{ width: `${sideContentWidth}px` }}
    >
      {sideContent}
    </div>
  );
};

const SideContentMobile = (props) => {
  const { sideContent, open, onSideContentClose } = props;

  return (
    <Drawer
      width={320}
      placement="left"
      closable={false}
      open={open}
      bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <Flex flexDirection="column" className="h-100">
        <Flex justifyContent="end" alignItems="center">
          <div className="nav-close" onClick={onSideContentClose}>
            <ArrowLeftOutlined style={{ marginRight: "10px", fontSize:"15px" }} />
          </div>
        </Flex>
        <div className="mobile-nav-menu">
          <div className="h-100">{sideContent}</div>
        </div>
      </Flex>
    </Drawer>
  );
};

export const InnerAppLayout = (props) => {
  const { mainContent, pageHeader, sideContentGutter = true } = props;
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");
  const [visible, setVisible] = useState(false);

  const close = (e) => {
    setVisible(false);
  };

  const openSideContentMobile = () => {
    setVisible(true);
  };

  return (
    <div className="inner-app-layout">
      {isMobile ? (
        <SideContentMobile
          open={visible}
          onSideContentClose={close}
          {...props}
        />
      ) : (
        <SideContent {...props} />
      )}
      <div
        className={`main-content ${pageHeader ? "has-page-header" : ""} ${
          sideContentGutter ? "gutter" : "no-gutter"
        }`}
      >
        {isMobile ? (
          <div
            className={`font-size-lg mb-3 ${
              !sideContentGutter ? "pt-3 px-3" : ""
            }`}
          >
            <MenuOutlined
              onClick={() => {
                openSideContentMobile();
              }}
            />
          </div>
        ) : null}
        {mainContent}
      </div>
    </div>
  );
};

InnerAppLayout.propTypes = {
  sideContent: PropTypes.node,
  mainContent: PropTypes.node,
  pageHeader: PropTypes.bool,
  sideContentWidth: PropTypes.number,
  border: PropTypes.bool,
  sideContentGutter: PropTypes.bool,
};

export default InnerAppLayout;
