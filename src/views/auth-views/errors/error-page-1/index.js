import React from 'react'
import { Button, Row, Col } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {t} from "i18next"

const ErrorOne = () => {
	const theme = useSelector(state => state.theme.currentTheme)
	return (
		<div className={`h-100 ${theme === 'light' ? 'bg-white' : ''}`}>
			<div className="container-fluid d-flex flex-column justify-content-between h-100 px-md-4 pb-md-4 pt-md-1">
				
				<div className="container" style={{padding:"10px"}} >
					<Row align="middle">
						<Col xs={24} sm={24} md={24} lg={24}>
							<h1 style={{textAlign:"center"}} className="font-weight-bold mb-4 display-4">{t("Access forbidden")}</h1>
							<p style={{textAlign:"center"}} className="font-size-md mb-4">{t("You dont seem to have the authorization to access this section of the application.")}</p>
							<Link to='/app'>
								<Button type="primary" icon={<ArrowLeftOutlined />}>{t("back")}</Button>
							</Link>
						</Col>
						<Col xs={24} sm={24} md={24} lg={24} className="text-center">
							<img className="img-fluid mt-md-0 mt-4"  src="/img/others/img-403.png" alt="" />
						</Col>
					</Row>
				</div>
				
			</div>
		</div>
	)
}

export default ErrorOne
