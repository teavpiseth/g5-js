import { PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Space, Table, Typography } from "antd";
import ModalAdd from "./components/ModalAdd";
import useCustomer from "./useCustomer";

function Customer() {
  const {
    customers,
    loading,
    creating,
    updating,
    error,
    columns,
    refetch,
    model,
    setModel,
    createCustomer,
    updateCustomer,
  } = useCustomer();

  const dataSource = customers.map((customer) => ({
    key: customer.id,
    ...customer,
  }));

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <div className="flex items-center justify-between gap-3">
        <Typography.Title level={3} style={{ margin: 0 }}>
          Customer Table
        </Typography.Title>
        <Button
          className="bg-primary"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModel((prev) => ({ ...prev, add: true }))}
        >
          Add
        </Button>
        <Button onClick={refetch} loading={loading}>
          Refresh
        </Button>
      </div>

      {error ? (
        <Alert
          type="error"
          showIcon
          message="Failed to load customers"
          description={error}
        />
      ) : null}

      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 900 }}
      />

      {model.add && (
        <ModalAdd
          open={model.add}
          loading={creating}
          onCancel={() => setModel((prev) => ({ ...prev, add: false }))}
          onSubmit={createCustomer}
          mode="add"
        />
      )}

      {model.edit && (
        <ModalAdd
          open={model.edit}
          loading={updating}
          initialData={model.editData}
          onCancel={() =>
            setModel((prev) => ({ ...prev, edit: false, editData: null }))
          }
          onSubmit={updateCustomer}
          mode="edit"
        />
      )}
    </Space>
  );
}

export default Customer;
