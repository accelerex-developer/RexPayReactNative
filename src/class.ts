const PAY_OPTIONS_CLASS = ".pay_options";
const CONTAINER_CLASS = ".container-fluid";
const PAYMENT_TAB_CLASS = `${CONTAINER_CLASS} ${PAY_OPTIONS_CLASS} .col`;

// Use this to change payment modal styles to look better on mobile screens
export const INJECTED_JAVASCRIPT = `(function() {
  const container = document.querySelector(${CONTAINER_CLASS});
  container.style.display = "flex";
  container.style.overflow = "hidden";
  container.style.flexDirection = "column";

  const appBody = container.lastElementChild;
  appBody.style.width = "auto";

  const payOptions = document.querySelector(${PAY_OPTIONS_CLASS});
  payOptions.style.width = "auto";
  payOptions.style.height = "auto";
  payOptions.style.display = "flex";
  payOptions.style.padding = "15px";
  payOptions.style.boxShadow = "none";
  payOptions.style.borderRadius = "none";

  const appHeader = payOptions.firstChild;
  appHeader.style.flex = "auto";
  appHeader.style.display = "flex";
  appHeader.style.alignItems = "center";
  appHeader.style.justifyContent = "space-between";

  const options = document.querySelectorAll(${PAYMENT_TAB_CLASS});
  options.forEach((option) => {
    option.style.marginTop = "margin-top: 0px";
  });
})();`;
