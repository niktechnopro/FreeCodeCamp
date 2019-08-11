

# React Native

# Keep our interfaces so they can be used by other ProGuard rules.
# See http://sourceforge.net/p/proguard/bugs/466/
#-keep,allowobfuscation @interface com.facebook.proguard.annotations.DoNotStrip
#-keep,allowobfuscation @interface com.facebook.proguard.annotations.KeepGettersAndSetters
#-keep,allowobfuscation @interface com.facebook.common.internal.DoNotStrip

# Do not strip any method/class that is annotated with @DoNotStrip
#-keep @com.facebook.proguard.annotations.DoNotStrip class *
#-keep @com.facebook.common.internal.DoNotStrip class *
#-keepclassmembers class * {
#    @com.facebook.proguard.annotations.DoNotStrip *;
#    @com.facebook.common.internal.DoNotStrip *;
#}

#-keepclassmembers @com.facebook.proguard.annotations.KeepGettersAndSetters class * {
#  void set*(***);
#  *** get*();
#}

#-keep class * extends com.facebook.react.bridge.JavaScriptModule { *; }
#-keep class * extends com.facebook.react.bridge.NativeModule { *; }
#-keepclassmembers,includedescriptorclasses class * { native <methods>; }
#-keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactProp <methods>; }
#-keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>; #}

#-dontwarn com.facebook.react.**
#-keep,includedescriptorclasses class com.facebook.react.bridge.** { *; }

