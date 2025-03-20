// 延迟函数
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 将对象转换为 JSON 字符串
export function toJsonString(obj: any): string {
  return JSON.stringify(obj);
}

// 从 JSON 字符串解析对象
export function fromJsonString<T>(str: string): T {
  return JSON.parse(str);
}

// 格式化金额
export function formatCurrency(amount: number, currency: string = 'CNY'): string {
  return `${amount.toLocaleString()} ${currency}`;
}

// 格式化日期
export function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
} 