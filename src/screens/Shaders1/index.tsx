import { ScrollView, View } from 'react-native'
import { Skia, Canvas, Shader, Fill, vec } from '@shopify/react-native-skia'

const source1 = Skia.RuntimeEffect.Make(`
    vec4 main(vec2 pos) {
        // normalized x,y values go from 0 to 1, the canvas is 256x256
        vec2 normalized = pos/vec2(256);
        return vec4(normalized.x, 0, normalized.y, 1);
    }
`)!

const source2 = Skia.RuntimeEffect.Make(`
    uniform vec2 c;
    uniform float r;
    vec4 main(vec2 pos) {
        float blueColor = pos.x/ 100;
        float opacity = distance(pos, c/1.5) / 100;
        return distance(pos, c) > r ? vec4(1) : vec4(1 - blueColor, 0.2, blueColor, opacity);
    }
`)!

const source3 = Skia.RuntimeEffect.Make(`
    uniform vec2 res;

    float plot(vec2 st) {    
        return smoothstep(5, 2, abs(res.x - st.y - st.x));
    }

    float plot2(vec2 st) {    
        return smoothstep(5, 2, abs(st.y - st.x));
    }

    vec4 main(vec2 pos) {
        vec2 normalizedPosition = pos/res;
        vec3 color = vec3(pos.x/res.x);

        float pct = plot(pos);
        float pct2 = plot2(pos);

        color = (1 - pct - pct2) * color  + pct * vec3(1, 0, 0) + pct2 * vec3(0, 0, 1);

        return vec4(color, 1);
    }
`)!

const source4 = Skia.RuntimeEffect.Make(`
    uniform vec2 res;

    float plot(vec2 st, float pct){
        return  smoothstep( pct - 0.2, pct, st.y) -
                smoothstep( pct, pct + 0.2, st.y);
      }

    vec4 main(vec2 pos) {
        vec2 normalizedPosition = pos/res;
        float y = pow(normalizedPosition.x, 5.0);
        vec3 color = vec3(y);
        
        float pct = plot(normalizedPosition, y);
        color = (1 - pct) * color + pct * vec3(0.0, 1.0, 0.0);

        return vec4(color, 1);
    }
`)!

const source5 = Skia.RuntimeEffect.Make(`
    uniform vec2 res;

    float plot(vec2 st) {
        return  smoothstep(0.02, 0, abs(1 - st.y * 2 - sin(st.x * 10)));
    }

    vec4 main(vec2 pos) {
        vec2 normalizedPosition = pos/vec2(res.x);
        float y = pow(normalizedPosition.x, 5.0);
        vec3 color = vec3(y);

        float pct = plot(normalizedPosition);
        
        color = (1 - pct) * color + pct * vec3(0.0, 1.0, 0.0);

        return vec4(color, 1);
    }
`)!

const source6 = Skia.RuntimeEffect.Make(`
    uniform vec2 c;
    uniform float r;
    vec4 main(vec2 pos) {
        float blueColor = pos.x/ 100;
        float redColor = step(0.5, 1 - blueColor);
        float opacity = smoothstep(0.3, 0.4, distance(pos, c/1.5) / 100);
        return distance(pos, c) > r ? vec4(1) : vec4(redColor, 0.2, blueColor, opacity);
    }
`)!

const source7 = Skia.RuntimeEffect.Make(`
    vec3 hsv2rgb( in vec3 c ) {
        vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
	    return c.z * mix( vec3(1.0), rgb, c.y);
    }

    vec4 main(vec2 pos) {
        // normalized x,y values go from 0 to 1, the canvas is 256x256
        vec2 normalized = pos/vec2(256);
        vec3 color = hsv2rgb(vec3(normalized.x, clamp(normalized.y * 2, 0, 1), clamp((1 - normalized.y) * 2, 0, 1)));
        return vec4(color, 1);
    }
`)!

const source8 = Skia.RuntimeEffect.Make(`
    uniform vec2 res;

    vec4 main(vec2 pos) {
        vec2 normalized = pos.xy/res.xy;
        vec3 color = vec3(0);

        vec2 bl = step(vec2(0.1), normalized);
        vec2 tr = step(vec2(0.1), 1 - normalized);

        float pct = bl.x * bl.y * tr.x * tr.y;


        color = vec3(pct);

        return vec4(1- color[0], 0, 0, 1);
    }
`)!

const source9 = Skia.RuntimeEffect.Make(`
    uniform vec2 res;

    vec4 main(vec2 pos) {
        float horizontalLines = mod(pos.y, 20);

        float verticalLines = mod(pos.x, 20);

        return vec4(0, 0, 0, horizontalLines / verticalLines);
    }
`)!

const source10 = Skia.RuntimeEffect.Make(`
    vec4 main(vec2 pos) {
        float horizontalLines = 1 - step(1, mod(pos.y, 20));

        float verticalLines = mod(pos.y, 40) > 20 ? 1 - step(1, mod(pos.x, 40)) : 1 - step(1, mod(pos.x + 20, 40));

        return vec4(0, 0, 0, horizontalLines + verticalLines);
    }
`)!

const source11 = Skia.RuntimeEffect.Make(`
    uniform vec2 res;

    vec4 main(vec2 pos) {
        vec2 normalized = pos/res;
        vec2 center = vec2(0.5);

        float circle1 = floor(distance(normalized, center) * 10) / 10;

        vec2 toCenter = center - normalized;
        float circle2 = length(toCenter) < 0.4 && length(toCenter) > 0.38 ? 1 : 0;

        float pct = sqrt(toCenter.x * toCenter.x + toCenter.y * toCenter.y) < 0.15 ? 0.5 : 0;

        return vec4(0, 0, circle1, circle1) + vec4(0, circle2, 0, circle2) + vec4(pct, 0, 0, pct);
    }
`)!

const source12 = Skia.RuntimeEffect.Make(`
    uniform vec2 res;

    float random (vec2 st) {
        return fract(sin(dot(st.xy,
          vec2(12.9898,78.233)))*
        43758.5453123);
    }

    vec4 main(vec2 pos) {
        vec2 normalized = pos/res;
        float rnd = random(normalized);

        return vec4(vec3(rnd), 1);
    }
`)!

export const Shaders1 = () => {
  return (
    <ScrollView>
      <Canvas style={{ width: 256, height: 256 }}>
        <Fill>
          <Shader source={source1} />
        </Fill>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Fill>
          <Shader source={source2} uniforms={{ c: vec(100, 100), r: 100 }} />
        </Fill>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Fill>
          <Shader source={source6} uniforms={{ c: vec(100, 100), r: 100 }} />
        </Fill>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Fill>
          <Shader source={source3} uniforms={{ res: vec(256, 256) }} />
        </Fill>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Fill>
          <Shader source={source4} uniforms={{ res: vec(256, 256) }} />
        </Fill>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Fill>
          <Shader source={source5} uniforms={{ res: vec(256, 256) }} />
        </Fill>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Fill>
          <Shader source={source7} />
        </Fill>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Fill>
          <Shader source={source8} uniforms={{ res: vec(256, 256) }} />
        </Fill>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Fill>
          <Shader source={source9} uniforms={{ res: vec(256, 256) }} />
        </Fill>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Fill>
          <Shader source={source10} />
        </Fill>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Fill>
          <Shader source={source11} uniforms={{ res: vec(256, 256) }} />
        </Fill>
      </Canvas>
      <Canvas style={{ width: 256, height: 256 }}>
        <Fill>
          <Shader source={source12} uniforms={{ res: vec(256, 256) }} />
        </Fill>
      </Canvas>
    </ScrollView>
  )
}
