import React from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  message,
  DatePicker,
  Select,
  Radio,
  InputNumber,
  Checkbox,
  Divider,
  Space,
} from "antd";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

import { rules } from "./stafFieldsRules";


const StafInfosForm = (props) => {
  const dateFormat = "YYYY-MM-DD";
  const { t } = useTranslation();
  const { mode } = props;

  const imageUploadProps = {
    name: "file",
    multiple: false,
    listType: "picture",
    showUploadList: true,
  };

  return (
    <div>
      <Row gutter={16} align="middle">
        <Col span={24}>
          <Card title={t("Personal infomation")}>
            <Divider className="m-0 mb-4" />
            <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
                
                  <Form.Item
                    name="fullName"
                    label={t("fullName")}
                    rules={rules.fullName}
                  >
                    <Input />
                  </Form.Item>
               
                 
                  
    
             
             
              </Col>
             
              <Col xs={24} sm={24} md={12}>
                
              
                
               
             
             
                <Form.Item
                  name="numberPhone"
                  label={t(
                    "staff.addAndModify.step1.PersonnalInfoCard.phoneNumber.label"
                  )}
                  rules={rules.phoneNumber}
                >
                  <InputNumber  style={{ width: "100%" }} />
                </Form.Item>
             
           
            
             
              
                

               </Col>
               <Col xs={24} sm={24} md={12}>
               <Form.Item
                name="email"
                label={t("Email")}
                rules={rules.email}
                hasFeedback
              >
                   <Input  />
               </Form.Item> 
               </Col>
               <Col xs={24} sm={24} md={12}>
               <Form.Item
                    name="job"
                    label={t("Job")}
                    rules={rules.position}
                  >
                    <Input />
                </Form.Item>

                
             
        
              </Col>
              <Col span={24}>
                <Form.Item
                  label={t(
                    "staff.type"
                  )}
                  name="type"
                  // rules={[
                  //   required= true,
                  //   message= t("birthdate required",
                  // ]}
                 
                >
                  <Select
                    allowClear
                    options={[
                      {
                        value: "Staff technique",
                        label: "Staff technique"
                      },
                      {
                        value: "Staff médical",
                        label: "Staff médical",
                      },
                    
                     
                    ]}
                  />
                </Form.Item>
              </Col>

            </Row>
            
          </Card>
        </Col>
     
      </Row>
    </div>
  );
};

export default StafInfosForm;
