package com.rusharena.app;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import android.util.Log;

public class MyFirebaseService extends FirebaseMessagingService {

    @Override
    public void onNewToken(String token) {
        Log.d("FCM_TOKEN", "New token: " + token);
        // Optional: send token to server now
    }

    @Override
    public void onMessageReceived(RemoteMessage message) {
        Log.d("FCM_MESSAGE", "Message Received");

        if (message.getNotification() != null) {
            Log.d("FCM_TITLE", message.getNotification().getTitle());
            Log.d("FCM_BODY", message.getNotification().getBody());
        }
    }
}
