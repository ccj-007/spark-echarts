const utils = {
  removeChild(container: HTMLElement, doms: Array<HTMLElement | null>) {
    for (const dom of doms) {
      dom && container.removeChild(dom)
    }
  },
  throttle(func: Function, delay: number, thisArg: Window | HTMLElement) {
    let lastTime = 0;
    return () => {
      const currentTime = new Date().getTime();
      if (currentTime - lastTime > delay) {
        func.apply(thisArg, arguments);
        lastTime = currentTime;
      }
    }
  }
}

export default utils