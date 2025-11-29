package com.binbin.customer

import android.os.Bundle
import android.content.Intent
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.dooboolab.rniap.RNIapActivityListener;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import io.branch.rnbranch.RNBranchModule

class MainActivity : ReactActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Registering the IAP activity listener to handle in-app purchases correctly
        try {
            RNIapActivityListener.registerActivity(this)
        } catch (e: Exception) {
            e.printStackTrace() // Handle any issues to prevent app crashes
        }
    }

    override fun onStart() {
        super.onStart()
        // Initialize Branch SDK session
        RNBranchModule.initSession(intent?.data, this)
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        // Handle new intent for deep linking
        intent?.let {
            RNBranchModule.onNewIntent(it)
        }
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String = "BinBin"

    /**
     * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
     * which allows you to enable New Architecture with a single boolean flag [fabricEnabled].
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
