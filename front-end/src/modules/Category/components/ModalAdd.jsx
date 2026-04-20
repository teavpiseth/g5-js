import {
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  TreeSelect,
} from "antd";
import { useEffect } from "react";

const mockCategory = [
  {
    id: 14,
    name: "pants 02",
    slug: null,
    description: "N/A",
    parent_id: 1,
    image_url: "N/A",
    is_visible: 0,
    sort_order: 0,
    created_at: "2026-04-07T14:52:01.000Z",
    updated_at: "2026-04-07T14:57:46.000Z",
  },
  {
    id: 13,
    name: "pants",
    slug: null,
    description: "N/A",
    parent_id: 1,
    image_url:
      "https://media.wired.com/photos/611c5312798f0e2c853b702f/4:3/w_1375,h_1031,c_limit/Gear-Cargo-Pants-are-Back-1302952122.jpg",
    is_visible: 1,
    sort_order: 0,
    created_at: "2026-04-06T14:33:42.000Z",
    updated_at: "2026-04-06T14:33:42.000Z",
  },
  {
    id: 12,
    name: "T-shirt",
    slug: null,
    description: "N/A",
    parent_id: 1,
    image_url:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop",
    is_visible: 1,
    sort_order: 1,
    created_at: "2026-04-01T14:32:38.000Z",
    updated_at: "2026-04-06T15:01:52.000Z",
  },
  {
    id: 11,
    name: "TV",
    slug: null,
    description: "All TV items including",
    parent_id: null,
    image_url:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop",
    is_visible: 1,
    sort_order: 1,
    created_at: "2026-04-01T14:17:49.000Z",
    updated_at: "2026-04-01T14:17:49.000Z",
  },
  {
    id: 10,
    name: "Running Shoes",
    slug: null,
    description: "Professional running and athletic footwear",
    parent_id: 4,
    image_url:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=300&fit=crop",
    is_visible: 1,
    sort_order: 1,
    created_at: "2026-03-24T14:23:36.000Z",
    updated_at: "2026-03-24T14:23:36.000Z",
  },
  {
    id: 9,
    name: "Laptops",
    slug: null,
    description: "Computers and laptops for work and gaming",
    parent_id: 2,
    image_url:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop",
    is_visible: 1,
    sort_order: 2,
    created_at: "2026-03-24T14:23:36.000Z",
    updated_at: "2026-03-24T14:23:36.000Z",
  },
  {
    id: 8,
    name: "Smartphones",
    slug: null,
    description: "Latest smartphones and mobile devices",
    parent_id: 2,
    image_url:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=300&fit=crop",
    is_visible: 1,
    sort_order: 1,
    created_at: "2026-03-24T14:23:36.000Z",
    updated_at: "2026-03-24T14:23:36.000Z",
  },
  {
    id: 5,
    name: "T-Shirts",
    slug: null,
    description: "Casual and formal t-shirts for all occasions",
    parent_id: 1,
    image_url:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=300&fit=crop",
    is_visible: 1,
    sort_order: 1,
    created_at: "2026-03-24T14:23:36.000Z",
    updated_at: "2026-03-24T14:23:36.000Z",
  },
  {
    id: 4,
    name: "Sports & Fitness",
    slug: null,
    description: "Sports equipment, fitness gear, and athletic wear",
    parent_id: null,
    image_url:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
    is_visible: 1,
    sort_order: 4,
    created_at: "2026-03-24T14:23:36.000Z",
    updated_at: "2026-03-24T14:23:36.000Z",
  },
  {
    id: 3,
    name: "Home & Garden",
    slug: null,
    description: "Home improvement, furniture, and garden supplies",
    parent_id: null,
    image_url:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop",
    is_visible: 1,
    sort_order: 3,
    created_at: "2026-03-24T14:23:36.000Z",
    updated_at: "2026-03-24T14:23:36.000Z",
  },
  {
    id: 2,
    name: "Electronics",
    slug: null,
    description: "Electronic devices, gadgets and tech accessories",
    parent_id: null,
    image_url:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=300&fit=crop",
    is_visible: 1,
    sort_order: 2,
    created_at: "2026-03-24T14:23:36.000Z",
    updated_at: "2026-03-24T14:23:36.000Z",
  },
  {
    id: 1,
    name: "Clothing 2",
    slug: null,
    description:
      "All clothing items including shirts, pants, dresses and accessories 1",
    parent_id: null,
    image_url:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop",
    is_visible: 1,
    sort_order: 1,
    created_at: "2026-03-24T14:23:36.000Z",
    updated_at: "2026-03-31T14:55:13.000Z",
  },
];

const dataForUI = [
  {
    value: "parent 1",
    title: "parent 1",
    children: [
      {
        value: "parent 1-0",
        title: "parent 1-0",
        children: [
          {
            value: "leaf1",
            title: "leaf1",
          },
          {
            value: "leaf2",
            title: "leaf2",
          },
          {
            value: "leaf3",
            title: "leaf3",
          },
          {
            value: "leaf4",
            title: "leaf4",
          },
          {
            value: "leaf5",
            title: "leaf5",
          },
          {
            value: "leaf6",
            title: "leaf6",
          },
        ],
      },
      {
        value: "parent 1-1",
        title: "parent 1-1",
        children: [
          {
            value: "leaf11",
            title: <b style={{ color: "#08c" }}>leaf11</b>,
          },
        ],
      },
    ],
  },
];

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

  const getTreeData = (categories, parentId = null) => {
    // [] = 10; filter 5
    return categories
      .filter((obj) => obj.parent_id === parentId)
      .map((obj) => {
        return {
          value: obj.id,
          title: obj.name,
          children: getTreeData(categories, obj.id),
        };
      });
  };

  const treeData = getTreeData(category);

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

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Parent ID" name="parent_id" style={{ flex: 1 }}>
              {/* <Select
                allowClear
                showSearch={{
                  filterOption: (input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase()),
                }}
                options={category.map((cat) => ({
                  value: cat.id,
                  label: cat.name,
                }))}
                placeholder="Select parent category"
              /> */}
              <TreeSelect
                showSearch
                style={{ width: "100%" }}
                styles={{
                  popup: {
                    root: { maxHeight: 400, overflow: "auto" },
                  },
                }}
                placeholder="Please select"
                allowClear
                treeData={treeData}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
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
          </Col>
        </Row>

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
