#version 150

uniform sampler2DRect tex0;
uniform sampler2DRect sharpTex;
uniform vec2 screen;
uniform int frameWidth;

in vec2 vTexCoord;
out vec4 outputColor;

void main()
{
    vec4 colorBlur = texture(tex0, vTexCoord);
    vec4 color = texture(sharpTex, vTexCoord);
    
    if (color.g < 0.00001)
        color = colorBlur;
    
    if (vTexCoord.x < frameWidth || vTexCoord.y < frameWidth || vTexCoord.x > screen.x-frameWidth || vTexCoord.y > screen.y-frameWidth)
        color = vec4(1.0,1.0,1.0,1.0);
    
    outputColor = color;
}
