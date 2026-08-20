package com.yourcompany.terminalmanager;

import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebSettings;
import android.webkit.WebChromeClient;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.view.KeyEvent;

public class MainActivity extends AppCompatActivity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webView);
        WebSettings webSettings = webView.getSettings();
        
        // فعال‌سازی جاوااسکریپت
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);
        
        // فعال‌سازی اینترنت
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setUseWideViewPort(true);
        
        // WebViewClient برای جلوگیری از باز شدن در مرورگر
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }
        });
        
        // بارگذاری فایل محلی
        webView.loadUrl("file:///android_asset/index.html");
    }

    // ============================================================
    // ⭐⭐⭐ مدیریت دکمه بک (Back Button) ⭐⭐⭐
    // ============================================================
    @Override
    public void onBackPressed() {
        // اگر WebView بتواند به صفحه قبل برگردد، برگرد
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            // اگر صفحه اصلی بود، از برنامه خارج شو
            super.onBackPressed();
        }
    }
}