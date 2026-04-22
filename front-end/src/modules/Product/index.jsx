import { PlusOutlined } from "@ant-design/icons";
import { Button, Table, Typography } from "antd";
import ModalAdd from "./components/ModalAdd";
import useProduct from "./useProduct";

function Product() {
  const { columns, loading, model, setModel, handleOnSubmit } = useProduct();
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <Typography.Title level={3} style={{ margin: 0 }}>
          Product Table
        </Typography.Title>
        <Button
          className="bg-primary"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModel((prev) => ({ ...prev, add: true }))}
        >
          Add
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={[]}
        loading={loading}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 900 }}
      />
      {model.add && (
        <ModalAdd
          open={model.add}
          loading={loading}
          category={[]}
          onCancel={() => setModel((prev) => ({ ...prev, add: false }))}
          onSubmit={handleOnSubmit}
          mode="add"
        />
      )}
    </div>
  );
}

export default Product;
