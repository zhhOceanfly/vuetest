

<template>
   <div id="google-pay-button" class="w-full mt-3 mx-3"></div>
 
</template>

<script>

import { useHead } from "@unhead/vue";

useHead(
  {
    script: [
      {
        type: "text/javascript",
        src: `https://pay.google.com/gp/p/js/pay.js`,
        tagPosition: "bodyClose",
        async: true,
        onload: () => onGooglePay(),
      },
    ],
  },
  { mode: "client" },
);


// 获取支付信息
const getPayMentInfo = async () => {
  try {
    let res: any = {};
    let parmes: any = { ... };
    res = await orderCreate(parmes); // 自己后端接口
    return res;
  } catch (error) {
    return error;
  }
};

let paymentsClient: any = null;
const getGooglePaymentsClient = () => {
  try {
    if (paymentsClient === null && !import.meta.env.SSR) {
      if (window["google"]) {
        paymentsClient = new window["google"].payments.api.PaymentsClient({
          environment: "PRODUCTION", // TEST 测试环境, PRODUCTION 线上环境
        });
      }
    }
    return paymentsClient;
  } catch (error: any) {
    console.log(error);
  }
};

const onGooglePay = () => {
  try {
    if (!import.meta.env.SSR) {
      paymentsClient = getGooglePaymentsClient();
      paymentsClient?.isReadyToPay(getGoogleIsReadyToPayRequest()).then((response: any) => {
        if (response.result) addGooglePayButton();
      }).catch((err: any) => {
        console.error(err);
      });
    }
  } catch (error: any) {
    console.log(error);
  }
};

const addGooglePayButton = () => {
  paymentsClient = getGooglePaymentsClient();
  const button = paymentsClient.createButton({ onClick: onGooglePaymentButtonClicked });
  let googlePayDom: any = document.getElementById("google-pay-button");
  if (googlePayDom) googlePayDom.innerHTML = "";
  googlePayDom?.appendChild(button);
};

const onGooglePaymentButtonClicked = () => {
  try {

    let parmes: any = { ... };
    resData.value = await orderCreate(parmes); // 获取支付信息
    let googleTransactionInfo = { currencyCode: "USD", countryCode: "US", totalPriceStatus: "FINAL", totalPrice: "123.45" };
    const paymentDataRequest = getGooglePaymentDataRequest( googleTransactionInfo );
    const paymentsClient = getGooglePaymentsClient();
    paymentsClient
      .loadPaymentData(paymentDataRequest)
      .then((paymentData: any) => {
        let paymentToken = paymentData.paymentMethodData.tokenizationData.token;
        let cardNetwork = paymentData.paymentMethodData.info.cardNetwork;
        let payParme = { googleParam: { token: paymentToken, cartType: cardNetwork } };
        processPayment(payParme);
      })
      .catch((err: any) => {
        console.error(err);
      });
  } catch (error) {}
};

const processPayment = (payParme: any) => {
  try {
    let parmes = { orderNumber: "orderNumber", currency: "USD", ...payParme };
    orderPayment(parmes).then((res: any) => {  // 自己后端接口
      if (res?.success && res?.data) {
        router.push(`/pay/paySuccess`);
      }
    });
  } catch (error) {}
};

</script>