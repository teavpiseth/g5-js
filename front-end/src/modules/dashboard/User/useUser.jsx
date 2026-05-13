import { Button, Popconfirm, Space, Tag } from "antd";
import { useCallback, useEffect, useState } from "react";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import HttpRequest from "../../../service/HttpRequest";

const USER_API_URL = `/api/users`;

function useUser() {
  const [users, setUsers] = useState([]);
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

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await HttpRequest.get(USER_API_URL);
      console.log("user----", response);
      if (response.data) {
        setUsers(Array.isArray(response.data) ? response.data : []);
      }
    } catch (fetchError) {
      setError(fetchError.message || "Unable to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const createUser = useCallback(
    async (payload) => {
      setCreating(true);
      try {
        await HttpRequest.post(USER_API_URL, payload);
        await fetchUsers();
        setModel((prev) => ({ ...prev, add: false }));
        return { success: true };
      } catch (createError) {
        return {
          success: false,
          message: createError.message || "Unable to create user",
        };
      } finally {
        setCreating(false);
      }
    },
    [fetchUsers],
  );

  const updateUser = useCallback(
    async (payload) => {
      if (!model.editData?.id) {
        return { success: false, message: "User id is missing" };
      }

      setUpdating(true);

      try {
        await HttpRequest.put(`${USER_API_URL}/${model.editData.id}`, payload);
        await fetchUsers();
        setModel((prev) => ({ ...prev, edit: false, editData: null }));
        return { success: true };
      } catch (updateError) {
        return {
          success: false,
          message: updateError.message || "Unable to update user",
        };
      } finally {
        setUpdating(false);
      }
    },
    [fetchUsers, model.editData?.id],
  );

  const handleDelete = useCallback(
    async (id) => {
      setDeletingId(id);
      try {
        await HttpRequest.delete(`${USER_API_URL}/${id}`);
        await fetchUsers();
        return { success: true };
      } catch (deleteError) {
        setError(deleteError.message || "Unable to delete user");
        return {
          success: false,
          message: deleteError.message || "Unable to delete user",
        };
      } finally {
        setDeletingId(null);
      }
    },
    [fetchUsers],
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
      title: "Username",
      dataIndex: "username",
      key: "username",
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
            title="Delete user"
            description="Are you sure to delete this user?"
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
    users,
    loading,
    creating,
    updating,
    error,
    columns,
    refetch: fetchUsers,
    model,
    setModel,
    createUser,
    updateUser,
    handleDelete,
    deletingId,
  };
}

export default useUser;
