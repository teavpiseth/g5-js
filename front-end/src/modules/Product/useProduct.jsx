import { useState } from "react";
import { apiUrl } from "../../helper/const";
import HttpRequest from "../../service/HttpRequest";

const useProduct = () => {
  const [loading, setLoading] = useState(false);
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
  ];

  const handleOnSubmit = async (values) => {
    //void function
    setLoading(true);
    try {
      await HttpRequest.post(`${apiUrl}api/products`, values);
      console.log("handleOnSubmit", values);
    } catch (error) {
      console.error("Failed to submit product:", error);
    } finally {
      setLoading(false);
      setModel((prev) => ({ ...prev, add: false }));
    }
  };
  return {
    columns,
    loading,
    setLoading,
    model,
    setModel,
    handleOnSubmit,
  };
};

export default useProduct;
