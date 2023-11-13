import { ScrollView, View } from 'react-native'
import {
  Skia,
  Canvas,
  RuntimeShader,
  Fill,
  vec,
  useClockValue,
  useComputedValue,
  Image,
  useImage,
  DisplacementMap,
  Turbulence,
  TurbulenceProps,
  MorphologyImageFilterProps,
  ImageShader,
  Shader
} from '@shopify/react-native-skia'

const source1 = Skia.RuntimeEffect.Make(`
    uniform float clock;
    uniform shader image;

    const float speed = 0.005;

    vec4 main(vec2 pos) {
      vec2 translate = vec2(floor(cos(clock * speed) * 2) * 5, 0);
      float red = image.eval(pos + translate).r;
      float green = image.eval(pos).g;
      float blue = image.eval(pos - translate).b;
      return vec4(red,green,blue,1);
    }
`)!

const source2 = Skia.RuntimeEffect.Make(`
    uniform vec2 c;
    uniform float r;
    uniform float clock;
    uniform shader image;

    const float speed = 0.001;

    vec4 main(vec2 pos) {
        float blueColor = pos.x/ 100;
        float opacity = 1;
        float progress = abs(sin(clock * speed));
        // float greenColor =  distance(pos, c) < progress * 100 && distance(pos, c) > progress * 90 ? 1 : 0;
        float greenColor = 1 - abs(progress * 4 - distance(pos, c) / 30);
        // return distance(pos, c) > r ? vec4(1) : vec4(1 - blueColor, greenColor, blueColor, opacity);
        return vec4(1 - image.eval(pos).r, 1 - image.eval(pos).g,1 - image.eval(pos).b, 1);
    }
`)!

// https://www.shadertoy.com/view/ldBXDD
const source4 = Skia.RuntimeEffect.Make(`
    uniform vec2 c;
    uniform float r;
    uniform float clock;
    uniform shader image;

    const float speed = 0.01;

    vec4 main(vec2 pos) {
      // pixel position normalised to [-1, 1]
      vec2 cPos = -1.0 + 2.0 * pos.xy / vec2(256);

      // distance of current pixel from center
      float cLength = length(cPos);

      vec2 uv = pos.xy / vec2(256) + (cPos / cLength) * cos(cLength * 12 - clock * speed) * 0.3 * 20;

      vec3 col = image.eval(pos + uv).rgb;
      return vec4(col, 1);
    }
`)!

const source5 = Skia.RuntimeEffect.Make(`
    uniform vec2 c;
    uniform float r;
    uniform float clock;
    uniform shader image;

    const float speed = 0.01;

    vec4 main(vec2 pos) {
      // pixel position normalised to [-1, 1]
      vec2 cPos = -1.0 + 2.0 * pos.xy / vec2(256);

      // distance of current pixel from center
      float cLength = length(cPos);

      vec2 uv = pos.xy / vec2(256) + (cPos / cLength) * cos(cLength * 12 - clock * speed) * 0.3 * 20;

      vec3 col = image.eval(pos + uv).rgb;
      return vec4(uv.x, 0, uv.y, 1);
    }
`)!

const source6 = Skia.RuntimeEffect.Make(`
    uniform vec2 c;
    uniform float r;
    uniform float clock;
    uniform shader image;

    const float speed = 0.01;

    vec4 main(vec2 pos) {
      // pixel position normalised to [-1, 1]
      vec2 cPos = -1.0 + 2.0 * pos.xy / vec2(256);

      // distance of current pixel from center
      float cLength = length(cPos);

      vec2 uv = pos.xy / vec2(256) + (cPos / cLength) * cos(cLength * 12 - clock * speed) * 6;

      float testProgress = abs(fract(clock * 0.0002));

      float testValue = smoothstep(1, 0.6, distance(pos, c) / (256) / testProgress);
      float testValue2 = smoothstep(1, 2,  distance(pos, c) / (256) / clamp(testProgress - 0.5, 0, 1));

      float multiplier = testValue * testValue2 * (1 - testProgress);

      // vec2 uv2 = vec2(uv.x * (clamp(1 - distance(pos, c) / r * testProgress, 0, 1)) * testProgress, uv.y * (clamp(1 - distance(pos, c) / r * testProgress, 0, 1))) * testProgress;

      // vec2 translation = 

      vec3 col = image.eval(pos + uv * multiplier).rgb;

      return vec4(col, 1);
    }
`)!

export const Shaders3 = () => {
  const image = useImage(
    'https://images.unsplash.com/photo-1475070929565-c985b496cb9f?auto=format&fit=crop&q=80&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  )

  const clock = useClockValue()

  const slowClock = useComputedValue(() => clock.current / 100, [clock])

  const uniforms = useComputedValue(
    () => ({
      clock: clock?.current ?? 0,
      c: vec(125, 125),
      r: 100
    }),
    [clock]
  )

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <Canvas style={{ width: 256, height: 256 }}>
        <Image image={image} x={0} y={0} width={256} height={256} fit="cover">
          <RuntimeShader source={source1} uniforms={uniforms} />
        </Image>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Image image={image} x={0} y={0} width={256} height={256} fit="cover">
          <DisplacementMap channelX="r" channelY="r" scale={10}>
            <Turbulence
              freqX={0.01}
              freqY={0.05}
              octaves={2}
              seed={slowClock}
            />
          </DisplacementMap>
        </Image>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Image image={image} x={0} y={0} width={256} height={256} fit="cover">
          <RuntimeShader source={source2} uniforms={uniforms} />
        </Image>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Image image={image} x={0} y={0} width={256} height={256} fit="cover">
          <RuntimeShader source={source4} uniforms={uniforms} />
        </Image>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Image image={image} x={0} y={0} width={256} height={256} fit="cover">
          <RuntimeShader source={source5} uniforms={uniforms} />
        </Image>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Image image={image} x={0} y={0} width={256} height={256} fit="cover">
          <RuntimeShader source={source6} uniforms={uniforms} />
        </Image>
      </Canvas>
    </ScrollView>
  )
}
