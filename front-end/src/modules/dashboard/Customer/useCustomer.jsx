import { Button, Popconfirm, Space, Tag } from "antd";
import { useCallback, useEffect, useState } from "react";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import HttpRequest from "../../../service/HttpRequest";

const CUSTOMER_API_URL = `/api/customers`;

function useCustomer() {
  const [customers, setCustomers] = useState([]);
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

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await HttpRequest.get(CUSTOMER_API_URL);
      if (response.data) {
        setCustomers(Array.isArray(response.data) ? response.data : []);
      }
    } catch (fetchError) {
      setError(fetchError.message || "Unable to load customers");
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const createCustomer = useCallback(
    async (payload) => {
      setCreating(true);
      try {
        await HttpRequest.post(CUSTOMER_API_URL, payload);
        await fetchCustomers();
        setModel((prev) => ({ ...prev, add: false }));
        return { success: true };
      } catch (createError) {
        return {
          success: false,
          message: createError.message || "Unable to create customer",
        };
      } finally {
        setCreating(false);
      }
    },
    [fetchCustomers],
  );

  const updateCustomer = useCallback(
    async (payload) => {
      if (!model.editData?.id) {
        return { success: false, message: "Customer id is missing" };
      }

      setUpdating(true);

      try {
        await HttpRequest.put(
          `${CUSTOMER_API_URL}/${model.editData.id}`,
          payload,
        );
        await fetchCustomers();
        setModel((prev) => ({ ...prev, edit: false, editData: null }));
        return { success: true };
      } catch (updateError) {
        return {
          success: false,
          message: updateError.message || "Unable to update customer",
        };
      } finally {
        setUpdating(false);
      }
    },
    [fetchCustomers, model.editData?.id],
  );

  const handleDelete = useCallback(
    async (id) => {
      setDeletingId(id);
      try {
        await HttpRequest.delete(`${CUSTOMER_API_URL}/${id}`);
        await fetchCustomers();
        return { success: true };
      } catch (deleteError) {
        setError(deleteError.message || "Unable to delete customer");
        return {
          success: false,
          message: deleteError.message || "Unable to delete customer",
        };
      } finally {
        setDeletingId(null);
      }
    },
    [fetchCustomers],
  );

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "no",
      width: 70,
      render: (_, __, i) => i + 1,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      width: 120,
      render: (value) => (
        <Tag color={value ? "green" : "red"}>
          {value ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 200,
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
          />

          <Popconfirm
            title="Delete customer"
            description="Are you sure to delete this customer?"
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

  return {
    customers,
    loading,
    creating,
    updating,
    error,
    columns,
    refetch: fetchCustomers,
    model,
    setModel,
    createCustomer,
    updateCustomer,
    handleDelete,
    deletingId,
  };
}

export default useCustomer;
