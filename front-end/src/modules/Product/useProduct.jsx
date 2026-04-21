import { useState } from "react";

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
  return {
    columns,
    loading,
    setLoading,
    model,
    setModel,
  };
};

export default useProduct;
