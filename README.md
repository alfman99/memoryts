> **Warning**
> This is a work-in-progress and not the finished product.

# MemoryTS - High-Level Process Memory Interaction for Node.js TypeScript

MemoryTS is a powerful TypeScript package designed to provide developers with a high-level interface for interacting with process memory in Node.js applications. With MemoryTS, you can easily read and write data to the memory of a running process, making it ideal for tasks like game hacking, debugging, and reverse engineering.

<!-- ![MemoryTS Demo](demo.gif) -->

## Features
- [x] Processes
  - [x] Get a handle to a process
  - [x] List all processes
  - [x] Close the handle to a process

- [x] Memory
  - [x] Read memory from a process
    - [x] Primitives
      - [x] Bool
      - [x] Int8 [Byte, Char]
      - [x] UInt8
      - [x] Int16
      - [x] UInt16
      - [x] Int32
      - [x] UInt32
      - [x] Float
      - [x] Double
    - [x] Arrays of primitives

  - [x] Write memory to a process
    - [x] Primitives
      - [x] Bool
      - [x] Int8 [Byte, Char]
      - [x] UInt8
      - [x] Int16
      - [x] UInt16
      - [x] Int32
      - [x] UInt32
      - [x] Float
      - [x] Double
    - [x] Arrays of primitives

- [x] Pattern scanning
  - [x] Find on memory a byte pattern that follows the IDA format (`3F ?? AA 64`) and return address

- [x] Modules
  - [x] Find a module in a specified process 
  - [x] List all modules in a process

- [x] Protection
  - [x] Set protection level on a memory region

- [x] Util
  - [x] Architecture running
  - [x] Check if running as administrator

## Compatibility
- [x] Windows
  - [ ] Host process x86 targeting x86
  - [ ] Host process x64 targeting x86
  - [x] Host process x64 targeting x64


For more detailed information, check out the [API documentation](API.md).

## Examples
### Read single `char` Notepad.exe
```ts
import mem from 'memoryts';

// Open handle to process
const pHandle = mem.OpenProcess('Notepad.exe')

// Read 20 bytes from memory at address 0x7FFC885D3A30
const readData = mem.Read(mem.types.Char, pHandle, 0x7FFC885D3A30)

// Print data
console.log(readData.value)
```
### Read 20 `char` array from Notepad.exe and transform into UTF-16 encoded String
```ts
import mem from 'memoryts';

// Open handle to process
const pHandle = mem.OpenProcess('Notepad.exe')

// Read 20 bytes from memory at address 0x7FFC885D3A30
const readData = mem.ReadArray(mem.types.Char, 20, pHandle, 0x7FFC885D3A30)

// Transform raw buffer into string using UTF-16 encoding
const data = new TextDecoder('utf-16').decode(readData.rawBuffer)

// Print data
console.log(data)
```

## License

MemoryTS is [MIT licensed](LICENSE).

---

Disclaimer: MemoryTS is intended for legal and ethical use. The developers of MemoryTS are not responsible for any misuse or damage caused by its usage. Always respect the terms of service of the software you are interacting with.
