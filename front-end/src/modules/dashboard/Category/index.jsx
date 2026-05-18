import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Alert, Button, Input, Space, Table, Typography } from "antd";
import ModalAdd from "./components/ModalAdd";
import useCategory from "./useCategory";

function Category() {
  const {
    categories,
    loading,
    creating,
    updating,
    error,
    columns,
    refetch,
    model,
    setModel,
    createCategory,
    updateCategory,
    search,
    setSearch,
    pagination,
    handleTableChange,
  } = useCategory();

  const dataSource = categories.map((category) => ({
    key: category.id,
    ...category,
  }));

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <div className="flex items-center justify-between gap-3">
        <Typography.Title level={3} style={{ margin: 0 }}>
          Category Table
        </Typography.Title>
        <Input
          placeholder="Search by name..."
          prefix={<SearchOutlined />}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          allowClear
          style={{ maxWidth: 260 }}
        />
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
          message="Failed to load categories"
          description={error}
        />
      ) : null}

      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
        onChange={handleTableChange}
        scroll={{ x: 900 }}
      />
      {model.add && (
        <ModalAdd
          open={model.add}
          loading={creating}
          category={dataSource}
          onCancel={() => setModel((prev) => ({ ...prev, add: false }))}
          onSubmit={createCategory}
          mode="add"
        />
      )}

      {model.edit && (
        <ModalAdd
          open={model.edit}
          loading={updating}
          initialData={model.editData}
          category={dataSource}
          onCancel={() =>
            setModel((prev) => ({ ...prev, edit: false, editData: null }))
          }
          onSubmit={updateCategory}
          mode="edit"
        />
      )}
    </Space>
  );
}

export default Category;
