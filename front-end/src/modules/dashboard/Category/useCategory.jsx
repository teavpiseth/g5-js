import { Button, Popconfirm, Space, Tag } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import HttpRequest from "../../../service/HttpRequest";

const CATEGORY_API_URL = `/api/categories`;

function useCategory() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
    total: 0,
  });
  const debounceTimer = useRef(null);
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

  const fetchCategories = useCallback(
    async ({ searchVal, page, pageSize } = {}) => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          search: searchVal ?? search,
          page: page ?? pagination.page,
          limit: pageSize ?? pagination.pageSize,
        });
        const response = await HttpRequest.get(`${CATEGORY_API_URL}?${params}`);
        if (response.data) {
          setCategories(Array.isArray(response.data) ? response.data : []);
          setPagination((prev) => ({
            ...prev,
            total: response.total ?? 0,
            page: page ?? prev.page,
            pageSize: pageSize ?? prev.pageSize,
          }));
        }
      } catch (fetchError) {
        setError(fetchError.message || "Unable to load categories");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Debounced search – reset to page 1
  const handleSearch = useCallback(
    (value) => {
      setSearch(value);
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        setPagination((prev) => ({ ...prev, page: 1 }));
        fetchCategories({ searchVal: value, page: 1 });
      }, 1500);
    },
    [fetchCategories],
  );

  const handleTableChange = useCallback(
    (pag) => {
      setPagination((prev) => ({
        ...prev,
        page: pag.current,
        pageSize: pag.pageSize,
      }));
      fetchCategories({ page: pag.current, pageSize: pag.pageSize });
    },
    [fetchCategories],
  );

  const createCategory = useCallback(
    async (payload) => {
      setCreating(true);
      try {
        await HttpRequest.post(CATEGORY_API_URL, payload);
        await fetchCategories({
          searchVal: search,
          page: pagination.page,
          pageSize: pagination.pageSize,
        });
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
    [fetchCategories, search, pagination.page, pagination.pageSize],
  );

  const updateCategory = useCallback(
    async (payload) => {
      if (!model.editData?.id) {
        return { success: false, message: "Category id is missing" };
      }

      setUpdating(true);

      try {
        await HttpRequest.put(
          `${CATEGORY_API_URL}/${model.editData.id}`,
          payload,
        );
        await fetchCategories({
          searchVal: search,
          page: pagination.page,
          pageSize: pagination.pageSize,
        });
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
    [
      fetchCategories,
      model.editData?.id,
      search,
      pagination.page,
      pagination.pageSize,
    ],
  );

  const handleDelete = useCallback(
    async (id) => {
      setDeletingId(id);
      try {
        await HttpRequest.delete(`${CATEGORY_API_URL}/${id}`);

        await fetchCategories({
          searchVal: search,
          page: pagination.page,
          pageSize: pagination.pageSize,
        });
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
    [fetchCategories, search, pagination.page, pagination.pageSize],
  );

  return {
    categories,
    search,
    setSearch: handleSearch,
    pagination,
    handleTableChange,
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
