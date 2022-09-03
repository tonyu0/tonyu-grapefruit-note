attribute vec3 position;
uniform mat4 mvpMatrix;
void main() { gl_Position = vec4(position, 1.0); }