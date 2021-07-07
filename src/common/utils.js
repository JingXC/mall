//防抖函数
export function debounce(func, delay) {
  const timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    setTimeout((...args) => {
      func.apply(this, args)
    }, delay)
  }
}
