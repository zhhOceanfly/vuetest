<template>
  <div class="example">
    <div ref="googlePay" />
  </div>
</template>
<script>
export default {
  name: "GooglePay",
  props: {
    totalPrice: {
      type: String,
      default: "0.00",
      required: true,
    },
  },
  data: () => ({
    config: {
      /**
       * Define the version of the Google Pay API referenced when creating your
       * configuration
       *声明您的网站使用的 Google Pay API 版本
       * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|apiVersion in PaymentDataRequest}
       */
      baseRequest: {
        apiVersion: 2,
        apiVersionMinor: 0,
      },
      /**
       * Identify your gateway and your site's gateway merchant identifier
       *
       * The Google Pay API response will return an encrypted payment method capable
       * of being charged by a supported gateway after payer authorization
       *为您的付款服务机构申请付款令牌，付款服务机构的相应值
       * @todo check with your gateway on the parameters to pass
       * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway|PaymentMethodTokenizationSpecification}
       */
      tokenizationSpecification: {
        type: "PAYMENT_GATEWAY",
        parameters: {
          gateway: process.env.VUE_APP_GOOGLE_PAY_GATEWAY,
          gatewayMerchantId: process.env.VUE_APP_GOOGLE_PAY_GATEWAY_MERCHANT_ID,
        },
      },
      /**
       * Card networks supported by your site and your gateway
       *指定支持的支付卡网络
       * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
       * @todo confirm card networks supported by your site and gateway
       */
      allowedCardNetworks: [
        "AMEX",
        "DISCOVER",
        "INTERAC",
        "JCB",
        "MASTERCARD",
        "VISA",
      ],
      /**
       * Card authentication methods supported by your site and your gateway
       *
       * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
       * @todo confirm your processor supports Android device tokens for your
       * supported card networks
       * Google Pay API 可能返回 Google 记录在案的支付卡 (PAN_ONLY) 和/或在 Android 设备上以 3D 安全密文进行身份验证的设备令牌 (CRYPTOGRAM_3DS)
       */
      allowedCardAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
    },
  }),
  mounted() {
    // This loads the google pay button on the screen.
    // I used a timeout because I need to wait for the
    // script to load, since I'm loading it when the page mounts
    setTimeout(() => this.loadGooglePay(), 2000);
  },
  computed: {},
  methods: {
    loadGooglePay() {
      console.log(process.env.VUE_APP_GOOGLE_PAY_GATEWAY)
      /**
       * Describe your site's support for the CARD payment method and its required
       * fields
       * 说明您允许的付款方式
       *将您支持的身份验证方法和支持的支付卡网络结合使用，以说明您的网站对 CARD 付款方式的支持情况
       * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
       */
      const baseCardPaymentMethod = {
        type: "CARD",
        parameters: {
          allowedAuthMethods: this.config.allowedCardAuthMethods,
          allowedCardNetworks: this.config.allowedCardNetworks,
        },
      };

      /**
       * Describe your site's support for the CARD payment method including optional
       * fields
       *扩展基本的卡付款方式对象，以说明您预计会返回给您的应用的信息；Google Pay 还支持 CARD 类型和 PAYPAL 类型的付款方式
       * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
       */
      const cardPaymentMethod = Object.assign({}, baseCardPaymentMethod, {
        tokenizationSpecification: this.config.tokenizationSpecification,
      });

      /**
       * An initialized google.payments.api.PaymentsClient object or null if not yet set
       *
       * @see {@link getGooglePaymentsClient}
       */
      let paymentsClient = null;

      /**
       * Configure your site's support for payment methods supported by the Google Pay
       * API.
       *
       * Each member of allowedPaymentMethods should contain only the required fields,
       * allowing reuse of this base request when determining a viewer's ability
       * to pay and later requesting a supported payment method
       *确定是否能使用 Google Pay API 进行付款
       * @returns {object} Google Pay API version, payment methods supported by the site
       */
      const getGoogleIsReadyToPayRequest = () => {
        return Object.assign({}, this.config.baseRequest, {
          allowedPaymentMethods: [baseCardPaymentMethod],
        });
      };

      /**
       * Configure support for the Google Pay API
       *创建 PaymentDataRequest 对象
       * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|PaymentDataRequest}
       * @returns {object} PaymentDataRequest fields
       */
      const getGooglePaymentDataRequest = () => {
        const paymentDataRequest = Object.assign({}, this.config.baseRequest);//建一个 JavaScript 对象来说明您的网站对 Google Pay API 的支持情况
        paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];//添加您的应用所支持的付款方式
        paymentDataRequest.transactionInfo = getGoogleTransactionInfo();//指定买家授权的总价和币种
        paymentDataRequest.merchantInfo = { //提供用户可见的商家名称
          // @todo a merchant ID is available for a production environment after approval by Google
          // See {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}
          merchantId: process.env.VUE_APP_GOOGLE_PAY_MERCHANT_ID,
          merchantName: process.env.VUE_APP_GOOGLE_PAY_MERCHANT_NAME,
        };
        //设置授权付款用于启动付款流程并确认付款的授权状态
          //注册 onPaymentAuthorized 回调
          //使用回调 intent 加载付款数据
          //处理 onPaymentAuthorized 回调
        return paymentDataRequest;
      };

      /**
       * Return an active PaymentsClient or initialize
       *初始化 PaymentsClient 对象
       * @see {@link https://developers.google.com/pay/api/web/reference/client#PaymentsClient|PaymentsClient constructor}
       * @returns {google.payments.api.PaymentsClient} Google Pay API client
       */
      const getGooglePaymentsClient = () => {
        if (paymentsClient === null) {
          paymentsClient = new google.payments.api.PaymentsClient({
            // Alterar o environment para 'PRODUCTION' em prod
            environment: process.env.VUE_APP_GOOGLE_PAY_ENVIRONMENT,
          });
          console.log('paymentsClient:', paymentsClient)
        }
        return paymentsClient;
      }

      /**
       * Initialize Google PaymentsClient after Google-hosted JavaScript has loaded
       *
       * Display a Google Pay payment button after confirmation of the viewer's
       * ability to pay.
       */
      const onGooglePayLoaded = () => {
        const paymentsClient = getGooglePaymentsClient();
        paymentsClient
          .isReadyToPay(getGoogleIsReadyToPayRequest()) //确定当前设备和/或浏览器是否支持 Google Pay API
          .then((response) => {
            if (response.result) {
              addGooglePayButton();//添加 Google Pay 付款按钮
              // @todo prefetch payment data to improve performance after confirming site functionality
              // prefetchGooglePaymentData();
              this.$emit('loaded', response.result);
            }
          })
          .catch((err) => {
            // show error in developer console for debugging
            console.error(err);
            this.$emit('loadedError', err);
          });
      }

      /**
       * Add a Google Pay purchase button alongside an existing checkout button
       *添加 Google Pay 付款按钮
       * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#ButtonOptions|Button options}
       * @see {@link https://developers.google.com/pay/api/web/guides/brand-guidelines|Google Pay brand guidelines}
       */
      const addGooglePayButton = () => {
        const paymentsClient = getGooglePaymentsClient();
        const button = paymentsClient.createButton({
          onClick: onGooglePaymentButtonClicked,
        });
        this.$refs.googlePay.appendChild(button);
      }

      /**
       * Provide Google Pay API with a payment amount, currency, and amount status
       *指定买家授权的总价和币种
       * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#TransactionInfo|TransactionInfo}
       * @returns {object} transaction info, suitable for use as transactionInfo property of PaymentDataRequest
       */
      const getGoogleTransactionInfo = () => ({
        countryCode: "US",
        currencyCode: "USD",
        totalPriceStatus: "FINAL",
        // set to cart total
        totalPrice: this.totalPrice,
      });

      /**
       * Prefetch payment data to improve performance
       *在用户互动之前预取付款数据，只有当您在没有优化的情况下成功实现了 Google Pay API 后，才能在代码中添加预取功能
       * @see {@link https://developers.google.com/pay/api/web/reference/client#prefetchPaymentData|prefetchPaymentData()}
       */
      // function prefetchGooglePaymentData() {
      //   const paymentDataRequest = getGooglePaymentDataRequest();
      //   // transactionInfo must be set but does not affect cache
      //   paymentDataRequest.transactionInfo = {
      //     totalPriceStatus: "NOT_CURRENTLY_KNOWN",
      //     currencyCode: "USD",
      //   };
      //   const paymentsClient = getGooglePaymentsClient();
      //   paymentsClient.prefetchPaymentData(paymentDataRequest);
      // }

      /**
       * Show Google Pay payment sheet when Google Pay payment button is clicked
       * 添加 Google Pay 付款按钮点击事件
       */
      const onGooglePaymentButtonClicked = () => {
        const paymentDataRequest = getGooglePaymentDataRequest(); //创建 PaymentDataRequest 对象
        paymentDataRequest.transactionInfo = getGoogleTransactionInfo(); //指定买家授权的总价和币种

        const paymentsClient = getGooglePaymentsClient();
        paymentsClient
          .loadPaymentData(paymentDataRequest) //为用户手势注册事件处理程序
          .then((paymentData) => {
            // handle the response
            //在 Google 用户授权您的网站接收与用户所选付款方式和可选联系数据相关的信息后，处理来自 Google Pay API 的响应
            processPayment(paymentData);
            console.log('paymentData:',paymentData)
          })
          .catch((err) => {
            // show error in developer console for debugging
            console.error(err);
            this.$emit('paymentError', err);
          });
      }
      /**
       * Process payment data returned by the Google Pay API
       *请从 paymentData 响应中提取付款令牌。如果您实现了网关集成，请将此令牌传递给您的网关
       * @param {object} paymentData response from Google Pay API after user approves payment
       * @see {@link https://developers.google.com/pay/api/web/reference/response-objects#PaymentData|PaymentData object reference}
       */
      const processPayment = (paymentData) => {
        // show returned data in developer console for debugging
        console.log(paymentData);
        // @todo pass payment token to your gateway to process payment
        const paymentToken =
          paymentData.paymentMethodData.tokenizationData.token;
        this.$emit('paymentSuccess', paymentToken);
      }

      onGooglePayLoaded();
    },
  },
};
</script>