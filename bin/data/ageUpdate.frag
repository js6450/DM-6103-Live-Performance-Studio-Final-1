#version 150

uniform sampler2DRect prevAgeData;

uniform float timestep;
uniform float life;

in vec2 vTexCoord;

out vec4 vFragColor;

void main(void){
    // Get the age from the pixel color.
    float age = texture( prevAgeData, vTexCoord ).r;
    
    // Update the age
    age += timestep;
    if (age > life)
        age = 0.0;
    
    // And finally store it on the position FBO.
    vFragColor = vec4(age,1.0,1.0,1.0);
}

