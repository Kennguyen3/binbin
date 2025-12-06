import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import FirebaseCore
import GoogleMaps
import Firebase
import FBSDKCoreKit
import RNBranch
import RCTLinking
import AVFoundation
import WebRTC
import TSBackgroundFetch

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
  // --- WebRTC AudioSession setup ----------
      let rtcAudioSession      = RTCAudioSession.sharedInstance()
    let cfg                  = RTCAudioSessionConfiguration.webRTC()

  // thu + phát
      cfg.category             = AVAudioSession.Category.playAndRecord.rawValue
  // bật AEC/AGC/NS chuẩn cho VoIP
      cfg.mode                 = AVAudioSession.Mode.voiceChat.rawValue
  // QUAN TRỌNG: mặc định phát loa + cho phép phát chuông (SoundPlayer) song song
      cfg.categoryOptions      = [
    .allowBluetooth,
    .defaultToSpeaker,
    .mixWithOthers
      ]

      do {
        try rtcAudioSession.setConfiguration(cfg)
        try rtcAudioSession.setActive(true)
        print("RTCAudioSession configured & active")
      } catch {
        print("[AudioSession] Cannot apply WebRTC configuration:", error)
      }
    // Google Maps API Key
    GMSServices.provideAPIKey("AIzaSyD9jrcx3ybDO1H6cJi2m2iEptTLWcqFALU")

    // Firebase
    FirebaseApp.configure()

    // Facebook SDK
    ApplicationDelegate.shared.application(
      application,
      didFinishLaunchingWithOptions: launchOptions
    )

    // Branch (nếu đang dùng)
    RNBranch.initSession(launchOptions: launchOptions, isReferrable: true)

    // =========================================
    // 2) Setup React Native
    // =========================================
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    // Thay "BinBin" bằng moduleName bạn dùng cho index.js
    factory.startReactNative(
      withModuleName: "BinBin",
      in: window,
      launchOptions: launchOptions
    )

    TSBackgroundFetch.sharedInstance().didFinishLaunching();
    return true
  }

  // =========================================
  // 3) Xử lý openURL (deep linking)
  // =========================================
  func application(_ application: UIApplication,
    open url: URL,
    options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool
  {
    // Branch
    RNBranch.application(application, open: url, options: options)

    // React Native Linking
    return RCTLinkingManager.application(application, open: url, options: options)
  }

  // =========================================
  // 4) Universal Links (tiếp tục userActivity)
  // =========================================
  func application(_ application: UIApplication,
    continue userActivity: NSUserActivity,
    restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool
  {
    // Branch
    RNBranch.continue(userActivity)

    // React Native Linking
    return RCTLinkingManager.application(
      application,
      continue: userActivity,
      restorationHandler: restorationHandler
    )
  }
}

// --------------------------------------
// Tách lớp ReactNativeDelegate để override
// --------------------------------------
class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    return self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }

  // Nếu muốn bổ sung initialProps cho RN:
  /*
  override func initialProps(for bridge: RCTBridge) -> [AnyHashable : Any]? {
    var props = super.initialProps(for: bridge) ?? [:]
    // Ví dụ: props["foo"] = "bar"
    // Hoặc logic cũ: [RNFBMessagingModule addCustomPropsToUserProps:...]
    return props
  }
  */
}
