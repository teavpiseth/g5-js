import { Button, Popconfirm, Space, Tag } from "antd";
import { useCallback, useEffect, useState } from "react";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";

const CATEGORY_API_URL = "http://localhost:3033/api/categories";

function useCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [model, setModel] = useState({
    add: false,
    editData: null,
    edit: false,
    delete: false,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (_, __, i) => i + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (value) => value || "-",
    },
    {
      title: "Parent ID",
      dataIndex: "parent_id",
      key: "parent_id",
      render: (value) =>
        categories.find((cat) => cat.id === value)?.name || "Null",
      width: 120,
    },
    {
      title: "Sort Order",
      dataIndex: "sort_order",
      key: "sort_order",
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "is_visible",
      key: "is_visible",
      width: 120,
      render: (value) => (
        <Tag color={value ? "green" : "red"}>
          {value ? "Visible" : "Hidden"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 260,
      render: (_, record) => (
        <Space>
          <Button
            className="bg-primary"
            type="primary"
            icon={<MdModeEditOutline />}
            onClick={() =>
              setModel((prev) => ({
                ...prev,
                edit: true,
                editData: record,
              }))
            }
          ></Button>

          <Popconfirm
            title="Delete category"
            description="Are you sure to delete this category?"
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true, loading: deletingId === record.id }}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              danger
              icon={<MdDeleteOutline />}
              loading={deletingId === record.id}
            ></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(CATEGORY_API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const result = await response.json();
      setCategories(Array.isArray(result.data) ? result.data : []);
    } catch (fetchError) {
      setError(fetchError.message || "Unable to load categories");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // component did mount
    fetchCategories();
  }, [fetchCategories]);

  const createCategory = useCallback(
    async (payload) => {
      setCreating(true);
      try {
        const response = await fetch(CATEGORY_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to create category");
        }

        await fetchCategories();
        setModel((prev) => ({ ...prev, add: false }));
        return { success: true };
      } catch (createError) {
        return {
          success: false,
          message: createError.message || "Unable to create category",
        };
      } finally {
        setCreating(false);
      }
    },
    [fetchCategories],
  );

  const updateCategory = useCallback(
    async (payload) => {
      if (!model.editData?.id) {
        return { success: false, message: "Category id is missing" };
      }

      setUpdating(true);

      try {
        const response = await fetch(
          `${CATEGORY_API_URL}/${model.editData.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...payload,
              parent_id:
                payload.parent_id === null || payload.parent_id === undefined
                  ? null
                  : String(payload.parent_id),
            }),
          },
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to update category");
        }

        await fetchCategories();
        setModel((prev) => ({ ...prev, edit: false, editData: null }));
        return { success: true };
      } catch (updateError) {
        return {
          success: false,
          message: updateError.message || "Unable to update category",
        };
      } finally {
        setUpdating(false);
      }
    },
    [fetchCategories, model.editData?.id],
  );

  const handleDelete = useCallback(
    async (id) => {
      setDeletingId(id);
      try {
        const response = await fetch(`${CATEGORY_API_URL}/${id}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to delete category");
        }

        await fetchCategories();
        return { success: true };
      } catch (deleteError) {
        setError(deleteError.message || "Unable to delete category");
        return {
          success: false,
          message: deleteError.message || "Unable to delete category",
        };
      } finally {
        setDeletingId(null);
      }
    },
    [fetchCategories],
  );

  return {
    categories,
    loading,
    creating,
    updating,
    error,
    columns,
    refetch: fetchCategories,
    model,
    setModel,
    createCategory,
    updateCategory,
    handleDelete,
    deletingId,
  };
}

export default useCategory;
