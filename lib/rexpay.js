"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rexpay = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const rexpay_1 = __importDefault(require("rexpay"));
const react_native_webview_1 = require("react-native-webview");
const react_2 = __importDefault(require("react"));
const rexpay = new rexpay_1.default();
exports.Rexpay = (0, react_1.forwardRef)(({ userId, amount = 0, metadata = {}, mode = "Debug", currency = "NGN", autoStart = false, onClose: __onClose, onSuccess: __onSuccess, callbackUrl = "mobile", reference = Date.now().toString(), activityIndicatorColor = "#ffffff", }, ref) => {
    const webView = (0, react_1.useRef)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [isModalVisible, setIsModalVisible] = (0, react_1.useState)(false);
    const [authorizationUrl, setAuthorizationUrl] = (0, react_1.useState)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        endTransaction: () => setIsModalVisible(false),
        startTransaction: () => setIsModalVisible(true),
    }));
    (0, react_1.useEffect)(() => {
        // auto start checkout
        autoStart && setIsModalVisible(true);
    }, [autoStart]);
    const onCancel = (params) => {
        __onClose(params);
        setIsModalVisible(false);
    };
    const onSuccess = (params) => {
        __onSuccess(params);
        setIsModalVisible(false);
    };
    const handlePaymentInitiation = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield rexpay.initializePayment({
                mode,
                amount,
                userId,
                metadata,
                currency,
                reference,
                callbackUrl,
            });
            if (!response.success || !((_a = response.data) === null || _a === void 0 ? void 0 : _a.authorizeUrl)) {
                throw Error(response.message);
            }
            setAuthorizationUrl(response.data.authorizeUrl);
        }
        catch (error) {
            onCancel({
                status: "Failed",
                message: error.message,
                error: "Payment initiation failed",
            });
        }
    });
    const verifyPayment = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield rexpay.verifyPayment({
                transactionReference: reference,
            });
            onSuccess({ status: "Success", data: response === null || response === void 0 ? void 0 : response.data });
        }
        catch (error) {
            onCancel({
                status: "Failed",
                message: error.message,
                error: "Payment verification failed",
            });
        }
    });
    const onNavigationStateChange = (event) => {
        var _a;
        // when page is done loading hide our loader
        if (isLoading && !event.loading && event.title) {
            setIsLoading(event.loading);
        }
        if ((_a = event.url) === null || _a === void 0 ? void 0 : _a.includes("mobile")) {
            verifyPayment();
        }
    };
    return (react_2.default.createElement(react_native_1.Modal, { style: style.modal, transparent: false, animationType: "slide", visible: isModalVisible, onShow: handlePaymentInitiation },
        react_2.default.createElement(react_native_1.View, { style: style.modal },
            react_2.default.createElement(react_native_webview_1.WebView, { ref: webView, style: style.modal, cacheEnabled: false, cacheMode: "LOAD_NO_CACHE", source: { uri: authorizationUrl }, onNavigationStateChange: onNavigationStateChange }),
            isLoading && (react_2.default.createElement(react_native_1.View, { style: style.indicator },
                react_2.default.createElement(react_native_1.Image, { style: react_native_1.StyleSheet.absoluteFill, source: require("../assets/bg.png") }),
                react_2.default.createElement(react_native_1.ActivityIndicator, { color: activityIndicatorColor }))))));
});
const style = react_native_1.StyleSheet.create({
    modal: {
        flex: 1,
    },
    indicator: Object.assign({ alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" }, react_native_1.StyleSheet.absoluteFillObject),
});
