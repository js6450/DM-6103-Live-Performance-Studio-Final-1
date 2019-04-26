#version 150

uniform sampler2DRect tex0;
uniform sampler2DRect fractalData;

uniform float blurAmount;
uniform float frameNum;

in vec2 vTexCoord;
out vec4 outputColor;

void main()
{

    vec4 color = vec4(0.0, 0.0, 0.0, 0.0);
    
    float surrounding =
        texture(tex0, vTexCoord + vec2( 1.0,  1.0)).r +
        texture(tex0, vTexCoord + vec2( 1.0,  0.0)).r +
        texture(tex0, vTexCoord + vec2( 1.0, -1.0)).r +
        texture(tex0, vTexCoord + vec2( 0.0, -1.0)).r +
        texture(tex0, vTexCoord + vec2(-1.0, -1.0)).r +
        texture(tex0, vTexCoord + vec2(-1.0,  0.0)).r +
        texture(tex0, vTexCoord + vec2(-1.0,  1.0)).r +
        texture(tex0, vTexCoord + vec2( 0.0,  1.0)).r
    
//        + texture(tex0, vTexCoord + vec2( 2.0,  2.0)).r +
//        texture(tex0, vTexCoord + vec2( 2.0,  1.0)).r +
//        texture(tex0, vTexCoord + vec2( 2.0,  0.0)).r +
//        texture(tex0, vTexCoord + vec2( 2.0, -1.0)).r +
//        texture(tex0, vTexCoord + vec2( 2.0, -2.0)).r +
//        texture(tex0, vTexCoord + vec2( 1.0, -2.0)).r +
//        texture(tex0, vTexCoord + vec2( 0.0, -2.0)).r +
//        texture(tex0, vTexCoord + vec2(-1.0, -2.0)).r +
//        texture(tex0, vTexCoord + vec2(-2.0, -2.0)).r +
//        texture(tex0, vTexCoord + vec2(-2.0, -1.0)).r +
//        texture(tex0, vTexCoord + vec2(-2.0,  0.0)).r +
//        texture(tex0, vTexCoord + vec2(-2.0,  1.0)).r +
//        texture(tex0, vTexCoord + vec2(-2.0,  2.0)).r +
//        texture(tex0, vTexCoord + vec2(-1.0,  2.0)).r +
//        texture(tex0, vTexCoord + vec2( 0.0,  2.0)).r +
//        texture(tex0, vTexCoord + vec2( 1.0,  2.0)).r
    ;
    
//    if (surrounding > 23)
//        color = vec4(1.0, 1.0, 1.0, 1.0);
//    else if (surrounding > 6)
//        color = vec4(0xFC/255.0, 0xEC/255.0, 0xA3/255.0, 1.0);
//    else if (surrounding > 1.5)
//        color = vec4(0xA1/255.0, 0x3B/255.0, 0x4F/255.0, 1.0);
//    else if (surrounding > 0.4)
//        color = vec4(0x18/255.0, 0x1F/255.0, 0x54/255.0, 1.0);
    
    if (surrounding > 7.7)
        color = vec4(1.0, 1.0, 1.0, 1.0);
    else if (surrounding > 4)
        color = vec4(0xFC/255.0, 0xEC/255.0, 0xA3/255.0, 1.0);
    else if (surrounding > 0.8)
        color = vec4(0xA1/255.0, 0x3B/255.0, 0x4F/255.0, 1.0);
    else if (surrounding > 0.15)
        color = vec4(0x18/255.0, 0x1F/255.0, 0x54/255.0, 1.0);
    
//    color.a = (texture(fractalData, vTexCoord).r + 1.0)* 3.0 * (frameNum+1);
    
    outputColor = color;
}
