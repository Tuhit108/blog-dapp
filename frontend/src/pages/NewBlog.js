import "./NewBlog.css";
import { useState } from "react";
import { getIPFS } from "../ultils/IPFS";
import { getContract, getOwnedAddr } from "../ultils/Contract";
import { Button, Form, Input, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";

// import { Buffer } from "buffer";

function NewBlog() {
    const navigate = useNavigate();

  const onFinish = (values) => {
    console.log(values);
  };

  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mode, setMode] = useState(false); //

  console.log("this is ", window.location.pathname.split("/")[1]);

  async function storeData(event) {
    // event.preventDefault();
    const data = {
      title: title,
      content: content,
      date: new Date(),
      author: await getOwnedAddr(),
    };

    console.log(data);
    const ipfsRes = await getIPFS().add(JSON.stringify(data));

    let uri = ipfsRes.path;
    console.log("mode: ", uri);
    const mint = await getContract().ownedMint(uri, mode);
    console.log("mint", mint);
    navigate(`/my-blogs`)
  }

  return (
    <div className="form-container">
      <Form
        {...layout}
        name="create-form"
        onFinish={storeData}
        style={{
          padding: "60px 0px",
          backgroundColor: "#f4f4f4",
          width: "60%",
          marginTop: "20px",
          borderRadius: 16,
        }}
        validateMessages={{ required: "${label} is required" }}
      >
        <Form.Item name={"title"} label="Title" rules={[{ required: true }]}>
          <Input allowClear onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>
        <Form.Item
          name={"content"}
          label="Content"
          rules={[{ required: true }]}
        >
          <Input.TextArea
            className="content-field"
            allowClear
            style={{ minHeight: 400 }}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="status-check"
          valuePropName="checked"
          wrapperCol={{ offset: 5 }}
        >
          <Checkbox onChange={(e) => setMode(e.target.checked)}>
            Public
          </Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button type="primary" htmlType="submit" style={{ width: 100 }}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default NewBlog;
