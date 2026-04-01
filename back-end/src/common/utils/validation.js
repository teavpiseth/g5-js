const handleErrorDetail = (error) => {
  const errorDetails = error.details.map((err) => {
    return {
      message: err.message,
      field: err.context.label,
    };
  });

  return errorDetails;
};

module.exports = { handleErrorDetail };
