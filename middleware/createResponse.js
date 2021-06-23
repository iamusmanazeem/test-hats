module.exports.createSuccessResponse = function (responseData) {
  return {
    status: 200,
    data: responseData,
  };
};
