import { PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Space, Table, Typography } from "antd";
import { useParams } from "react-router-dom";
import ModalAdd from "./components/ModalAdd";
import ModalUploadImage from "./components/ModalUploadImage";
import useProductVariant from "./useProductVariant";

function ProductVariant() {
  const { id: productId } = useParams();

  const {
    variants,
    loading,
    creating,
    updating,
    uploadingImages,
    loadingImages,
    error,
    columns,
    refetch,
    model,
    setModel,
    createVariant,
    updateVariant,
    uploadVariantImages,
    getVariantImages,
    deleteVariantImage,
  } = useProductVariant(productId);

  const dataSource = variants.map((v) => ({ key: v.id, ...v }));

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <div className="flex items-center justify-between gap-3">
        <Typography.Title level={3} style={{ margin: 0 }}>
          Product Variants{" "}
          <Typography.Text type="secondary" style={{ fontSize: 16 }}>
            (Product ID: {productId})
          </Typography.Text>
        </Typography.Title>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setModel((prev) => ({ ...prev, add: true }))}
          >
            Add Variant
          </Button>
          <Button onClick={refetch} loading={loading}>
            Refresh
          </Button>
        </Space>
      </div>

      {error ? (
        <Alert
          type="error"
          showIcon
          message="Failed to load variants"
          description={error}
        />
      ) : null}

      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 700 }}
      />

      {model.add && (
        <ModalAdd
          open={model.add}
          loading={creating}
          onCancel={() => setModel((prev) => ({ ...prev, add: false }))}
          onSubmit={createVariant}
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
          onSubmit={updateVariant}
          mode="edit"
        />
      )}

      {model.isUploadImages && (
        <ModalUploadImage
          open={model.isUploadImages}
          loading={uploadingImages}
          variant={model.editData}
          onGetExistingImages={getVariantImages}
          loadingImages={loadingImages}
          onDeleteImage={deleteVariantImage}
          onCancel={() =>
            setModel((prev) => ({
              ...prev,
              isUploadImages: false,
              editData: null,
            }))
          }
          onSubmit={uploadVariantImages}
        />
      )}
    </Space>
  );
}

export default ProductVariant;
