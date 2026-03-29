attribute vec3 position;
attribute vec4 color;

uniform mat4 worldMat;
uniform mat4 viewMat;
uniform mat4 projMat;

varying vec4 v_color;

void main() {
    v_color = color;
    gl_Position = projMat * viewMat * worldMat * vec4(position, 1.0);
}