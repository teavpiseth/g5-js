import { Col, Form, Input, InputNumber, message, Modal, Row } from "antd";
import { useEffect, useState } from "react";

function ModalAdd({
  open,
  onCancel,
  onSubmit,
  loading,
  mode = "add",
  initialData,
}) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      form.setFieldsValue({
        sku: initialData.sku || "",
        size: initialData.size || "",
        color: initialData.color || "",
        quantity: initialData.quantity ?? 0,
        price: initialData.price ?? 0,
      });
      setFileList([]);
      return;
    }

    form.resetFields();
    setFileList([]);
  }, [open, mode, initialData, form]);

  const handleClose = () => {
    form.resetFields();
    setFileList([]);
    onCancel();
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    const nextFileList = newFileList.slice(0, 10);
    setFileList(nextFileList);
    form.setFieldValue("images", nextFileList);
  };

  const handleFinish = async (values) => {
    const payload = {
      sku: values.sku || null,
      size: values.size || null,
      color: values.color || null,
      quantity: values.quantity,
      price: values.price,
    };

    const imageFiles = fileList
      .map((item) => item.originFileObj)
      .filter(Boolean);

    const result = await onSubmit(payload, imageFiles);

    if (result?.success) {
      message.success(
        mode === "edit"
          ? "Variant updated successfully"
          : "Variant created successfully",
      );
      form.resetFields();
      setFileList([]);
      form.setFieldValue("images", []);
      return;
    }

    message.error(
      result?.message ||
        (mode === "edit"
          ? "Failed to update variant"
          : "Failed to create variant"),
    );
  };

  return (
    <Modal
      title={mode === "edit" ? "Edit Variant" : "Add Variant"}
      open={open}
      onCancel={handleClose}
      onOk={() => form.submit()}
      okText={mode === "edit" ? "Update" : "Create"}
      confirmLoading={loading}
      closable={false}
      maskClosable={false}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="SKU" name="sku">
          <Input placeholder="e.g. PROD-001-RED-M" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Size" name="size">
              <Input placeholder="e.g. S, M, L, XL" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Color" name="color">
              <Input placeholder="e.g. Red, #FF0000" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[{ required: true, message: "Please enter quantity" }]}
            >
              <InputNumber style={{ width: "100%" }} min={0} placeholder="0" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please enter price" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                step={0.01}
                placeholder="0.00"
                prefix="$"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* <Form.Item
          label="Variant Images"
          name="images"
          required
          rules={[
            {
              validator: (_, value) => {
                if (Array.isArray(value) && value.length > 0) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("Please upload at least one image"),
                );
              },
            },
          ]}
          extra="You can upload up to 10 images (JPG, PNG, GIF)"
        >
          <Upload
            listType="picture-card"
            multiple
            accept="image/png,image/jpeg,image/gif"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleUploadChange}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item> */}
      </Form>
    </Modal>
  );
}

export default ModalAdd;
