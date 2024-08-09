import ExpoModulesCore

public class RexpayReactNativeModule: Module {
  public func definition() -> ModuleDefinition {
    Name("RexpayReactNativeView")

    View(RexpayReactNativeView.self) {
      Events("onLoad", "onNavigationStateChange")

      Prop("url") { (view, url: URL) in
        if view.webView.url != url {
          let urlRequest = URLRequest(url: url)
          view.webView.load(urlRequest)
        }
      }
    }
  }
}
