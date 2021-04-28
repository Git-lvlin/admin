import { parse } from 'querystring';
import Big from 'big.js';

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const arrayToTree = (list, parId = 0) => {
  const len = list.length
  function loop(pid) {
    const res = [];
    for (let i = 0; i < len; i += 1) {
      const item = list[i]
      if (item.pid === pid) {
        item.children = loop(item.id)
        res.push(item)
      }
    }
    return res.length ? res : null
  }
  return loop(parId)
}

export const uploadImageFormatConversion = (imgArr, urlKey, uidKey) => {
  return imgArr.map((item, index) => {
    return {
      url: item[urlKey],
      uid: uidKey ? item[uidKey] : index
    }
  })
}

export const amountTransform = (amount, type = '*') => {
  if (!amount) {
    return 0;
  }

  if (type === '*') {
    return +new Big(amount).times(100)
  }

  return +new Big(amount).div(100)
}

export const typeTransform = (array) => {
  if (!Array.isArray(array)) {
    return {}
  }
  const obj = {};
  array.forEach(item => {
    obj[item.code] = {
      text: item.name,
    }
  })
  return obj;
}

export const paramsEmptyFilter = (params) => {
  const obj = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key in params) {
    if (params[key] !== '') {
      obj[key] = params[key]
    }
  }

  return obj;
}

export const getImageSize = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (theFile) => {
      const image = new Image()
      image.src = theFile.target.result
      image.onload = function () {
        const { width, height } = this;
        resolve({ width, height })
      }
    }
  });
}