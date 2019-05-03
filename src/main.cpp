#include "ofMain.h"
#include "ofAppGLFWWindow.h"
#include "ofApp.h"
#include "ofSecond.h"

//========================================================================
int main(){
    
    /*
    ofGLWindowSettings settings;
    settings.setGLVersion(3, 2);
    settings.setSize(1024, 768);
//    settings.windowMode = OF_FULLSCREEN;
    ofCreateWindow(settings);
    ofRunApp(new ofApp());
     */
    
    ofGLFWWindowSettings settings;
    settings.setGLVersion(3, 2);
    settings.resizable = false;
    settings.decorated = false;
//    settings.setSize(640, 360);
    settings.windowMode = OF_FULLSCREEN;
    
//    settings.setPosition(ofVec2f(0,410));
    settings.monitor = 1;
    shared_ptr<ofAppBaseWindow> mainWindow = ofCreateWindow(settings);
    
//    settings.setPosition(ofVec2f(0,0));
    settings.monitor = 2;
    settings.shareContextWith = mainWindow;
    shared_ptr<ofAppBaseWindow> secondWindow = ofCreateWindow(settings);
    
    shared_ptr<ofApp> mainApp(new ofApp);
    shared_ptr<ofSecond> secondApp(new ofSecond);
    secondApp->main = mainApp;
    
    ofRunApp(mainWindow, mainApp);
    ofRunApp(secondWindow, secondApp);
    ofRunMainLoop();
    
}
