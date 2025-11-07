package com.aaronzyf.minivault;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import java.util.Objects;
import com.swmansion.rnscreens.fragment.restoration.RNScreensFragmentFactory;

import expo.modules.ReactActivityDelegateWrapper;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        getSupportFragmentManager().setFragmentFactory(new RNScreensFragmentFactory());
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "mini_vault";
    }

    /**
     * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
     * which allows you to enable New Architecture with a single boolean flag [fabricEnabled]
     */
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegateWrapper(
                this,
                BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
                new DefaultReactActivityDelegate(
                        this,
                        Objects.requireNonNull(getMainComponentName()),
                        DefaultNewArchitectureEntryPoint.getFabricEnabled()
                )
        );
    }
}
