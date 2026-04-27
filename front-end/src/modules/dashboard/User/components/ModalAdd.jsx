import { Form, Input, message, Modal, Select } from "antd";
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
        username: initialData.username || "",
        email: initialData.email || "",
        password: "",
        is_active: Number(initialData.is_active ?? 1),
      });
      return;
    }

    form.setFieldsValue({
      username: "",
      email: "",
      password: "",
      is_active: 1,
    });
  }, [open, mode, initialData, form]);

  const handleClose = () => {
    form.resetFields();
    onCancel();
  };

  const handleFinish = async (values) => {
    const payload = {
      username: values.username,
      email: values.email,
      password: values.password || "",
      is_active: values.is_active,
    };

    const result = await onSubmit(payload);

    if (result?.success) {
      message.success(
        mode === "edit"
          ? "User updated successfully"
          : "User created successfully",
      );
      form.resetFields();
      return;
    }

    message.error(
      result?.message ||
        (mode === "edit" ? "Failed to update user" : "Failed to create user"),
    );
  };

  return (
    <Modal
      title={mode === "edit" ? "Edit User" : "Add User"}
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
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter username" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="example@mail.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={
            mode === "add"
              ? [{ required: true, message: "Please enter password" }]
              : []
          }
          extra={mode === "edit" ? "Leave blank to keep current password" : ""}
        >
          <Input.Password placeholder="Password" />
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
