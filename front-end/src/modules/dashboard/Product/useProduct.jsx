import { Button, Popconfirm, Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../../helper/const";
import HttpRequest from "../../../service/HttpRequest";

const PRODUCT_API_URL = `${apiUrl}api/products`;

const useProduct = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [model, setModel] = useState({
    add: false,
    editData: null,
    edit: false,
    delete: false,
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await HttpRequest.get(PRODUCT_API_URL);
      setProductList(Array.isArray(response.data) ? response.data : []);
      return response;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProductList([]);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      setDeletingId(id);
      try {
        await HttpRequest.delete(`${PRODUCT_API_URL}/${id}`);
        await fetchProducts();
        return { success: true };
      } catch (deleteError) {
        console.error("Failed to delete product:", deleteError);
        return {
          success: false,
          message: deleteError.message || "Unable to delete product",
        };
      } finally {
        setDeletingId(null);
      }
    },
    [fetchProducts],
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Variant",
      dataIndex: "variant",
      key: "variant",
      render: (_, record) => {
        return (
          <Button onClick={() => navigate("variants/" + record.id)}>
            Update Variant
          </Button>
        );
      },
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

  const handleOnSubmit = async (values) => {
    setLoading(true);
    try {
      let result = null;
      if (model.edit) {
        result = await HttpRequest.put(
          `${PRODUCT_API_URL}/${values.id}`,
          values,
        );
      } else {
        result = await HttpRequest.post(PRODUCT_API_URL, values);
      }

      await fetchProducts();

      return result;
    } catch (error) {
      console.error("Failed to submit product:", error);
    } finally {
      setLoading(false);
      setModel((prev) => ({
        ...prev,
        add: false,
        edit: false,
        editData: null,
      }));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    columns,
    loading,
    setLoading,
    model,
    setModel,
    handleOnSubmit,
    handleDelete,
    productList,
  };
};

export default useProduct;
