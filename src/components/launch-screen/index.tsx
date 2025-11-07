import {
  BlurMask,
  Canvas,
  Group,
  LinearGradient,
  Path,
  Rect,
  RoundedRect,
  Shader,
  Text,
  useClock,
  useFont,
  vec,
} from '@shopify/react-native-skia';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { shader } from './shader.ts';
import React, { useEffect, useRef } from 'react';
import { DeviceMotion } from 'expo-sensors';

const LaunchScreen: React.FC<{}> = () => {
  const { width, height } = useWindowDimensions();

  // ---- LOGO 固定宽度占屏幕的30% ----
  const logoTargetWidth = width * 0.3;
  const svgOriginalWidth = 1000;
  const svgOriginalHeight = 1000;

  const scale = logoTargetWidth / svgOriginalWidth;
  const logoWidth = svgOriginalWidth * scale;
  const logoHeight = svgOriginalHeight * scale;

  const translateX = (width - logoWidth) / 2;
  const translateY = (height - logoHeight) / 2 - 50; // 上移50给文字留空间

  // ---- 背景 shader + 陀螺仪 ----
  const clock = useClock();
  const deviceEuler = useSharedValue([0, 0, 0]);
  const resolution = vec(width, height);
  const initialEulerRef = useRef<[number, number, number] | null>(null);
  const smoothedEulerRef = useRef<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    const alpha = 0.1;
    const subscription = DeviceMotion.addListener(motion => {
      if (!motion.rotation) return;
      const current: [number, number, number] = [
        motion.rotation.beta,
        motion.rotation.gamma,
        motion.rotation.alpha,
      ];
      if (!initialEulerRef.current) initialEulerRef.current = current;
      const delta: [number, number, number] = [
        current[0] - initialEulerRef.current[0],
        current[1] - initialEulerRef.current[1],
        current[2] - initialEulerRef.current[2],
      ];
      const rotationScale = 0.8;
      smoothedEulerRef.current = [
        smoothedEulerRef.current[0] * (1 - alpha) +
          delta[0] * alpha * rotationScale,
        smoothedEulerRef.current[1] * (1 - alpha) +
          delta[1] * alpha * rotationScale,
        smoothedEulerRef.current[2] * (1 - alpha) +
          delta[2] * alpha * rotationScale,
      ];
      deviceEuler.value = smoothedEulerRef.current;
    });
    DeviceMotion.setUpdateInterval(16);
    return () => subscription.remove();
  }, [deviceEuler]);

  const uniforms = useDerivedValue(
    () => ({
      iResolution: resolution,
      iTime: clock.value * 0.0008,
      uDeviceEuler: deviceEuler.value,
    }),
    [clock, width, height],
  );

  // ---- 字体 ----
  const fontSize = 28;
  const fontSmallSize = 12;
  const font = useFont(
    require('../../assets/fonts/Elms_Sans/static/ElmsSans-Bold.ttf'),
    fontSize,
  );
  const fontSmall = useFont(
    require('../../assets/fonts/Elms_Sans/static/ElmsSans-Light.ttf'),
    fontSmallSize,
  );

  const title = 'MiniVault';
  const subtitle = 'Your gateway to Web3 freedom.';

  const titleWidth = font ? font.getTextWidth(title) : 0;
  const subtitleWidth = fontSmall ? fontSmall.getTextWidth(subtitle) : 0;

  const titleX = (width - titleWidth) / 2;
  const subtitleX = (width - subtitleWidth) / 2;

  const titleY = translateY + logoHeight + 40; // 标题在LOGO下方20px
  const subtitleY = titleY + fontSize; // 小字在标题下方8px

  const blur = useSharedValue(10); // 初始 blur 值
  const titleBlur = useSharedValue(1); // 初始 blur 值
  useEffect(() => {
    let direction = 1;
    const interval = setInterval(() => {
      blur.value += direction * 2; // 每次改变 2
      if (blur.value >= 120) direction = -1; // 达到上限反向
      if (blur.value <= 60) direction = 1; // 达到底限反向
      titleBlur.value = blur.value / 10;
    }, 32); // 16ms ~ 60fps

    return () => clearInterval(interval);
  }, [blur, titleBlur]);

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Rect x={0} y={0} width={width} height={height}>
        <Shader source={shader} uniforms={uniforms} />

        {/* LOGO */}
        <Group
          style="fill"
          transform={[{ translateX }, { translateY }, { scale }]}
        >
          <Group>
            <RoundedRect
              x={0}
              y={0}
              width={1000}
              height={1000}
              r={120}
            ></RoundedRect>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(width, height)}
              colors={['#2563EB', '#7C3AED']}
            />
            <BlurMask blur={blur} style="solid" />
          </Group>
          <RoundedRect x={0} y={0} width={1000} height={1000} r={120}>
            <Group color="#ffffff" opacity={0.99}>
              <Path
                path={
                  'M330.71 279.64a27 27 0 1 0 46.77-27L329 168.75a27 27 0 0 0-46.77 27zM141.1 356.69l50.57 29.19a27 27 0 1 0 27-46.77l-50.57-29.19a27 27 0 0 0-27 46.77zM924.68 513h-96.74a27 27 0 0 0 0 54h96.74a27 27 0 0 0 0-54zM223.11 540a27 27 0 0 0-27-27H99.32a27 27 0 1 0 0 54h96.79a27 27 0 0 0 27-27zM832.31 385.89l50.58-29.2a27 27 0 1 0-27-46.77l-50.58 29.2a27 27 0 1 0 27 46.77zM191.69 693.4l-50.59 29.2a27 27 0 1 0 27 46.77l50.58-29.2a27 27 0 0 0-27-46.77zM656.45 289.45a27 27 0 0 0 36.88-9.88l48.4-83.82a27 27 0 1 0-46.77-27l-48.4 83.82a27 27 0 0 0 9.89 36.88zM367.53 789.87a27 27 0 0 0-36.88 9.88l-48.37 83.78a27 27 0 1 0 46.77 27l48.37-83.78a27 27 0 0 0-9.89-36.88zM512 212.48a27 27 0 0 0 27-27V127a27 27 0 0 0-54 0v58.52a27 27 0 0 0 27 26.96zM559.65 361.82a182.91 182.91 0 0 0-139.7 18.39C332 431 301.81 543.78 352.56 631.7a184.1 184.1 0 1 0 207.09-269.88z m78 211.5a130.05 130.05 0 1 1-125.86-163.83 130.88 130.88 0 0 1 33.88 4.51 130.1 130.1 0 0 1 92 159.34z'
                }
              />
              <Path
                path={
                  'M581.25 281.18a267.58 267.58 0 0 0-138.5 516.93 269.07 269.07 0 0 0 69.69 9.23 267.64 267.64 0 0 0 68.82-526.16z m137 313.74A213.49 213.49 0 1 1 511.65 326a214.8 214.8 0 0 1 55.63 7.37 213.58 213.58 0 0 1 151 261.58z'
                }
              />
              <Path
                path={
                  'M475.96734 477.256072m-23.936942 13.82a27.64 27.64 0 1 0 47.873884-27.64 27.64 27.64 0 1 0-47.873884 27.64Z'
                }
              />
            </Group>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(width, height)}
              colors={['#2563EB33', '#7C3AED33']}
            />
          </RoundedRect>
        </Group>

        {/* 标题渐变文字 */}
        {font && (
          <Text text={title} font={font} x={titleX} y={titleY}>
            <LinearGradient
              start={vec(titleX, titleY)}
              end={vec(titleX + titleWidth, titleY)}
              colors={['#2563EB', '#7C3AED']}
            ></LinearGradient>
            <BlurMask blur={titleBlur} style="solid" />
          </Text>
        )}

        {/* 小字 */}
        {fontSmall && (
          <Text
            opacity={0.75}
            text={subtitle}
            font={fontSmall}
            x={subtitleX}
            y={subtitleY}
            color="#ffffff"
          >
            <BlurMask blur={5} style="solid" />
          </Text>
        )}
      </Rect>
    </Canvas>
  );
};

 export default LaunchScreen;
