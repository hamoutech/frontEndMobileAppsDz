import React, { lazy, Suspense, memo } from "react"
import { useSelector } from "react-redux"
import Loading from "components/shared-components/Loading"
import Views from "views"
import { ConfigProvider } from "antd"

const AppLayout = lazy(() => import("./AppLayout"))
const AuthLayout = lazy(() => import("./AuthLayout"))

const Layouts = () => {
  const token = useSelector((state) => state.auth.token)
  const blankLayout = useSelector((state) => state.theme.blankLayout)
  const direction = useSelector((state) => state.theme.direction)

  const Layout = token && !blankLayout ? AppLayout : AuthLayout

  return (
    <ConfigProvider direction={direction}>
      <Suspense fallback={<Loading cover="content" />}>
        <Layout style={{ backgroundColor: "red" }}>
          <Views />
        </Layout>
      </Suspense>
    </ConfigProvider>
  )
}

export default memo(Layouts)
