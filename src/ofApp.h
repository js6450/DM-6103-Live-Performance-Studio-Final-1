/*
 *  summary:Example of how to use GPU for data processing. The data it«s going to be stored
 *          on the color channels of the FBO«s textures. In this case we are going to use just
 *          RED and GREEN channels on two textures. One for the position and the other one for
 *          the velocity. For updating the information of those textures we are going to use
 *          two FBO«s for each type of information. This pair of FBO will pass the information
 *          from one to other in a technique called PingPong.
 *          After updating this information, we are going to use the textures allocated on GPU memory
 *          for moving some vertex and then multiplied them in order to make little frames that hold
 *          a texture of a spark of light.
 */

#pragma once

#include "ofMain.h"

// Struct for doing PingPong quickly and easy
//
// Because on GPU you can't write over the texture that you are reading we are
// using to pair of ofFbo attached together on what we call pingPongBuffer
// Learn more about Ping-Pong at:
//
// http://www.seas.upenn.edu/~cis565/fbo.htm#setupgl4
//
struct pingPongBuffer {
public:
    void allocate( int _width, int _height, int _internalformat = GL_RGBA){
        // Allocate
        for(int i = 0; i < 2; i++){
            FBOs[i].allocate(_width,_height, _internalformat );
            FBOs[i].getTexture().setTextureMinMagFilter(GL_NEAREST, GL_NEAREST);
        }
        
        //Assign
        src = &FBOs[0];
        dst = &FBOs[1];
        
        // Clean
        clear();
    }
    
    void swap(){
        std::swap(src,dst);
    }
    
    void clear(){
        for(int i = 0; i < 2; i++){
            FBOs[i].begin();
            ofClear(0,255);
            FBOs[i].end();
        }
    }
    
    ofFbo& operator[]( int n ){ return FBOs[n];}
    ofFbo   *src;       // Source       ->  Ping
    ofFbo   *dst;       // Destination  ->  Pong
    
private:
    ofFbo   FBOs[2];    // Real addresses of ping/pong FBO«s
};


class ofApp : public ofBaseApp{
public:
    void setup();
    void update();
    void draw();
    
    void keyPressed(int key);
    void keyReleased(int key);
    void mouseMoved(int x, int y);
    void mouseDragged(int x, int y, int button);
    void mousePressed(int x, int y, int button);
    void mouseReleased(int x, int y, int button);
    void mouseEntered(int x, int y);
    void mouseExited(int x, int y);
    void windowResized(int w, int h);
    void dragEvent(ofDragInfo dragInfo);
    void gotMessage(ofMessage msg);
    
    int width, height;
    int numParticles;
    int textureRes;
    float dancerRadiusSquared;
    float timeStep;
    float velocityScale;
    float particleLife;
    float particleSize;
    float fractalScale;
    
    ofShader updatePos;
    ofShader updateVel;
    ofShader updateAge;
    
    pingPongBuffer posPingPong;
    pingPongBuffer velPingPong;
    pingPongBuffer agePingPong;
    ofFbo origPos;
    ofFbo origVel;
    
    ofFbo fractal;
    
    ofImage particleImg;
    ofShader updateRender;
    ofFbo renderFBO;
    ofVboMesh mesh;
};
