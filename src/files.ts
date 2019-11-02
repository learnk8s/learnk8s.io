import { dirname, basename, extname, relative, resolve, join } from 'path'
import { promises } from 'fs'

export interface VReference<T = string> {
  contents: null
  path: string
  dirname: string
  basename: string
  extname: string
}

export interface VFile<T = string> {
  contents: T
  path: string
  dirname: string
  basename: string
  extname: string
}

export interface VMemory<T = string> {
  contents: T
  path: null
  dirname: null
  basename: null
  extname: null
}

export interface VAzureBlobReference {
  basename: string
  account: string
  container: string
  path: string
}

export function isReferenceFile<T>(file: any): file is VReference<T> {
  return 'contents' in file && file.contents === null
}

export function isFile<T = string>(file: any): file is VFile<T> {
  return (
    'contents' in file &&
    file.contents !== null &&
    'path' in file &&
    isString(file.path) &&
    'dirname' in file &&
    isString(file.dirname) &&
    'basename' in file &&
    isString(file.basename)
  )
}

export function isInMemory<T>(file: any): file is VMemory<T> {
  return (
    'contents' in file &&
    file.contents !== null &&
    (('path' in file && !isString(file.path)) ||
      ('dirname' in file && !isString(file.dirname)) ||
      ('basename' in file && !isString(file.basename)))
  )
}

export function toVFile<T = string>(file: { contents: T }): Readonly<VMemory<T>>
export function toVFile<T = string>(file: { contents: T; path: string }): Readonly<VFile<T>>
export function toVFile<T = string>(file: { path: string }): Readonly<VReference<T>>
export function toVFile<T = string>(file: {
  path: string
  onLoad: ((onLoad: VFile<string>) => Promise<VFile<T>>) | null
}): Readonly<VReference<T>>
export function toVFile<T>(
  file:
    | Partial<{ contents: T; onLoad: (onLoad: VFile<string>) => Promise<VFile<T>> }>
    | { path: string }
    | { contents: T }
    | { contents: T; path: string },
): Readonly<VReference<T>> | Readonly<VMemory<T>> | Readonly<VFile<T>> {
  if ('contents' in file && 'path' in file) {
    const path = relative(resolve('.'), file.path)
    return { ...file, path, dirname: dirname(path), basename: basename(path), extname: extname(path) } as VFile<T>
  }
  if ('contents' in file) {
    return { ...file, contents: file.contents!, path: null, dirname: null, basename: null, extname: null } as VMemory<T>
  }
  if ('path' in file) {
    const path = relative(resolve('.'), file.path)
    return {
      contents: null,
      path: path!,
      onLoad: (file as any).onLoad,
      dirname: dirname(path),
      basename: basename(path),
      extname: extname(path),
    } as VReference<T>
  }
  throw new Error('Invalid file')
}

export function toVAzureBlob(file: {
  container: string
  account: string
  basename: string
}): Readonly<VAzureBlobReference> {
  return { ...file, path: join('azure', file.account, file.container, file.basename) }
}

export function toPath(path: string): string {
  return relative(resolve('.'), path)
}

export async function read<T = string>(file: VReference<T>): Promise<Readonly<VFile<T>>>
export async function read<T = string>({ path }: { path: string }): Promise<Readonly<VFile<T>>>
export async function read<T = string>(file: VReference<T> | { path: string }): Promise<Readonly<VFile<T>>> {
  const contents = await promises.readFile(file.path, 'utf8')
  return toVFile({ path: file.path, contents: contents as any })
}

export async function write(file: VFile<string>): Promise<void> {
  await promises.mkdir(file.dirname, { recursive: true } as any)
  await promises.writeFile(file.path, file.contents)
}

export async function copy(input: VFile | VReference, output: VFile<String> | VReference): Promise<void> {
  await promises.mkdir(output.dirname, { recursive: true } as any)
  await promises.copyFile(input.path, output.path)
}

function isString(value: unknown): value is string {
  return {}.toString.call(value) === '[object String]'
}
