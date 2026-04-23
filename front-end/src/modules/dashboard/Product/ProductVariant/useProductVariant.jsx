import { Button, Popconfirm, Space, Tag } from "antd";
import { useCallback, useEffect, useState } from "react";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { apiUrl } from "../../../../helper/const";
import HttpRequest from "../../../../service/HttpRequest";

const variantApiUrl = (productId) =>
  `${apiUrl}api/products/${productId}/variants`;

function useProductVariant(productId) {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [model, setModel] = useState({
    add: false,
    edit: false,
    editData: null,
  });

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "index",
      width: 60,
      render: (_, __, i) => i + 1,
    },
    { title: "SKU", dataIndex: "sku", key: "sku", render: (v) => v || "-" },
    { title: "Size", dataIndex: "size", key: "size", render: (v) => v || "-" },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (v) =>
        v ? (
          <Space>
            <span
              style={{
                display: "inline-block",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: v,
                border: "1px solid #ccc",
              }}
            />
            {v}
          </Space>
        ) : (
          "-"
        ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (v) => <Tag color={v > 0 ? "green" : "red"}>{v}</Tag>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (v) => `$${Number(v).toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<MdModeEditOutline />}
            onClick={() =>
              setModel((prev) => ({ ...prev, edit: true, editData: record }))
            }
          />
          <Popconfirm
            title="Delete variant"
            description="Are you sure to delete this variant?"
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true, loading: deletingId === record.id }}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              danger
              icon={<MdDeleteOutline />}
              loading={deletingId === record.id}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchVariants = useCallback(async () => {
    if (!productId) return;
    setLoading(true);
    setError("");
    try {
      const response = await HttpRequest.get(variantApiUrl(productId));
      setVariants(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err.message || "Unable to load variants");
      setVariants([]);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchVariants();
  }, [fetchVariants]);

  const createVariant = useCallback(
    async (payload) => {
      setCreating(true);
      try {
        await HttpRequest.post(variantApiUrl(productId), payload);
        await fetchVariants();
        setModel((prev) => ({ ...prev, add: false }));
        return { success: true };
      } catch (err) {
        return {
          success: false,
          message: err.message || "Unable to create variant",
        };
      } finally {
        setCreating(false);
      }
    },
    [productId, fetchVariants],
  );

  const updateVariant = useCallback(
    async (payload) => {
      if (!model.editData?.id)
        return { success: false, message: "Variant id is missing" };
      setUpdating(true);
      try {
        await HttpRequest.put(
          `${variantApiUrl(productId)}/${model.editData.id}`,
          payload,
        );
        await fetchVariants();
        setModel((prev) => ({ ...prev, edit: false, editData: null }));
        return { success: true };
      } catch (err) {
        return {
          success: false,
          message: err.message || "Unable to update variant",
        };
      } finally {
        setUpdating(false);
      }
    },
    [productId, fetchVariants, model.editData?.id],
  );

  const handleDelete = useCallback(
    async (id) => {
      setDeletingId(id);
      try {
        await HttpRequest.delete(`${variantApiUrl(productId)}/${id}`);
        await fetchVariants();
        return { success: true };
      } catch (err) {
        setError(err.message || "Unable to delete variant");
        return { success: false, message: err.message };
      } finally {
        setDeletingId(null);
      }
    },
    [productId, fetchVariants],
  );

  return {
    variants,
    loading,
    creating,
    updating,
    error,
    columns,
    refetch: fetchVariants,
    model,
    setModel,
    createVariant,
    updateVariant,
    handleDelete,
    deletingId,
  };
}

export default useProductVariant;
