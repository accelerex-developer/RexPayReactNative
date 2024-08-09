package expo.modules.webview

import android.content.Context
import android.webkit.WebView
import android.webkit.WebViewClient
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView

class RexpayReactNativeView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  private val onLoad by EventDispatcher()
  private val onNavigationStateChange by EventDispatcher()

  internal val webView = WebView(context).also {
    it.layoutParams = LayoutParams(
      LayoutParams.MATCH_PARENT,
      LayoutParams.MATCH_PARENT
    )

    it.webViewClient = object : WebViewClient() {
      override fun onPageFinished(view: WebView, url: String) {
        onLoad(mapOf("url" to url))
      }

      override fun onPageStarted(view: WebView, url: String, favicon: android.graphics.Bitmap?) {
        super.onPageStarted(view, url, favicon)
        onNavigationStateChange(mapOf("url" to url)) // Notify about navigation state change
      }

      override fun onPageCommitVisible(view: WebView, url: String) {
        super.onPageCommitVisible(view, url)
        onNavigationStateChange(mapOf("url" to url)) // Notify about navigation state change
      }

      override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
        onNavigationStateChange(mapOf("url" to request.url.toString())) // Notify about navigation state change
        return super.shouldOverrideUrlLoading(view, request)
      }
    }

    addView(it)
  }
}
