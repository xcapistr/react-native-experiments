import { ScrollView, View } from 'react-native'
import {
  Skia,
  Canvas,
  Shader,
  Fill,
  vec,
  useClockValue,
  useComputedValue
} from '@shopify/react-native-skia'

const source1 = Skia.RuntimeEffect.Make(`
    uniform vec2 c;
    uniform float r;
    uniform float clock;

    const float speed = 0.0017;

    vec4 main(vec2 pos) {
        float blueColor = pos.x/ 100;
        float opacity = distance(pos, c/1.5) / 100;
        float greenColor = abs(sin(clock * speed));
        return distance(pos, c) > r ? vec4(1) : vec4(1 - blueColor, greenColor, blueColor, opacity);
    }
`)!

const source2 = Skia.RuntimeEffect.Make(/* glsl */ `
    uniform vec2 c;
    uniform float r;
    uniform float clock;

    const float speed = 0.001;

    vec4 main(vec2 pos) {
        float blueColor = pos.x/ 100;
        float opacity = 1;
        float progress = abs(sin(clock * speed));
        // float greenColor =  distance(pos, c) < progress * 100 && distance(pos, c) > progress * 90 ? 1 : 0;
        float greenColor = 1 - abs(progress * 4 - distance(pos, c) / 30);
        return distance(pos, c) > r ? vec4(1) : vec4(1 - blueColor, greenColor, blueColor, opacity);
    }
`)!

const source3 = Skia.RuntimeEffect.Make(`
  uniform float clock;

  const float speed = 0.001;

  vec4 main(vec2 pos) {
    float normalizedTime = fract(clock * speed);
    float translate = normalizedTime * 40;
    float horizontalLines = 1 - step(1, mod(pos.y, 20));

    float verticalLines = mod(pos.y, 40) > 20 ? 1 - step(1, mod(pos.x - translate, 40)) : 1 - step(1, mod(pos.x + 20 + translate, 40));

    return vec4(0, 0, 0, horizontalLines + verticalLines);
  }
`)!

const source4 = Skia.RuntimeEffect.Make(`
  uniform float clock;

  const float speed = 0.001;

  float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
  }

  float cross(in vec2 _st, float _size){
      return  box(_st, vec2(_size,_size/4.)) +
              box(_st, vec2(_size/4.,_size));
  }

  vec4 main(vec2 pos) {
    vec2 st = pos/256;
    vec3 color = vec3(0.0);

    vec2 translate = vec2(sin(clock * speed),cos(clock * speed));
    st += translate * 0.30;

    color += vec3(cross(st,0.322));

    return vec4(color, 1);
  }
`)!

const source5 = Skia.RuntimeEffect.Make(`
  uniform float clock;

  const float speed = 0.001;
  const float PI = 3.14159265359;

  float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
  }

  float cross(in vec2 _st, float _size){
      return  box(_st, vec2(_size,_size/4.)) +
              box(_st, vec2(_size/4.,_size));
  }

  mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
  }

  vec4 main(vec2 pos) {
    vec2 st = pos/256;
    vec3 color = vec3(0.0);
    float normalizedTime = fract(clock * speed);

    // move space from center to 0,0 and back
    st -= vec2(0.5);
    st = rotate2d( normalizedTime*PI ) * st;
    st += vec2(0.5);

    color += vec3(cross(st,0.322));

    return vec4(color, 1);
  }
`)!

const source6 = Skia.RuntimeEffect.Make(`
  uniform float clock;

  const float speed = 0.002;

  mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
  }

  float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
  }

  float cross(in vec2 _st, float _size){
      return  box(_st, vec2(_size,_size/4.)) +
              box(_st, vec2(_size/4.,_size));
  }

  mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
  }

  vec4 main(vec2 pos) {
    vec2 st = pos/256;
    vec3 color = vec3(0.0);

    st -= vec2(0.5);
    st = scale(vec2(sin(clock * speed))) * st;
    st += vec2(0.5);

    color += vec3(cross(st,0.322));

    return vec4(color, 1);
  }
`)!

const source7 = Skia.RuntimeEffect.Make(`
    uniform float clock;

    const float speed = 0.002;

    float random (vec2 st) {
      return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    vec4 main(vec2 pos) {
        vec2 normalized = pos/vec2(256);
        float normalizedTime = fract(clock * speed);
        float rnd = random(normalized + normalizedTime);

        return vec4(vec3(rnd), 1);
    }
`)!

export const Shaders2 = () => {
  const clock = useClockValue()

  const uniforms = useComputedValue(
    () => ({
      clock: clock?.current ?? 0,
      c: vec(100, 100),
      r: 100
    }),
    [clock]
  )

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <Canvas style={{ width: 256, height: 256 }}>
        <Fill>
          <Shader source={source1} uniforms={uniforms} />
        </Fill>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Fill>
          <Shader source={source2} uniforms={uniforms} />
        </Fill>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Fill>
          <Shader source={source3} uniforms={uniforms} />
        </Fill>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Fill>
          <Shader source={source4} uniforms={uniforms} />
        </Fill>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Fill>
          <Shader source={source5} uniforms={uniforms} />
        </Fill>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Fill>
          <Shader source={source6} uniforms={uniforms} />
        </Fill>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Fill>
          <Shader source={source7} uniforms={uniforms} />
        </Fill>
      </Canvas>
    </ScrollView>
  )
}
