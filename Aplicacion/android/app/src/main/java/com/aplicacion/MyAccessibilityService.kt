package com.aplicacion;

import android.accessibilityservice.AccessibilityService
import android.view.accessibility.AccessibilityEvent

class MyAccessibilityService : AccessibilityService() {

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        // Aquí puedes manejar los eventos de accesibilidad.
        // Observa eventos de la pantalla, cambios de aplicaciones, etc.
    }

    override fun onInterrupt() {
        // Se llama cuando el sistema interrumpe el servicio.
    }
}

