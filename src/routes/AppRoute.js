import React, { useEffect, useState } from "react";
import { onBlankLayout } from "store/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import ErrorOne from "views/auth-views/errors/error-page-1";
import Loading from "components/shared-components/Loading";

const AppRoute = ({
  component: Component,
  routeKey,
  blankLayout,
  requiredPrivilege,
  ...props
}) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const userPrivileges = user?.privileges;

  useEffect(() => {
    const isBlank = blankLayout ? true : false;
    dispatch(onBlankLayout(isBlank));
  }, [blankLayout]);

  const hasAccess =
    Array.isArray(requiredPrivilege) &&
    requiredPrivilege.some((requiredPrivilege) => {
      if (requiredPrivilege.toLowerCase().startsWith("User".toLowerCase())) {
        return true;
      }
      if (requiredPrivilege.toLowerCase().startsWith("Reports".toLowerCase())) {
        return true;
      }
      if (
        user?.roles === "MANAGER" &&
        requiredPrivilege.toLowerCase().startsWith("Users".toLowerCase())
      ) {
        return false;
      }
      const privilege = userPrivileges?.find((privilege) =>
        requiredPrivilege.toLowerCase().startsWith(privilege.id.toLowerCase())
      );
      //userPrivileges?.map(privilege =>console.log(privilege.id, requiredPrivilege,requiredPrivilege.toLowerCase().startsWith(privilege.id.toLowerCase()), privilege ));
      // console.log("before return",privilege?.hasAccess);
      return privilege && privilege?.hasAccess;
    });

  if (!token) {
    return <Component {...props} />;
  }
  // if (hasAccess === false) {
  //   if (user) {
  //     console.log("fugudtrjhgdjhdjkhd");
  //     return <ErrorOne />;
  //   } else {
  //     console.log("dzdzzf");
  //     return <Loading />;
  //   }
  // } else {
  //   return <Component {...props} />;
  // }

  if (user) {
    // console.log("fugudtrjhgdjhdjkhd");
    // return <ErrorOne />;
    return <Component {...props} />;
  } else {
    return <Loading />;
  }
};
export default AppRoute;
