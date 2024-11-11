import { Breadcrumb } from "antd";
import { useLocation, Link } from "react-router-dom";
import { t } from "i18next";

const CustomBreadCrumb = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  // console.log(location,'my location');
  const capitalizedSnippets = pathSnippets.map((snippet) => {
    return snippet.charAt(0).toUpperCase() + snippet.slice(1);
  });

  const breadcrumbItems = capitalizedSnippets.map((snippet, index) => {
    const url = `/${capitalizedSnippets.slice(0, index + 1).join("/")}`;
    const isLast = index === capitalizedSnippets.length - 1;

    return (
      <Breadcrumb.Item key={index}>
        {isLast ? (
          snippet
        ) : (
          <Link to={url}>
            {snippet.toLowerCase() === "app" ? t("home") : snippet}
          </Link>
        )}
      </Breadcrumb.Item>
    );
  });

  return <Breadcrumb className="mx-4 ">{breadcrumbItems}</Breadcrumb>;
};

export default CustomBreadCrumb;
