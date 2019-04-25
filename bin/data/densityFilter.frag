#version 150

uniform sampler2DRect tex0;

uniform float blurAmount;

in vec2 vTexCoord;
out vec4 outputColor;

// Gaussian weights from http://dev.theomader.com/gaussian-kernel-calculator/

void main()
{

    vec4 color = vec4(0.0, 0.0, 0.0, 0.0);
    
    int surrounding = 0;
    if (texture(tex0, vTexCoord + vec2(1.0, 1.0)).r > 0.1) surrounding++;
    if (texture(tex0, vTexCoord + vec2(1.0, 0.0)).r > 0.1) surrounding++;
    if (texture(tex0, vTexCoord + vec2(1.0, -1.0)).r > 0.1) surrounding++;
    if (texture(tex0, vTexCoord + vec2(0.0, -1.0)).r > 0.1) surrounding++;
    if (texture(tex0, vTexCoord + vec2(-1.0, -1.0)).r > 0.1) surrounding++;
    if (texture(tex0, vTexCoord + vec2(-1.0, 0.0)).r > 0.1) surrounding++;
    if (texture(tex0, vTexCoord + vec2(-1.0, 1.0)).r > 0.1) surrounding++;
    if (texture(tex0, vTexCoord + vec2(0.0, 1.0)).r > 0.1) surrounding++;
    
    if (texture(tex0, vTexCoord).r > 0.1 && surrounding > 3)
        color = vec4(1.0, 1.0, 1.0, 1.0);
    
    outputColor = color;
}
