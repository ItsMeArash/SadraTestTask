import PropTypes from "prop-types";
import {
  Button,
  ColorPicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from "antd";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const UserNodeInput = ({ useStore }) => {
  const { nodes, setNodes } = useStore();

  const onFinish = (values) => {
    setNodes(values);
  };

  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        "color-picker": null,
      }}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Add node">
        <span className="ant-form-text">
          Enter node details to add to the graph
        </span>
      </Form.Item>

      <Form.Item
        name="nodeLabel"
        label="Node Label"
        rules={[
          {
            required: true,
            message: "label is required!",
          },
        ]}
      >
        <Input placeholder="Please input node label" />
      </Form.Item>

      <Form.Item
        name="select-multiple"
        label="Node Relations"
        rules={[
          {
            // required: true,
            message: "node relations are required!",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select node relations">
          {nodes.map((node) => (
            <Option
              key={node.nodeLabel.toLowerCase().replace(" ", "-")}
              value={node.nodeLabel.toLowerCase().replace(" ", "-")}
            >
              {node.nodeLabel}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Node Size"
        name="input-number"
        rules={[
          {
            required: true,
            message: "size is required!",
          },
        ]}
      >
        <InputNumber min={1} max={20} />
      </Form.Item>

      <Form.Item
        name="color-picker"
        label="Node Color"
        rules={[
          {
            required: true,
            message: "color is required!",
          },
        ]}
      >
        <ColorPicker />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="reset">reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

UserNodeInput.propTypes = {
  useStore: PropTypes.object.isRequired,
};

export default UserNodeInput;
