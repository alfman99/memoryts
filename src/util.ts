export function resizeBuffer(nodeBuffer: Buffer, targetSize: number): Buffer {
  if (nodeBuffer.length === targetSize) {
    return nodeBuffer;
  } else if (nodeBuffer.length < targetSize) {
    const padding = Buffer.alloc(targetSize - nodeBuffer.length);
    return Buffer.concat([nodeBuffer, padding]);
  } else {
    return nodeBuffer.slice(0, targetSize);
  }
}
