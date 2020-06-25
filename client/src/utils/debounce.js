const DEFAULT_DEBOUNCE_TIME = 3000;

const debounce = (func, wait = DEFAULT_DEBOUNCE_TIME) => {
  let timeout; // Shared state for the returned function

  function executedFunction(...args) {
    // Create the function to be invoked when the debounce period ends
    const later = () => {
      timeout = null;
      func(...args);
    };

    // Refresh timeout
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
  executedFunction.cancel = function () {
    clearTimeout(timeout);
  };

  return executedFunction;
};

export default debounce;
