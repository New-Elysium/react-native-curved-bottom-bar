import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Platform, View } from 'react-native';

/**
 * Optional integration with Apple's Liquid Glass effect introduced in iOS 26.
 *
 * The native material is provided by the optional peer dependency
 * `expo-glass-effect`. When that package is not installed, when the host
 * platform is not iOS, or when the running iOS version is below 26, this
 * component falls back to a plain `View` so behaviour is unchanged.
 *
 * Consumers opt in via the `enableGlassEffect` prop on the navigator. When the
 * effect is active they will typically also want to pass `bgColor="transparent"`
 * so the SVG fill does not occlude the glass material underneath.
 */
export type GlassEffectStyle = 'regular' | 'clear';

export interface GlassBackgroundProps {
  enabled?: boolean;
  glassEffectStyle?: GlassEffectStyle;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

// Optional require so consumers without expo-glass-effect installed are not
// forced to take on a new native dependency.
type GlassViewComponent = React.ComponentType<{
  style?: StyleProp<ViewStyle>;
  glassEffectStyle?: GlassEffectStyle;
  children?: React.ReactNode;
}>;

let GlassViewImpl: GlassViewComponent | undefined;
try {
  const mod = require('expo-glass-effect') as {
    GlassView?: GlassViewComponent;
  };
  GlassViewImpl = mod?.GlassView;
} catch {
  GlassViewImpl = undefined;
}

const isIOS26OrLater = (): boolean => {
  if (Platform.OS !== 'ios') {
    return false;
  }
  const raw = Platform.Version;
  const major =
    typeof raw === 'number'
      ? raw
      : parseInt(String(raw).split('.')[0] ?? '0', 10);
  return Number.isFinite(major) && major >= 26;
};

export const isLiquidGlassAvailable = (): boolean =>
  Boolean(GlassViewImpl) && isIOS26OrLater();

const GlassBackground: React.FC<GlassBackgroundProps> = ({
  enabled,
  glassEffectStyle,
  style,
  children,
}) => {
  if (enabled && GlassViewImpl && isIOS26OrLater()) {
    const GlassView = GlassViewImpl;
    return (
      <GlassView style={style} glassEffectStyle={glassEffectStyle}>
        {children}
      </GlassView>
    );
  }
  return <View style={style}>{children}</View>;
};

export default GlassBackground;
