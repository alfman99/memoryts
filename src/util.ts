import base from '@memoryts/base';

export function Architecture(): 'x64' | 'x32' {
  return base.is64BitProcess() ? 'x64' : 'x32';
}

export function RunningPrivileged(): boolean {
  return base.isElevatedProcess();
}

export function ResizeBuffer(nodeBuffer: Buffer, targetSize: number): Buffer {
  if (nodeBuffer.length === targetSize) {
    return nodeBuffer;
  } else if (nodeBuffer.length < targetSize) {
    const padding = Buffer.alloc(targetSize - nodeBuffer.length);
    return Buffer.concat([nodeBuffer, padding]);
  } else {
    return nodeBuffer.slice(0, targetSize);
  }
}

export default {
  Architecture,
  RunningPrivileged,
  ResizeBuffer,
};
