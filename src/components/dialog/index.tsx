/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-shadow */
import { useGetResetSetState, useWithResolvers } from '../../hooks';
import React, { Fragment, useImperativeHandle, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useConfiguration } from '../configuration';
import { content } from '../../utils';
import SeparationLine from '../separation-line';
import ActionButton, { DialogOptions } from './button';
import Button from '../button';
import Space from '../space';


export type DialogRef = {
  show: (options: DialogOptions.Show) => void;
  hide: () => void;
  alert: (options: DialogOptions.Alert) => Promise<void>;
  confirm: (options: DialogOptions.Confirm) => Promise<boolean>;
}

type DialogProps = {
  ref?: React.RefObject<DialogRef>;
  open?: boolean;
}


/**
 * @function Dialog
 * @description 对话
 * @author Lock
 * @param props
 * @returns
 */
export default function Dialog({ ref }: DialogProps) {

  const [options, , , resetOptions, setOptions] = useGetResetSetState<DialogOptions.Show |
    DialogOptions.Alert | DialogOptions.Confirm>({
      mask: true,
      maskClose: true,
    });
  const { resolve, promise } = useWithResolvers();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<keyof DialogRef>('alert');

  const dialog = useConfiguration(
    configuration => configuration.scheme.components.Dialog
  );

  const mask = useSharedValue(0);
  const container = useSharedValue(0);

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      inset: 0,
      zIndex: open ? 99 : -1,
    },
    mask: {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 99,
      inset: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      position: 'absolute',
      borderRadius: dialog.round,
      backgroundColor: dialog.background,
      width: '70%',
      left: '15%',
      top: '40%',
      zIndex: 100,
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
    },
    line: {
      marginVertical: 0,
    },
  });

  const onShow = (options: DialogOptions.Show) => {
    setOpen(true);
    setOptions(options);
    mask.value = withTiming(1,
      {
        duration: 500,
      }
    );
    container.value = withSpring(1,
      {
        damping: 10, // 阻尼
        stiffness: 100, // 刚度
      }
    );
  };

  const onResolve = (value?: boolean | 'alert') => {
    setTimeout(() => {
      resolve(value === 'alert' ? void 0 : value);
    }, 500);
  };

  const onHide = (value?: boolean | 'alert') => {
    mask.value = withTiming(0, {
      duration: 500,
    });
    container.value = withSpring(0, {
      damping: 10, // 阻尼
      stiffness: 100, // 刚度
    }, () => {
      if (['boolean', 'string'].includes(typeof value)) {
        runOnJS(onResolve)?.(value);
      }
      runOnJS(setOpen)(false);
      runOnJS(resetOptions)();
    });
  };

  useImperativeHandle(ref, () => ({
    show: (options: DialogOptions.Show) => {
      onShow(options);
      setType('show');
    },
    alert: async (options: DialogOptions.Alert) => {
      onShow(options);
      setType('alert');
      return promise as unknown as Promise<void>;
    },
    confirm: async (options) => {
      onShow(options);
      setType('confirm');
      return promise as unknown as Promise<boolean>;
    },
    hide: () => {
      onHide();
    },
  }));

  const maskStyle = useAnimatedStyle(() => ({
    opacity: mask.value,
  }));

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: container.value }],
  }));

  return (
    <View style={styles.container}>
      {
        open && (
          <Fragment>
            {
              /**动态渲染模态框 */
              options?.mask && (
                <TouchableWithoutFeedback onPress={() => {
                  options?.maskClose && onHide();
                }}>
                  <Animated.View style={[styles.mask, maskStyle]} />
                </TouchableWithoutFeedback>
              )
            }
            <Animated.View style={[styles.content, containerStyle]}>
              <View style={styles.title}>
                {
                  content((options?.content as React.ReactNode) ?? '', {
                    fontSize: 15,
                    color: dialog.color,
                  })
                }
              </View>
              <SeparationLine style={styles.line} />
              {
                options?.actions?.length &&
                  options?.actions?.map?.(({key, ...item}) => {
                    return (
                      <View key={key}>
                        <Space align="center" justif="center" flex={1}>
                          <Button {...item} fill="text" block>
                            {item.text}
                          </Button>
                        </Space>
                        <SeparationLine style={styles.line} />
                      </View>
                    );
                  })
              }
              <ActionButton
                type={type}
                onHide={onHide}
                options={options}
              />
            </Animated.View>
          </Fragment>
        )
      }
    </View>
  );
}
