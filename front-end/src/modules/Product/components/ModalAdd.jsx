import { Form, Input, InputNumber, message, Modal, Select } from "antd";
import { useEffect } from "react";

function ModalAdd({
  open,
  onCancel,
  onSubmit,
  loading,
  mode = "add",
  initialData,
  category,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      form.setFieldsValue({
        id: initialData.id ?? null,
        name: initialData.name || "",
        slug: initialData.slug || "",
        description: initialData.description || "",
        category_id: initialData.category_id ?? null,
        brand: initialData.brand || "",
        base_price: Number(initialData.base_price ?? 0),
        is_active: Number(initialData.is_active ?? 1),
      });

      return;
    }

    form.setFieldsValue({
      id: null,
      name: "",
      slug: "",
      description: "",
      category_id: null,
      brand: "",
      base_price: 0,
      is_active: 1,
    });
  }, [open, mode, initialData, form]);

  const handleClose = () => {
    form.resetFields();
    onCancel();
  };

  const handleFinish = async (values) => {
    const payload = {
      id: values.id ?? null,
      name: values.name,
      slug: values.slug,
      description: values.description || "",
      category_id: values.category_id ?? null,
      brand: values.brand || "",
      base_price: values.base_price,
      is_active: values.is_active,
    };

    const result = await onSubmit(payload);

    if (result?.success) {
      message.success(
        mode === "edit"
          ? "Product updated successfully"
          : "Product created successfully",
      );
      form.resetFields();
      return;
    }

    message.error(
      result?.message ||
        (mode === "edit"
          ? "Failed to update product"
          : "Failed to create product"),
    );
  };

  return (
    <Modal
      title={mode === "edit" ? "Edit Product" : "Add Product"}
      open={open}
      onCancel={handleClose}
      onOk={() => form.submit()}
      okText={mode === "edit" ? "Update" : "Create"}
      confirmLoading={loading}
      closable={false}
      maskClosable={false}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="ID" name="id">
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            precision={0}
            placeholder="Product ID (optional)"
          />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter product name" }]}
        >
          <Input placeholder="Product name" />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
          rules={[{ required: true, message: "Please enter product slug" }]}
        >
          <Input placeholder="product-slug" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} placeholder="Description" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category_id"
          rules={[{ required: true, message: "Please select category" }]}
        >
          <Select
            allowClear
            showSearch
            optionFilterProp="label"
            options={(category || []).map((cat) => ({
              value: cat.id,
              label: cat.name,
            }))}
            placeholder="Select category"
          />
        </Form.Item>

        <Form.Item label="Brand" name="brand">
          <Input placeholder="Brand name" />
        </Form.Item>

        <Form.Item
          label="Base Price"
          name="base_price"
          rules={[{ required: true, message: "Please enter base price" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            precision={2}
            step={0.01}
            placeholder="0.00"
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="is_active"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select
            options={[
              { value: 1, label: "Active" },
              { value: 0, label: "Inactive" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalAdd;
