import { Col, Form, Input, InputNumber, message, Modal, Row } from "antd";
import { useEffect } from "react";

function ModalAdd({
  open,
  onCancel,
  onSubmit,
  loading,
  mode = "add",
  initialData,
}) {
  const [form] = Form.useForm();

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
      return;
    }

    form.resetFields();
  }, [open, mode, initialData, form]);

  const handleClose = () => {
    form.resetFields();
    onCancel();
  };

  const handleFinish = async (values) => {
    const payload = {
      sku: values.sku || null,
      size: values.size || null,
      color: values.color || null,
      quantity: values.quantity,
      price: values.price,
    };

    const result = await onSubmit(payload);

    if (result?.success) {
      message.success(
        mode === "edit"
          ? "Variant updated successfully"
          : "Variant created successfully",
      );
      form.resetFields();
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
      </Form>
    </Modal>
  );
}

export default ModalAdd;
