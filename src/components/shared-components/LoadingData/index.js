
import { Avatar, List, Skeleton} from "antd";
import React from "react";
const listData = Array.from({
  length: 2,
}).map((_, i) => ({
  href: "https://ant.design",
  title: `ant design part ${i + 1}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));


const LoadingData = ({hasAvatar}) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={listData}
      renderItem={(item) => (
        <List.Item key={item.title}>
          <Skeleton  active avatar>
            <List.Item.Meta
              avatar={ hasAvatar? <Avatar src={item.avatar} /> : null}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default LoadingData;
