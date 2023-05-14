export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export function camelize(value: string): string {
    return value.replace(/-(\w)/g, (_, letter) => letter.toUpperCase());
}
