// src/utils/logErrorDetails.js

const logErrorsDetails = (context, error) => {
  console.error(`\n${context}
      Error Name : ${error.name}
      Error Message : ${error.message}`);
};
export default logErrorsDetails;
