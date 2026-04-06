import { Form, Input, InputNumber, message, Modal, Select, Space } from "antd";
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
        name: initialData.name || "",
        description: initialData.description || "",
        parent_id: initialData.parent_id ?? null,
        image_url: initialData.image_url || "",
        is_visible: Number(initialData.is_visible ?? 1),
        sort_order: initialData.sort_order ?? 0,
      });
      return;
    }

    form.setFieldsValue({
      name: "",
      description: "",
      parent_id: null,
      image_url: "",
      is_visible: 1,
      sort_order: 0,
    });
  }, [open, mode, initialData, form]);

  const handleClose = () => {
    form.resetFields();
    onCancel();
  };

  const handleFinish = async (values) => {
    const payload = {
      name: values.name,
      description: values.description || "N/A",
      parent_id: values.parent_id ?? null,
      image_url: values.image_url || "N/A",
      is_visible: values.is_visible,
      sort_order: values.sort_order,
    };

    const result = await onSubmit(payload);

    if (result?.success) {
      message.success(
        mode === "edit"
          ? "Category updated successfully"
          : "Category created successfully",
      );
      form.resetFields();
      return;
    }

    message.error(
      result?.message ||
        (mode === "edit"
          ? "Failed to update category"
          : "Failed to create category"),
    );
  };

  return (
    <Modal
      title={mode === "edit" ? "Edit Category" : "Add Category"}
      open={open}
      onCancel={handleClose}
      onOk={() => form.submit()}
      okText={mode === "edit" ? "Update" : "Create"}
      confirmLoading={loading}
      closable={false}
      maskClosable={false}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter category name" }]}
        >
          <Input placeholder="Category name" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} placeholder="Description" />
        </Form.Item>

        <Space style={{ display: "flex", width: "100%" }}>
          <Form.Item label="Parent ID" name="parent_id" style={{ flex: 1 }}>
            <InputNumber
              style={{ width: "100%" }}
              min={1}
              placeholder="Parent category id"
            />
          </Form.Item>

          <Form.Item
            label="Sort Order"
            name="sort_order"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "Please enter sort order" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="Sort order"
            />
          </Form.Item>
        </Space>

        <Form.Item label="Image URL" name="image_url">
          <Input placeholder="https://example.com/image.jpg" />
        </Form.Item>

        <Form.Item
          label="Visibility"
          name="is_visible"
          rules={[{ required: true, message: "Please select visibility" }]}
        >
          <Select
            options={[
              { value: 1, label: "Visible" },
              { value: 0, label: "Hidden" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalAdd;
