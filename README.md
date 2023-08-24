# MemoryTS - High-Level Process Memory Interaction for Node.js TypeScript

MemoryTS is a powerful TypeScript package designed to provide developers with a high-level interface for interacting with process memory in Node.js applications. With MemoryTS, you can easily read and write data to the memory of a running process, making it ideal for tasks like game hacking, debugging, and reverse engineering.

![MemoryTS Demo](demo.gif)

## Features
- [x] Processes
  - [x] Get a handle to a process
  - [x] List all processes
  - [x] Close the handle to a process

- [x] Memory
  - [x] Read memory from a process
    - [x] Bool
    - [x] Int8 [Byte, Char]
    - [x] UInt8
    - [x] Int16 [Short]
    - [x] UInt16 [UShort]
    - [x] Int32 [Int, Long]
    - [x] UInt32 [UInt, ULong, DWord]
    - [x] Float
    - [x] Double
    - Arrays of all the types above

  - [x] Write memory to a process
    - [x] Bool
    - [x] Int8 [Byte, Char]
    - [x] UInt8
    - [x] Int16 [Short]
    - [x] UInt16 [UShort]
    - [x] Int32 [Int, Long]
    - [x] UInt32 [UInt, ULong, DWord]
    - [x] Float
    - [x] Double
    - Arrays of all the types above

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
  - [x] x64


For more detailed information, check out the [API documentation](API.md).


## License

MemoryTS is [MIT licensed](LICENSE).

---

Disclaimer: MemoryTS is intended for legal and ethical use. The developers of MemoryTS are not responsible for any misuse or damage caused by its usage. Always respect the terms of service of the software you are interacting with.
