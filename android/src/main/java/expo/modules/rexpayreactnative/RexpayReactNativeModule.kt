package expo.modules.webview

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL

class RexpayReactNativeModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("RexpayReactNativeView")

    View(RexpayReactNativeView::class) {
      Events("onLoad", "onNavigationStateChange")

      Prop("url") { view: ExpoWebView, url: URL? ->
        view.webView.loadUrl(url.toString())
      }
    }
  }
}
