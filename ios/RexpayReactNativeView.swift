import ExpoModulesCore
import WebKit
// This view will be used as a native component. Make sure to inherit from `ExpoView`
// to apply the proper styling (e.g. border radius and shadows).
class RexpayReactNativeView: ExpoView, WKNavigationDelegate {
  let webView = WKWebView()
  let onLoad = EventDispatcher()
  let onNavigationStateChange = EventDispatcher() // Add an EventDispatcher for the new event


  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    clipsToBounds = true
    webView.navigationDelegate = self
    addSubview(webView)
  }

  override func layoutSubviews() {
    webView.frame = bounds
  }

  func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
    if let url = webView.url {
      onLoad([
        "url": url.absoluteString
      ])
    }
  }

  func webView(_ webView: WKWebView, didCommit navigation: WKNavigation!) {
    if let url = webView.url {
      onNavigationStateChange([
        "url": url.absoluteString
      ])
    }
  }

}
