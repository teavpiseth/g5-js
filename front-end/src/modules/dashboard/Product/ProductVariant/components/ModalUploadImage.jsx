import { PlusOutlined } from "@ant-design/icons";
import { Form, Image, message, Modal, Spin, Upload } from "antd";
import { useEffect, useState } from "react";
import { apiUrl } from "../../../../../helper/const";

function ModalUploadImage({
  open,
  onCancel,
  onSubmit,
  loading,
  variant,
  onGetExistingImages,
  loadingImages,
}) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const buildImageUrl = (imageUrl) => {
    if (!imageUrl) return "";
    if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
    if (!apiUrl) return imageUrl;

    const base = apiUrl.endsWith("/") ? apiUrl : `//`;
    const normalizedPath = imageUrl.replace(/^\/+/, "");
    return `${base}${normalizedPath}`;
  };

  useEffect(() => {
    const fetchExistingImages = async () => {
      if (!open || !variant?.id) {
        setExistingImages([]);
        return;
      }

      const result = await onGetExistingImages(variant.id);
      if (result?.success) {
        setExistingImages(result.data || []);
      } else {
        setExistingImages([]);
      }
    };

    fetchExistingImages();
  }, [open, variant?.id, onGetExistingImages]);

  const handleClose = () => {
    form.resetFields();
    setFileList([]);
    onCancel();
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    const nextFileList = newFileList.slice(0, 10);
    setFileList(nextFileList);
    form.setFieldValue("images", nextFileList);
  };

  const handleFinish = async () => {
    const imageFiles = fileList
      .map((item) => item.originFileObj)
      .filter(Boolean);

    const result = await onSubmit(imageFiles);
    if (result?.success) {
      message.success("Variant images uploaded successfully");
      form.resetFields();
      setFileList([]);
      return;
    }

    message.error(result?.message || "Failed to upload variant images");
  };

  return (
    <Modal
      title={`Upload Images${variant?.sku ? ` - ${variant.sku}` : ""}`}
      open={open}
      onCancel={handleClose}
      onOk={() => form.submit()}
      okText="Upload"
      confirmLoading={loading}
      closable={false}
      maskClosable={false}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Existing Images in DB">
          {loadingImages ? (
            <Spin />
          ) : existingImages.length > 0 ? (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {existingImages.map((image) => (
                <Image
                  key={image.id}
                  width={84}
                  height={84}
                  src={buildImageUrl(image.image_url)}
                  alt={image.alt_text || `variant-image-${image.id}`}
                  style={{ objectFit: "cover", borderRadius: 8 }}
                />
              ))}
            </div>
          ) : (
            <span style={{ color: "#8c8c8c" }}>No images found</span>
          )}
        </Form.Item>

        <Form.Item
          label="Variant Images"
          name="images"
          required
          rules={[
            {
              validator: (_, value) => {
                if (Array.isArray(value) && value.length > 0) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Please upload at least one image"),
                );
              },
            },
          ]}
          extra="You can upload up to 10 images (JPG, PNG, GIF)"
        >
          <Upload
            listType="picture-card"
            multiple
            limit={10}
            accept="image/png,image/jpeg,image/gif"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleUploadChange}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalUploadImage;
